import { Component } from '@angular/core';
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
