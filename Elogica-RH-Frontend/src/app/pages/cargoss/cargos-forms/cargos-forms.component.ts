import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cargo, CriarCargoDto, AtualizarCargoDto } from '../../../shared/interfaces/cargo';
import { RetornoPaginado } from '../../../shared/interfaces/retornoPaginado';
import { CargosService } from '../../../services/cargos/cargos.service';
import { ModalService } from '../../../shared/services/modal.service';

@Component({
  selector: 'app-cargos-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cargos-forms.component.html',
  styleUrls: ['./cargos-forms.component.css']
})
export class CargosFormComponent  {
  Math = Math;
  modo: 'listar' | 'adicionar' | 'editar' = 'listar';
  cargos: Cargo[] = [];
  cargo: Cargo = {
    Id: 0,
    Titulo: '',
    Descricao: '',
    SalarioBase: 0,
    SetoresIds: []
  };

  setores: any[] = [];
  paginaAtual = 1;
  itensPorPagina = 10;
  totalRegistros = 0;

  constructor(
    private cargoService: CargosService,
    private modalService: ModalService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarCargosPaginado();
    this.carregarSetores();
  }

  carregarCargosPaginado(): void {
    this.cargoService.buscarCargosPaginado(this.paginaAtual, this.itensPorPagina)
      .subscribe({
        next: (retorno: RetornoPaginado<Cargo>) => {
          this.cargos = retorno.registros;
          this.totalRegistros = retorno.totalRegistros;
        },
        error: (err: any) => {
          console.error('Erro ao carregar cargos:', err);
          this.modalService.erro('Erro', 'Falha ao carregar cargos');
        }
      });
  }

  carregarSetores(): void {
    // Implemente a chamada para carregar os setores
    this.setores = [
      { Id: 1, Nome: 'Setor 1', Descricao: 'Descrição Setor 1', selecionado: false },
      { Id: 2, Nome: 'Setor 2', Descricao: 'Descrição Setor 2', selecionado: false }
    ];
  }

  mudarPagina(pagina: number): void {
    this.paginaAtual = pagina;
    this.carregarCargosPaginado();
  }

  getTotalPaginas(): number[] {
    const totalPaginas = Math.ceil(this.totalRegistros / this.itensPorPagina);
    return Array.from({ length: totalPaginas }, (_, i) => i + 1);
  }

  mudarModo(modo: 'listar' | 'adicionar' | 'editar', cargo?: Cargo): void {
    this.modo = modo;
    if (modo === 'editar' && cargo) {
      this.cargo = { ...cargo };
    } else if (modo === 'adicionar') {
      this.cargo = {
        Id: 0,
        Titulo: '',
        Descricao: '',
        SalarioBase: 0,
        SetoresIds: []
      };
    }
  }

  adicionarCargo(): void {
    this.cargoService.adicionarCargo(this.cargo)
      .subscribe({
        next: () => {
          this.modalService.sucesso('Sucesso', 'Cargo adicionado com sucesso!');
          this.mudarModo('listar');
          this.carregarCargosPaginado();
        },
        error: (err: any) => {
          console.error('Erro ao adicionar cargo:', err);
          this.modalService.erro('Erro', 'Falha ao adicionar cargo');
        }
      });
  }

  salvarEdicao(): void {
    const dadosAtualizacao: AtualizarCargoDto = {
      Titulo: this.cargo.Titulo,
      Descricao: this.cargo.Descricao,
      SalarioBase: this.cargo.SalarioBase,
      SetoresIds: this.setores.filter(s => s.selecionado).map(s => s.Id)
    };

    this.cargoService.atualizarCargo(this.cargo.Id, dadosAtualizacao)
      .subscribe({
        next: () => {
          this.modalService.sucesso('Sucesso', 'Cargo atualizado com sucesso!');
          this.mudarModo('listar');
          this.carregarCargosPaginado();
        },
        error: (err: any) => {
          console.error('Erro ao atualizar cargo:', err);
          this.modalService.erro('Erro', 'Falha ao atualizar cargo');
        }
      });
  }

  excluirCargo(id: number): void {
    this.modalService.confirmar(
      'Confirmar exclusão',
      'Tem certeza que deseja excluir este cargo?',
      'Confirmar',
      'Cancelar'
    ).then((result: any) => {
      if (result.isConfirmed) {
        this.cargoService.excluirCargo(id)
          .subscribe({
            next: () => {
              this.modalService.sucesso('Sucesso', 'Cargo excluído com sucesso!');
              this.carregarCargosPaginado();
            },
            error: (err: any) => {
              console.error('Erro ao excluir cargo:', err);
              this.modalService.erro('Erro', 'Falha ao excluir cargo');
            }
          });
      }
    });
  }

  cancelar(): void {
    this.mudarModo('listar');
  }
}
