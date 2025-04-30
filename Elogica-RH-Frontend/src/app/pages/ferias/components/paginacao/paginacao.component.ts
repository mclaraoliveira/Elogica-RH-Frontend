import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-paginacao',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paginacao.component.html',
  styleUrl: './paginacao.component.css'
})
export class PaginacaoComponent {
  @Input() paginaAtual = 1;
  @Input() totalItens = 0;
  @Input() itensPorPagina = 10;
  @Output() paginaMudou = new EventEmitter<number>();

  get totalPaginas(): number {
    return Math.ceil(this.totalItens / this.itensPorPagina);
  }

  alterarPagina(event: Event, pagina: number) {
    event.preventDefault(); // Impede o comportamento padrão do link
    if (pagina >= 1 && pagina <= this.totalPaginas) {
      this.paginaMudou.emit(pagina);
    }
  }

  paginasParaExibir(): number[] {
    const paginas = [];
    const total = this.totalPaginas;
    for (let i = 1; i <= total; i++) {
      paginas.push(i);
    }
    return paginas;
  }
}
