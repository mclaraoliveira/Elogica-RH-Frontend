import { Component, OnInit } from '@angular/core';
import { FuncionarioService } from '../../services/funcionario.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-funcionario-cadastro',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './funcionario-cadastro.component.html',
})
export class FuncionarioCadastroComponent implements OnInit {
  funcionario: any = {
    nome: '',
    cpf: '',
    dataNascimento: '',
    email: '',
    telefone: '',
    endereco: '',
    dataContratacao: '',
    salario: '',
    cargosId: '',
    setoresId: '',
    horariosId: '',
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
      next: (data: any) => {
        this.horarios = Array.isArray(data.data) ? data.data : [];
      },
      error: (error) => {
        console.error('Erro ao carregar horários:', error);
        this.horarios = [];
      },
    });

    // Carrega setores
    this.funcionarioService.getSetores().subscribe({
      next: (data: any) => {
        this.setores = Array.isArray(data.data) ? data.data : [];
        console.log(this.setores);
      },
      error: (error) => {
        console.error('Erro ao carregar setores:', error);
        this.setores = [];
      },
    });

    // Carrega cargos
    this.funcionarioService.getCargos().subscribe({
      next: (data: any) => {
        this.cargos = Array.isArray(data.data) ? data.data : [];
      },
      error: (error) => {
        console.error('Erro ao carregar cargos:', error);
        this.cargos = [];
      },
    });
  }

  cadastrarFuncionario() {
    const payload = {
      nome: this.funcionario.nome,
      cpf: this.funcionario.cpf,
      dataNascimento: new Date(this.funcionario.dataNascimento).toISOString(),
      email: this.funcionario.email,
      telefone: this.funcionario.telefone,
      endereco: this.funcionario.endereco,
      dataContratacao: new Date(this.funcionario.dataContratacao).toISOString(),
      salario: this.funcionario.salario,
      ativo: true,
      cargosId: this.funcionario.cargosId ? +this.funcionario.cargosId : null,
      setoresId: this.funcionario.setoresId
        ? +this.funcionario.setoresId
        : null,
      horariosId: this.funcionario.horariosId
        ? +this.funcionario.horariosId
        : null,
    };

    console.log('Payload enviado:', payload);

    this.funcionarioService.cadastrarFuncionario(payload).subscribe({
      next: () => {
        console.log('Funcionário cadastrado com sucesso!');
        this.router.navigate(['/cadastros']);
      },
      error: (err: any) => {
        console.error('Erro ao cadastrar funcionário', err);
      },
    });
  }
}
