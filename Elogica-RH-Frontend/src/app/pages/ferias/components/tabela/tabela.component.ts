import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tabela',
  standalone: true,
  imports: [],
  templateUrl: './tabela.component.html',
  styleUrl: './tabela.component.css'
})
export class TabelaComponent {
  @Input() tituloTabela: string = ""
}
