import { Component, Input, OnInit } from '@angular/core';
import Ferias from '../../../../shared/interfaces/ferias';
import { FeriasService } from '../../../../services/ferias.service';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

@Component({
  selector: 'app-tabela',
  standalone: true,
  imports: [CommonModule, NgxMaskDirective, NgxMaskPipe],
  templateUrl: './tabela.component.html',
  styleUrl: './tabela.component.css'
})
export class TabelaComponent implements OnInit {
  ferias: Ferias[] = [];
  @Input() tituloTabela: string = ""

  constructor(private readonly feriasService: FeriasService) {}

  ngOnInit() {
    this.feriasService.buscarFerias().subscribe(listaFerias => this.ferias = listaFerias);
  }

}
