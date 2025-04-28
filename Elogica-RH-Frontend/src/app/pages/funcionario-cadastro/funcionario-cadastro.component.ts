import { Component, OnInit } from '@angular/core';
import { FuncionarioService } from '../../services/funcionario.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-funcionario-cadastro',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './funcionario-cadastro.component.html',
})
export class FuncionarioCadastroComponent implements OnInit {
  funcionario: any = {
    nome: '',
    cpf: '',
    dataNascimento: '',
    email: '',
    contato: '',
    dataContratacao: '',
    endereco: '',
    horario: '',
    setor: '',
    cargo: '',
    salario: '',
  };

  horarios: any[] = [];
  setores: any[] = [];
  cargos: any[] = [];

  constructor(
    private funcionarioService: FuncionarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados(): void {
    // Carrega horários
    this.funcionarioService.getHorarios().subscribe({
      next: (data) => {
        this.horarios = Array.isArray(data) ? data : [];
      },
      error: (error) => {
        console.error('Erro ao carregar horários:', error);
        this.horarios = [];
      },
    });

    // Carrega setores
    this.funcionarioService.getSetores().subscribe({
      next: (data) => {
        this.setores = Array.isArray(data) ? data : [];
      },
      error: (error) => {
        console.error('Erro ao carregar setores:', error);
        this.setores = [];
      },
    });

    // Carrega cargos
    this.funcionarioService.getCargos().subscribe({
      next: (data) => {
        this.cargos = Array.isArray(data) ? data : [];
      },
      error: (error) => {
        console.error('Erro ao carregar cargos:', error);
        this.cargos = [];
      },
    });
  }

  cadastrarFuncionario(): void {
    this.funcionarioService.cadastrarFuncionario(this.funcionario).subscribe({
      next: (response) => {
        console.log('Funcionário cadastrado com sucesso:', response);
        this.router.navigate(['/funcionarios']);
      },
      error: (error) => {
        console.error('Erro ao cadastrar funcionário:', error);
      },
    });
  }
}
