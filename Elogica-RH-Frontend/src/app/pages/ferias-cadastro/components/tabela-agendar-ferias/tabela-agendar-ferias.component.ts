import { Component, Input } from '@angular/core';
import { Funcionario } from '../../../../shared/interfaces/funcionario';
import { FuncionarioService } from '../../../../services/funcionario.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

@Component({
  selector: 'app-tabela-agendar-ferias',
  standalone: true,
  imports: [CommonModule, NgxMaskDirective, NgxMaskPipe, RouterLink],
  templateUrl: './tabela-agendar-ferias.component.html',
  styleUrl: './tabela-agendar-ferias.component.css'
})
export class TabelaAgendarFeriasComponent {
  funcionarios: Funcionario[] = [];
  @Input() tituloTabela: string = ""
  constructor(private readonly funcionarioService: FuncionarioService) {}

  ngOnInit() {

    this.funcionarioService.listaFuncionarios().subscribe(funcionarios => {
      this.funcionarios = funcionarios;
    });
  }
}
