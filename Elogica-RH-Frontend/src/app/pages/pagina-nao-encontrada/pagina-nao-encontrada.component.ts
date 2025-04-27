import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pagina-nao-encontrada',
  standalone: true,
  imports: [],
  templateUrl: './pagina-nao-encontrada.component.html',
  styleUrl: './pagina-nao-encontrada.component.css'
})
export class PaginaNaoEncontradaComponent {
  constructor(private location: Location) {}

  voltar() {
    this.location.back();
  }
}
