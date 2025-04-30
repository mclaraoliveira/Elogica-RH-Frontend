import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
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
  funcionariosPaginados: Funcionario[] = []; // Lista paginada
  funcionarioSelecionado: Funcionario | null = null;
  @Input() tituloTabela: string = "";

  // Propriedades de paginação
  paginaAtual = 1;
  itensPorPagina = 10;
  totalItens = 0;

  // Evento para notificar mudança de página
  @Output() paginaMudou = new EventEmitter<number>();

  constructor(private funcionarioService: FuncionarioService) {}

  ngOnInit() {
    this.carregarFuncionarios();
  }

  carregarFuncionarios() {
    this.funcionarioService.listaFuncionarios().subscribe({
      next: (funcionarios) => {
        this.funcionarios = funcionarios;
        this.totalItens = this.funcionarios.length;
        this.atualizarPagina();
      },
      error: (err) => {
        console.error('Erro ao carregar funcionários:', err);
        // Opcional: Exibir mensagem de erro para o usuário
      }
    });
  }

  selecionarFuncionario(funcionario: Funcionario) {
    this.funcionarioSelecionado = funcionario;
    this.funcionarioService.funcionarioSelecionado = this.funcionarioSelecionado;
    console.log('FUNCIONARIO :::::', this.funcionarioSelecionado);
  }

  atualizarPagina() {
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;
    this.funcionariosPaginados = this.funcionarios.slice(inicio, fim);
  }

  onPaginaMudou(novaPagina: number) {
    this.paginaAtual = novaPagina;
    this.atualizarPagina();
    this.paginaMudou.emit(novaPagina); // Opcional, caso precise notificar o componente pai
  }
}
