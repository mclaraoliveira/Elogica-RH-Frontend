import { Component, Input, OnInit } from '@angular/core';
import Ferias from '../../../../shared/interfaces/ferias';
import { FeriasService } from '../../../../services/ferias.service';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { FuncionarioService } from '../../../../services/funcionario.service';
import { Funcionario } from '../../../../shared/interfaces/funcionario';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tabela',
  standalone: true,
  imports: [CommonModule, NgxMaskDirective, NgxMaskPipe, RouterLink],
  templateUrl: './tabela.component.html',
  styleUrl: './tabela.component.css'
})
export class TabelaComponent implements OnInit {
  feriasComFuncionarios: any[] = []; // Array combinado
  @Input() tituloTabela: string = ""

  constructor(
    private readonly feriasService: FeriasService,
    private readonly funcionarioService: FuncionarioService,
  ) {}

  ngOnInit() {
    this.carregarDados();
  }

  carregarDados() {
    // Busca ambas as listas em paralelo
    this.feriasService.buscarFerias().subscribe(ferias => {
      this.funcionarioService.listaFuncionarios().subscribe(funcionarios => {
        // Combina os dados
        this.feriasComFuncionarios = ferias.map(feria => {
          const funcionario = funcionarios.find(f => f.id === feria.funcionarioId);
          return {
            ...feria,
            funcionario: funcionario || null
          };
        });
      });
    });
  }
}
