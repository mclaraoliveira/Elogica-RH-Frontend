import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-paginacao-selecionar-usuario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paginacao-selecionar-usuario.component.html',
  styleUrl: './paginacao-selecionar-usuario.component.css'
})
export class PaginacaoSelecionarUsuarioComponent {
  @Input() paginaAtual = 1;
  @Input() totalItens = 0;
  @Input() itensPorPagina = 10;
  @Output() paginaMudou = new EventEmitter<number>();

  get totalPaginas(): number {
    return Math.ceil(this.totalItens / this.itensPorPagina);
  }

  alterarPagina(event: Event, pagina: number) {
    event.preventDefault();
    if (pagina >= 1 && pagina <= this.totalPaginas) {
      this.paginaMudou.emit(pagina);
    }
  }

  paginasParaExibir(): number[] {
    const paginas = [];
    const total = this.totalPaginas;
    const maxPaginasExibidas = 5; // Limite de páginas exibidas
    let inicio = Math.max(1, this.paginaAtual - Math.floor(maxPaginasExibidas / 2));
    let fim = Math.min(total, inicio + maxPaginasExibidas - 1);

    if (fim - inicio < maxPaginasExibidas - 1) {
      inicio = Math.max(1, fim - maxPaginasExibidas + 1);
    }

    for (let i = inicio; i <= fim; i++) {
      paginas.push(i);
    }
    return paginas;
  }
}
