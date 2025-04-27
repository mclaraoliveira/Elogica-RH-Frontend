import { Router } from '@angular/router';
import { Setor, SetoresService } from './../../services/setores/setores.service';
import { Component, OnInit } from '@angular/core';
import { RetornoPaginado } from '../../shared/interfaces/retornoPaginado';

@Component({
  selector: 'app-setores',
  standalone: true,
  imports: [],
  templateUrl: './setores.component.html',
  styleUrl: './setores.component.css'
})
export class SetoresComponent implements OnInit{
  setores: Setor[] = [];
  paginaAtual: number = 1;
  qtdPagina: number = 10;
  totalRegistros: number = 0;

  constructor(
    private setoresService: SetoresService,
    private setoresComponent: SetoresComponent,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarSetores();
  }

  carregarSetores(): void {
    this.setoresService
      .buscarSetoresPaginado(this.paginaAtual, this.qtdPagina)
      .subscribe((retorno: RetornoPaginado<Setor>) => {
        this.setores = retorno.registros;
        this.totalRegistros = retorno.totalRegistros;
      })
  }
}
