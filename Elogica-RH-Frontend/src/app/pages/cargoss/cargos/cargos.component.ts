 import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Cargo } from '../../../shared/interfaces/cargo';
import { RetornoPaginado } from '../../../shared/interfaces/retornoPaginado';
import { CargosService } from '../../../services/cargos/cargos.service';
import { ModalService } from '../../../shared/services/modal.service';
import { Router } from '@angular/router';
import { SetoresService } from '../../../services/setores/setores.service';

@Component({
  selector: 'app-cargos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cargos.component.html',
  styleUrls: ['./cargos.component.css']
})
export class CargosComponent implements OnInit {
  modo: 'listar' | 'adicionar' | 'editar' | 'vincular' = 'listar';
  cargos: Cargo[] = [];
  cargoSelecionado: Cargo = {
    id: 0,
    titulo: '',
    descricao: '',
    salarioBase: 0,
    setoresIds: []
  };

  novoCargo: Cargo = {
    id: 0,
    titulo: '',
    descricao: '',
    salarioBase: 0,
    setoresIds: []
  };

  // Paginação
  paginaAtual = 1;
  itensPorPagina = 10;
  totalRegistros = 0;
  totalPaginas = 1;

  constructor(
    private cargoService: CargosService,
    private setorService: SetoresService,
    private modalService: ModalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarCargosPaginado(this.paginaAtual, this.itensPorPagina);
  }


  // Getters e Setters para o template
  get titulo(): string {
    return this.modo === 'adicionar' ? this.novoCargo.titulo : this.cargoSelecionado.titulo;
  }
  vincularSetor(cargo: Cargo): void {
    this.cargoSelecionado = { ...cargo };
    this.modo = 'vincular';
  }
  set titulo(value: string) {
    if (this.modo === 'adicionar') {
      this.novoCargo.titulo = value;
    } else {
      this.cargoSelecionado.titulo = value;
    }
  }

  get salarioBase(): number {
    return this.modo === 'adicionar' ? this.novoCargo.salarioBase : this.cargoSelecionado.salarioBase;
  }

  set salarioBase(value: number) {
    if (this.modo === 'adicionar') {
      this.novoCargo.salarioBase = value;
    } else {
      this.cargoSelecionado.salarioBase = value;
    }
  }

  get descricao(): string {
    return this.modo === 'adicionar' ? this.novoCargo.descricao : this.cargoSelecionado.descricao;
  }

  set descricao(value: string) {
    if (this.modo === 'adicionar') {
      this.novoCargo.descricao = value;
    } else {
      this.cargoSelecionado.descricao = value;
    }
  }



  carregarCargosPaginado(pagina: number, quantidade: number): void {
    this.cargoService.buscarCargosPaginado(pagina, quantidade)
      .subscribe({
        next: (retorno: RetornoPaginado<Cargo>) => {
          this.totalRegistros = retorno.totalRegistros;

          if(this.totalRegistros === 0 && this.paginaAtual !== 1) {
            this.paginaAtual = this.paginaAtual-1;
            //next
          } else {
            this.cargos = retorno.registros;
          }
          console.log(this.cargos)
        },
        error: (err: any) => {
          console.error('Erro ao carregar cargos:', err);
          this.modalService.erro('Erro', 'Falha ao carregar cargos');
        }
      });
  }

  mudarPagina(pagina: number): void {
    this.totalPaginas = this.totalRegistros/this.itensPorPagina;
  }

  getTotalPaginas(): number[] {
    const totalPaginas = Math.ceil(this.totalRegistros / this.itensPorPagina);
    return Array.from({ length: totalPaginas }, (_, i) => i + 1);
  }

  mudarModo(modo: 'listar' | 'adicionar' | 'editar', cargo?: Cargo): void {
    this.modo = modo;
    if (modo === 'editar' && cargo) {
      this.cargoSelecionado = { ...cargo };
    } else if (modo === 'adicionar') {
      this.novoCargo = {
        id:0,
        titulo: '',
        descricao: '',
        salarioBase: 0,
        setoresIds: []
      };
    }
  }

  adicionarCargo(): void {
    this.cargoService.adicionarCargo(this.novoCargo)
      .subscribe({
        next: (id: number) => {
          this.modalService.sucesso('Sucesso', 'Cargo adicionado com sucesso!');
          this.mudarModo('listar');
          this.carregarCargosPaginado(this.paginaAtual, this.itensPorPagina);
        },
        error: (err: any) => {
          console.error('Erro ao adicionar cargo:', err);
          this.modalService.erro('Erro', 'Falha ao adicionar cargo');
        }
      });
  }

  salvarEdicao(): void {
    const { id, ...dados } = this.cargoSelecionado;
    if (!id) return;

    const dadosAtualizacao: Cargo = {
      id: 0,
      titulo: dados.titulo,
      descricao: dados.descricao,
      salarioBase: dados.salarioBase,
      setoresIds: dados.setoresIds
    };

    this.cargoService.atualizarCargo(id, dadosAtualizacao)
      .subscribe({
        next: (cargoAtualizado: Cargo) => {
          this.modalService.sucesso('Sucesso', 'Cargo atualizado com sucesso!');
          this.mudarModo('listar');
          this.carregarCargosPaginado(this.paginaAtual, this.itensPorPagina);
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
            next: (sucesso: boolean) => {
              if (sucesso) {
                this.modalService.sucesso('Sucesso', 'Cargo excluído com sucesso!');
                this.carregarCargosPaginado(this.paginaAtual, this.itensPorPagina);
              }
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
    this.modalService.confirmar(
      'Cancelar',
      'Tem certeza que deseja cancelar? Todas as alterações não salvas serão perdidas.',
      'Confirmar',
      'Voltar'
    ).then((result: any) => {
      if (result.isConfirmed) {
        this.mudarModo('listar');
      }
    });
  }
  // No cargos.component.ts adicione:
setoresSelecionados: number[] = [];

toggleSetor(setorId: number): void {
  const index = this.setoresSelecionados.indexOf(setorId);
  if (index === -1) {
    this.setoresSelecionados.push(setorId);
  } else {
    this.setoresSelecionados.splice(index, 1);
  }
}

salvarVinculacao(): void {
  if (!this.cargoSelecionado.id) return;

  this.cargoService.vincularSetores(this.cargoSelecionado.id, this.setoresSelecionados)
    .subscribe({
      next: () => {
        this.modalService.sucesso('Sucesso', 'Setores vinculados com sucesso!');
        this.mudarModo('listar');
      },
      error: (err) => {
        console.error('Erro ao vincular setores:', err);
        this.modalService.erro('Erro', 'Falha ao vincular setores');
      }
    });
}
}
