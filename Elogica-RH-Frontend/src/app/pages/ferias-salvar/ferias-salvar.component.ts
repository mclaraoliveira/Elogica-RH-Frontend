import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormRegistroComponent } from './components/form-registro/form-registro.component';
import { SecaoUsuarioComponent } from './components/secao-usuario/secao-usuario.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Funcionario } from '../../shared/interfaces/funcionario';
import { FuncionarioService } from '../../services/funcionario.service';

@Component({
  selector: 'app-ferias-salvar',
  standalone: true,
  imports: [FormRegistroComponent, SecaoUsuarioComponent, CommonModule, RouterModule],
  templateUrl: './ferias-salvar.component.html',
  styleUrl: './ferias-salvar.component.css'
})
export class FeriasSalvarComponent implements OnInit {
  funcionario: Funcionario | null = null;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private funcionarioService: FuncionarioService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      console.log(id)
      if (id) {
        this.funcionarioService.buscarPorId(id).subscribe({
          next: (funcionario) => {
            this.funcionario = funcionario.data;
            this.error = null;
          },
          error: (err) => {
            this.error = 'Erro ao carregar informações do funcionário. Tente novamente.';
            console.error('Erro ao buscar funcionário:', err);
          }
        });
        console.log(this.funcionario);
      } else {
        this.error = 'Nenhum funcionário selecionado.';
      }
    });
  }
}
