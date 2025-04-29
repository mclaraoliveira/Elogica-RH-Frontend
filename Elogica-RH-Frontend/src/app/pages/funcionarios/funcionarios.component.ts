import { Component, OnInit } from '@angular/core';
import { FuncionarioService } from '../../services/funcionario.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Funcionario } from '../../shared/interfaces/funcionario';
import { ModalService } from '../../shared/services/modal.service';
import { NgxMaskDirective, provideNgxMask, NgxMaskPipe } from 'ngx-mask';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-funcionarios',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, NgxMaskPipe],
  providers: [provideNgxMask()],
  templateUrl: './funcionarios.component.html',
})
export class FuncionariosComponent implements OnInit {
  funcionarios: any[] = [];
  paginaAtual: number = 1;
  quantidadePorPagina: number = 10;
  totalRegistros: number = 0;
  totalRegistrosAPI: number = 0;
  paginasVisiveis: (number | string)[] = []; // tipo string para permitir ('...')

  // Variáveis para os campos de busca
  cpfInput: string = '';
  nomeInput: string = '';

  constructor(
    private funcionarioService: FuncionarioService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.buscarFuncionarios();
  }

  abrirModalFiltrar(): void {
    Swal.fire({
      html: `
        <div class="text-center p-3">
          <i class="bi bi-funnel" style="font-size: 3rem; color:#1F3E6A"></i>
          <h5 class="mt-2 mb-4 fw-bold">Filtrar</h5>

          <div class="text-start mb-3">
            <label for="setorSelect" class="form-label fw-bold">Setor</label>
            <select class="form-select" id="setorSelect">
              <option selected>Selecionar...</option>
              <!-- opções dinâmicas -->
            </select>
          </div>

          <div class="text-start mb-4">
            <label for="cargoSelect" class="form-label fw-bold">Cargo</label>
            <select class="form-select" id="cargoSelect">
              <option selected>Selecionar...</option>
              <!-- opções dinâmicas -->
            </select>
          </div>

          <div class="d-flex justify-content-center gap-2 mt-4">
            <button id="cancelBtn" class="btn btn-outline-primary">Cancelar</button>
            <button id="filtrarBtn" class="btn btn-primary">Filtrar</button>
          </div>
        </div>
      `,
      showConfirmButton: false,
      showCloseButton: true,
      customClass: {
        popup: 'p-0',
      },
      didOpen: () => {
        // Eventos dos botões
        const cancelar = document.getElementById('cancelBtn')!;
        const filtrar = document.getElementById('filtrarBtn')!;

        cancelar.addEventListener('click', () => Swal.close());

        filtrar.addEventListener('click', () => {
          const setor = (
            document.getElementById('setorSelect') as HTMLSelectElement
          ).value;
          const cargo = (
            document.getElementById('cargoSelect') as HTMLSelectElement
          ).value;

          // add logica de filtrara aqui
          console.log({ setor, cargo });

          Swal.close();
        });
      },
    });
  }

  demitirFuncionario(funcionarioId: number) {
    this.modalService
      .confirmar(
        'Aviso',
        'Você tem certeza que deseja demitir este funcionário?',
        'Sim',
        'Não'
      )
      .then((result) => {
        if (result.isConfirmed) {
          this.funcionarioService.desativarFuncionario(funcionarioId).subscribe(
            (response) => {
              console.log('Funcionário desativado', funcionarioId);
              // Chama o modal de sucesso
              this.modalService
                .sucesso('Sucesso', 'Funcionário desativado com sucesso!')
                .then(() => {
                  this.buscarFuncionarios();
                });
            },
            (error) => {
              console.error('Erro ao desativar funcionário', error);

              this.modalService.erro(
                'Erro',
                'Ocorreu um erro ao desativar o funcionário. Tente novamente.'
              );
            }
          );
        }
      });
  }

  buscarFuncionarios(): void {
    this.funcionarioService
      .getFuncionariosPaginados(this.paginaAtual, this.quantidadePorPagina)
      .subscribe({
        next: (response) => {
          console.log('Resposta da API:', response);
          let funcionarios = response.data.registros;

          // Armazenar o total de registros da API (antes do filtro)
          this.totalRegistrosAPI = response.data.totalRegistro;

          console.log('Valor de CPF Input:', this.cpfInput);
          console.log('Valor de Nome Input:', this.nomeInput);

          if (this.cpfInput) {
            const cpfInputClean = this.cpfInput.replace(/[^\d]/g, ''); // Remove pontos e traços
            funcionarios = funcionarios.filter(
              (funcionario: Funcionario) =>
                funcionario.cpf.replace(/[^\d]/g, '').includes(cpfInputClean) // Remove pontos e traços do CPF do funcionário
            );
          }

          if (this.nomeInput) {
            funcionarios = funcionarios.filter((funcionario: Funcionario) =>
              funcionario.nome
                .toLowerCase()
                .includes(this.nomeInput.toLowerCase())
            );
          }

          // Atualiza os funcionários filtrados
          this.funcionarios = funcionarios;
          this.totalRegistros = funcionarios.length; // Atualiza o total de registros filtrados
          this.calcularPaginasVisiveis();
        },
        error: (error) => {
          console.error('Erro ao buscar funcionários:', error);
        },
      });
  }

  proximaPagina(): void {
    if (this.paginaAtual < this.totalPaginas()) {
      this.paginaAtual++;
      this.buscarFuncionarios();
    }
  }

  paginaAnterior(): void {
    if (this.paginaAtual > 1) {
      this.paginaAtual--;
      this.buscarFuncionarios();
    }
  }

  totalPaginas(): number {
    return Math.ceil(this.totalRegistrosAPI / this.quantidadePorPagina);
  }

  calcularPaginasVisiveis(): void {
    const total = this.totalPaginas();
    const paginas = [];

    for (let i = 1; i <= total; i++) {
      if (
        i <= 4 ||
        i > total - 4 ||
        (i >= this.paginaAtual - 1 && i <= this.paginaAtual + 1)
      ) {
        paginas.push(i);
      }
    }

    if (total > 6) {
      paginas.push('...');
    }

    if (paginas[paginas.length - 1] !== total) {
      paginas.push(total);
    }

    this.paginasVisiveis = paginas;
  }

  irParaPagina(pagina: number | string): void {
    if (typeof pagina === 'number') {
      this.paginaAtual = pagina;
      this.buscarFuncionarios();
    }
  }

  limparBusca(): void {
    this.cpfInput = '';
    this.nomeInput = '';
    this.buscarFuncionarios();
  }
}
