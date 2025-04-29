import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItensMenuService } from '../../services/itens-menu.service';
import { MenuModalComponent } from "../../shared/components/menu-modal/menu-modal.component";
import Swal from 'sweetalert2';
import { AdicionarMenuModalComponent } from "../../shared/components/adicionar-menu-modal/adicionar-menu-modal.component";
import { ModalService } from '../../shared/services/modal.service';
import { ItemMenu } from '../../shared/interfaces/itemMenu';

@Component({
  selector: 'app-itens-de-menu',
  standalone: true,
  imports: [CommonModule, MenuModalComponent, AdicionarMenuModalComponent],
  templateUrl: './itens-de-menu.component.html',
  styleUrl: './itens-de-menu.component.css'
})
export class ItensDeMenuComponent implements OnInit {

  constructor(private _itensMenuService: ItensMenuService, private _modalService: ModalService){}

  @Input() menus: ItemMenu[] = [];
  exibirModalAdicionar: boolean = false;
  menuSelecionado: ItemMenu | null = null;

  paginaAtual: number = 1;
  quantidadePorPagina: number = 10;
  totalRegistros: number = 0;
  totalRegistrosAPI: number = 0;
  paginasVisiveis: (number | string)[] = []; // tipo string para permitir ('...')

  ngOnInit(): void {
    this.buscarMenus()
  }

  buscarMenus(): void {
    this._itensMenuService
      .obterMenusPaginado(this.paginaAtual, this.quantidadePorPagina)
      .subscribe({
        next: (response) => {
          console.log('Resposta da API:', response);
          let menus = response.data.registros;

          // Armazenar o total de registros da API (antes do filtro)
          this.totalRegistrosAPI = response.data.totalRegistro;

          // Atualiza os menus filtrados
          this.menus = menus;
          this.totalRegistros = menus.length; // Atualiza o total de registros filtrados
          this.calcularPaginasVisiveis();
        },
        error: (error) => {
          console.error('Erro ao buscar funcionários:', error);
        },
      });
  }

  abrirModalEditar(menu: ItemMenu): void {
    this.menuSelecionado = menu;
  }

  abrirModalAdicionar(): void {
    this.exibirModalAdicionar = true;
  }

  onCancelar() {
    this.menuSelecionado = null;
    this.exibirModalAdicionar = false;
  }

  onSalvar(formValue: any) {
    const menu: ItemMenu = formValue;
    console.log(menu, "oi");

    if (menu.id) {
      // Atualizar menu existente
      this._itensMenuService.atualizarMenu(menu).subscribe(() => {
        this.buscarMenus();
      });
    } else {
      // Criar novo menu
      this._itensMenuService.adicionarMenu(menu).subscribe(() => {
        this.buscarMenus();
      });
    }
    this.menuSelecionado = null;
    this.exibirModalAdicionar = false; // Fechar o modal após salvar
  }

  confirmarExclusao(menu: ItemMenu): void {
    if (!menu?.id) {
      return; // Garante que há um ID para deletar
    }

    Swal.fire({
      title: 'Tem certeza?',
      text: 'Você não poderá reverter essa ação!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.isConfirmed) {
        this._itensMenuService.excluirMenu(menu.id).subscribe({
          next: () => {
            this._modalService.confirmar("Sucesso!","O menu foi deletado com sucesso!");
            this.buscarMenus();
          },
          error: (err) => {
            this._modalService.erro("Erro!","Não é possível deletar um menu pai que possui filhos ligados a ele.")
          }
        });
      }
    });
  }

  proximaPagina(): void {
    if (this.paginaAtual < this.totalPaginas()) {
      this.paginaAtual++;
      this.buscarMenus();
    }
  }

  paginaAnterior(): void {
    if (this.paginaAtual > 1) {
      this.paginaAtual--;
      this.buscarMenus();
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
      this.buscarMenus();
    }
  }

}
