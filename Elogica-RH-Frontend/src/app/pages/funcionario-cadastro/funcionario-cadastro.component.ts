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

  constructor(
    private funcionarioService: FuncionarioService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  cadastrarFuncionario(): void {
    this.funcionarioService.cadastrarFuncionario(this.funcionario).subscribe({
      next: (response) => {
        console.log('Funcionário cadastrado com sucesso:', response);
        this.router.navigate(['/funcionarios']); // Redireciona para a lista de funcionários
      },
      error: (error) => {
        console.error('Erro ao cadastrar funcionário:', error);
      },
    });
  }
}
