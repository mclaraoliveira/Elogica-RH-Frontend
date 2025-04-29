import { ModalService } from './../../shared/services/modal.service';
import { Router } from '@angular/router';
import { Setor, SetorDto, SetoresService } from './../../services/setores/setores.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-setores',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './setores.component.html',
  styleUrl: './setores.component.css'
})
export class SetoresComponent implements OnInit{
  //#region Variáveis necessárias
  setores: Setor[] = [];
  paginaAtual: number = 1;
  qtdPagina: number = 10;
  totalRegistros: number = 0;
  paginasVisiveis: (number | string)[] = [];

  setor: string = '';
  descricao: string = '';
  //#endregion

  constructor(
    private setoresService: SetoresService,
    private router: Router,
    private modalService: ModalService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.carregarSetores();
  }

  //#region Carregar Setores
  carregarSetores(): void {
    this.setoresService
      .buscarSetoresPaginado(this.paginaAtual, this.qtdPagina)
      .subscribe({
        next: (response: any) => {

          console.log("resposta API:", response);

          this.setores = response.data.registros || [];
          this.totalRegistros = response.data.totalRegistro;
          this.calcularPaginasVisiveis();
        },
        error: (erro) => {

          console.log("Erro ao carregar setores: ", erro);

          this.modalService.erro('Erro', 'Não foi possível carregar os setores!');
        }
      })
  }
  //#endregion

  //#region Modal Adicionar Setor
  adicionarSetorModal(): void {
    Swal.fire({
      title: `<i class="bi bi-plus-circle" style="color:#1f3e6a; font-size: 3rem"></i>`,
      html: `
        <p class="fw-bold pb-4">Adicionar</p>
        <div class="container-fluid">
          <form>
            <div class="row">
              <div class="col-md-12">
                <label for="setor" class="form-label">Setor</label>
                <input id="setor" class="swal2-input border-1" placeholder="Digite..." type="text">
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-md-12">
                <label for="descricao" class="form-label">Descrição</label>
                <input id="descricao" class="swal2-input" placeholder="Digite..." type="text">
              </div>
            </div>
          </form>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Salvar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        const nome = (document.getElementById('setor') as HTMLInputElement).value;
        const descricao = (document.getElementById('descricao') as HTMLInputElement).value;

        if (!nome || !descricao) {
          Swal.showValidationMessage('Por favor, preencha todos os campos.');
          return;
        }

        const novoSetor = {
          nome: nome,
          descricao: descricao
        };

        console.log("Parametro para Requisição POST: ", novoSetor)

        return novoSetor;
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const novoSetor = result.value;
        this.setoresService.adicionarSetor(novoSetor).subscribe({
          next: (setor: any) => {
            this.setores.push(setor);
            this.modalService.sucesso('Sucesso', 'Setor adicionado com sucesso!');
            this.carregarSetores();
          },
          error: (err) => {
            console.error('Erro ao adicionar setor:', err);
            this.modalService.erro('Erro', 'Não foi possível adicionar o setor!');
          }
        });
      }
    });
  }
  //#endregion

  //#region Modal Editar Setor
  editarSetorModal(setor: Setor, index: number): void {
    Swal.fire({
      title: '<i class="bi bi-pen" style="color:#1f3e6a; font-size: 3rem"></i>', // Ajusta o título para "Editar"
      html: `
            <p class="fw-bold pb-4">Editar</p>
            <div class="container-fluid pb-4">
              <form>
                <div class="row">
                  <div class="col-md-12">
                    <label for="setor" class="">Setor</label>
                    <input
                      id="setor"
                      class="swal2-input border-1"
                      placeholder="Digite..."
                      type="text"
                      >
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col-md-12">
                    <label for="descricao">Descrição</label>
                    <input
                      id="descricao"
                      class="swal2-input"
                      placeholder="Digite..."
                      type="text">
                  </div>
                </div>
              </form>
            </div>
          `,
      showCancelButton: true,
      confirmButtonText: 'Salvar',
      cancelButtonText: 'Cancelar',
      didOpen: () => {
        (document.getElementById('setor') as HTMLInputElement).value = setor.nome || '';
        (document.getElementById('descricao') as HTMLInputElement).value = setor.descricao || '';
      },
      preConfirm: () => {
        const nome = (document.getElementById('setor') as HTMLInputElement).value;
        const descricao = (document.getElementById('descricao') as HTMLInputElement).value;

        if (!nome || !descricao) {
          Swal.showValidationMessage('Por favor, preencha todos os campos.');
          return;
        }

        const setorAtualizado = {
          id: index,
          nome: nome,
          descricao: descricao
        };

        console.log(setorAtualizado);

        // Add validation logic if needed
        // const validacao = this.ValidarSetor(setorAtualizado);
        // if (!validacao.isValid) {
        //   Swal.showValidationMessage(validacao.mensagemErro);
        //   return;
        // }

        return setorAtualizado;
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const setorAtualizado: SetorDto = {
          nome: result.value.nome,
          descricao: result.value.descricao
        };
        this.setoresService.atualizarSetor(result.value.id, setorAtualizado).subscribe({
          next: (setor: any) => {
            this.modalService.sucesso('Sucesso', 'Setor atualizado com sucesso!');
            this.carregarSetores();
          },
          error: (err) => {
            this.modalService.erro('Erro', 'Não foi possível atualizar o setor.');
          }
        });
      }
    });
  }
  //#endregion

  //#region Modal Deletar Setor
  deletarSetorModal(setorId: number): void {
    const TITULO: string = "Aviso"
    const MENSAGEM: string = "Tem certeza que deseja excluir este setor?"
    this.modalService.confirmar(TITULO, MENSAGEM).then((result) => {
      if (result.isConfirmed) {
        this.setoresService.excluirSetor(setorId).subscribe({
          next: (response: any) => {
            if (response.data == true) {
              this.modalService.sucesso('Sucesso', 'Sua ação foi realizada com sucesso!')
              this.carregarSetores()
            }
            else {
              this.modalService.erro('Erro', response.data)
            }
          }
        })
      }
    });
  }
  //#endregion

  //#region Métodos para retorno paginado
  proximaPagina(): void {
    if (this.paginaAtual < this.totalPaginas()) {
      this.paginaAtual++;
      this.carregarSetores();
    }
  }

  paginaAnterior(): void {
    if (this.paginaAtual > 1) {
      this.paginaAtual--;
      this.carregarSetores();
    }
  }

  totalPaginas(): number {
    return Math.ceil(this.totalRegistros / this.qtdPagina);
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
      this.carregarSetores();
    }
  }
  //#endregion

  voltarUrl(): void {
    this.location.back();
  }
}
