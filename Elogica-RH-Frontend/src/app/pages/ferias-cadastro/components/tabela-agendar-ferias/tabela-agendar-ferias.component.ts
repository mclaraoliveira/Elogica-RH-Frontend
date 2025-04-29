import { Component, Input, OnInit } from '@angular/core';
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
export class TabelaAgendarFeriasComponent implements OnInit {
  funcionarios: Funcionario[] = [];
  funcionarioSelecionado: Funcionario | null = null;
  @Input() tituloTabela: string = "";

  constructor(private readonly funcionarioService: FuncionarioService) {}

  ngOnInit() {
    this.funcionarioService.listaFuncionarios().subscribe({
      next: (funcionarios) => {
        this.funcionarios = funcionarios;
      },
      error: (err) => {
        console.error('Erro ao carregar funcionários:', err);
        // Opcional: Exibir mensagem de erro para o usuário
      }
    });
  }

  selecionarFuncionario(funcionario: Funcionario) {
    this.funcionarioSelecionado = funcionario;
  }
}
