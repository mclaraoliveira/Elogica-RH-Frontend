import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Funcionario } from '../../shared/interfaces/funcionario';
import { FuncionarioService } from '../../services/funcionario.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-funcionarios-editar',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './funcionario-editar.component.html',
  styleUrls: ['./funcionario-editar.component.css'],
})
export class FuncionarioEditarComponent implements OnInit {
  funcionario: any = {
    nome: '',
    cpf: '',
    ativo: true,
    dataNascimento: '',
    email: '',
    telefone: '',
    dataContratacao: '',
    endereco: '',
    horariosId: null,
    setoresId: null,
    cargosId: null,
    salario: '',
  };

  horarios = [
    { id: 1, nome: 'Manhã' },
    { id: 2, nome: 'Tarde' },
    { id: 3, nome: 'Noite' },
  ];

  setores = [
    { id: 1, nome: 'Financeiro' },
    { id: 2, nome: 'Recursos Humanos' },
    { id: 3, nome: 'TI' },
  ];

  cargos = [
    { id: 1, nome: 'Analista' },
    { id: 2, nome: 'Gerente' },
    { id: 3, nome: 'Diretor' },
  ];

  constructor(
    private route: ActivatedRoute,
    private funcionarioService: FuncionarioService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.funcionarioService.buscarPorId(Number(id)).subscribe((dados) => {
        this.funcionario = dados;

        // Agora você já tem os dados para preencher no formulário
      });
    }
  }
}
