import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FuncionarioService } from '../../services/funcionario.service';
import { Funcionario } from '../../shared/interfaces/funcionario';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar-funcionario',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './funcionario-editar.component.html',
  styleUrls: ['./funcionario-editar.component.css'],
})
export class FuncionarioEditarComponent implements OnInit {
  funcionario: Funcionario = {} as Funcionario;
  cargos: any[] = [];
  setores: any[] = [];
  horarios: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private funcionarioService: FuncionarioService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.buscarFuncionario(id);
    }
    this.carregarDados();
  }

  buscarFuncionario(id: number) {
    this.funcionarioService.buscarPorId(id).subscribe((dados) => {
      this.funcionario = dados.data;
      this.funcionario.dataNascimento =
        dados.data.dataNascimento?.split('T')[0];
      this.funcionario.dataContratacao =
        dados.data.dataContratacao?.split('T')[0];
    });
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

  salvarFuncionario() {
    if (this.funcionario.id) {
      this.funcionarioService
        .atualizar(this.funcionario.id, this.funcionario)
        .subscribe(() => {
          this.router.navigate(['/funcionarios']);
        });
    }
  }
}
