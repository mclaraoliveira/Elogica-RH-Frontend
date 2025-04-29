/* import { Component } from '@angular/core';
import { ModalService } from '../../shared/services/modal.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cargos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cargos.component.html',
  styleUrls: ['./cargos.component.css']
})
export class CargosComponent {
  // Estados da aplicação
  modo: 'listar' | 'adicionar' | 'editar' = 'listar';

  // Dados dos cargos
  cargos = [
    {
      id: 1,
      cargo: 'VEGETABLE',
      descricao: 'Responsável por vegetais',
      salarioBase: 2500.00,
      setor: 'Produção'
    },
    {
      id: 2,
      cargo: 'FILTERABLE',
      descricao: 'Filtra produtos',
      salarioBase: 1800.00,
      setor: 'Qualidade'
    }
  ];

  // Cargo selecionado para edição
  cargoSelecionado: any = {};

  // Novo cargo para adicionar
  novoCargo: any = {
    cargo: '',
    descricao: '',
    salarioBase: 0,
    setor: ''
  };

  constructor(private modalService: ModalService) {}

  // Alternar entre modos de visualização
  mudarModo(modo: 'listar' | 'adicionar' | 'editar', cargo?: any) {
    this.modo = modo;
    if (modo === 'editar' && cargo) {
      this.cargoSelecionado = { ...cargo };
    } else if (modo === 'adicionar') {
      this.novoCargo = { cargo: '', descricao: '', salarioBase: 0, setor: '' };
    }
  }

  // Adicionar novo cargo
  adicionarCargo() {
    if (this.validarCargo(this.novoCargo)) {
      const novoId = this.cargos.length > 0 ? Math.max(...this.cargos.map(c => c.id)) + 1 : 1;
      this.cargos.push({ id: novoId, ...this.novoCargo });
      this.modalService.sucesso('Sucesso', 'Cargo adicionado com sucesso!');
      this.mudarModo('listar');
    }
  }

  // Salvar edição de cargo
  salvarEdicao() {
    if (this.validarCargo(this.cargoSelecionado)) {
      const index = this.cargos.findIndex(c => c.id === this.cargoSelecionado.id);
      if (index !== -1) {
        this.cargos[index] = { ...this.cargoSelecionado };
        this.modalService.sucesso('Sucesso', 'Cargo atualizado com sucesso!');
        this.mudarModo('listar');
      }
    }
  }

  // Validar dados do cargo
  validarCargo(cargo: any): boolean {
    if (!cargo.cargo || !cargo.setor || !cargo.salarioBase) {
      this.modalService.erro('Erro', 'Preencha todos os campos obrigatórios!');
      return false;
    }
    return true;
  }

  // Excluir cargo
  excluirCargo(cargo: any) {
    this.modalService.confirmar(
      'Confirmar exclusão',
      `Tem certeza que deseja excluir o cargo ${cargo.cargo}?`,
      'Confirmar',
      'Cancelar'
    ).then((result) => {
      if (result.isConfirmed) {
        this.cargos = this.cargos.filter(c => c.id !== cargo.id);
        this.modalService.sucesso('Sucesso', 'Cargo excluído com sucesso!');
      }
    });
  }

  // Cancelar operação
  cancelar() {
    this.modalService.confirmar(
      'Cancelar',
      'Tem certeza que deseja cancelar? Todas as alterações não salvas serão perdidas.',
      'Confirmar',
      'Voltar'
    ).then((result) => {
      if (result.isConfirmed) {
        this.mudarModo('listar');
      }
    });
  }
}
 */


// src/app/pages/cargos/cargos.component.ts
import { Component, OnInit } from '@angular/core';
import { Cargo } from '../../shared/interfaces/cargo';
import { RetornoPaginado } from '../../shared/interfaces/retornoPaginado';
import { CargoService } from '../../services/cargos.service';
import { ModalService } from '../../shared/services/modal.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cargos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cargos.component.html',
  styleUrls: ['./cargos.component.css']
})
export class CargosComponent implements OnInit {
  modo: 'listar' | 'adicionar' | 'editar' = 'listar';
  cargos: Cargo[] = [];
  cargoSelecionado: Cargo = {
    id: 0,
    titulo: '',
    descricao: '',
    salarioBase: 0,
    setores: []
  };

  novoCargo = {
    titulo: '',
    descricao: '',
    salarioBase: 0
  };

  // Paginação
  paginaAtual = 1;
  itensPorPagina = 10;
  totalRegistros = 0;

  constructor(
    private cargoService: CargoService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.carregarCargosPaginado();
  }

  // Getters e Setters para o template
  get titulo(): string {
    return this.modo === 'adicionar' ? this.novoCargo.titulo : this.cargoSelecionado.titulo;
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

  carregarCargosPaginado(): void {
    this.cargoService.listarCargosPaginado(this.paginaAtual, this.itensPorPagina)
      .subscribe({
        next: (retorno) => {
          this.cargos = retorno.registros;
          this.totalRegistros = retorno.totalRegistros;
        },
        error: () => this.modalService.erro('Erro', 'Falha ao carregar cargos')
      });
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
      this.cargoSelecionado = { ...cargo };
    } else if (modo === 'adicionar') {
      this.novoCargo = { titulo: '', descricao: '', salarioBase: 0 };
    }
  }

  adicionarCargo(): void {
    this.cargoService.adicionarCargo(this.novoCargo)
      .subscribe({
        next: () => {
          this.modalService.sucesso('Sucesso', 'Cargo adicionado com sucesso!');
          this.mudarModo('listar');
          this.carregarCargosPaginado();
        },
        error: () => this.modalService.erro('Erro', 'Falha ao adicionar cargo')
      });
  }

  salvarEdicao(): void {
    const { id, ...dados } = this.cargoSelecionado;
    this.cargoService.atualizarCargo(id, dados)
      .subscribe({
        next: (sucesso) => {
          if (sucesso) {
            this.modalService.sucesso('Sucesso', 'Cargo atualizado com sucesso!');
            this.mudarModo('listar');
            this.carregarCargosPaginado();
          }
        },
        error: () => this.modalService.erro('Erro', 'Falha ao atualizar cargo')
      });
  }

  excluirCargo(id: number): void {
    this.modalService.confirmar(
      'Confirmar exclusão',
      'Tem certeza que deseja excluir este cargo?',
      'Confirmar',
      'Cancelar'
    ).then((result) => {
      if (result.isConfirmed) {
        this.cargoService.excluirCargo(id)
          .subscribe({
            next: (sucesso) => {
              if (sucesso) {
                this.modalService.sucesso('Sucesso', 'Cargo excluído com sucesso!');
                this.carregarCargosPaginado();
              }
            },
            error: () => this.modalService.erro('Erro', 'Falha ao excluir cargo')
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
    ).then((result) => {
      if (result.isConfirmed) {
        this.mudarModo('listar');
      }
    });
  }
}
