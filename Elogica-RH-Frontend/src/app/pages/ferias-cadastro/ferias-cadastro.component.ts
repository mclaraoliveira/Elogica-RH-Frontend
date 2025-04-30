import { Component } from '@angular/core';
import { FormBuscaComponent } from '../ferias/components/form-busca/form-busca.component';
import { TabelaAgendarFeriasComponent } from './components/tabela-agendar-ferias/tabela-agendar-ferias.component';
import { RouterLink } from '@angular/router';
import { PaginacaoSelecionarUsuarioComponent } from './components/paginacao-selecionar-usuario/paginacao-selecionar-usuario.component';

@Component({
  selector: 'app-ferias-cadastro',
  standalone: true,
  imports: [
    FormBuscaComponent,
    TabelaAgendarFeriasComponent,
    RouterLink,
    PaginacaoSelecionarUsuarioComponent
  ],
  templateUrl: './ferias-cadastro.component.html',
  styleUrl: './ferias-cadastro.component.css'
})
export class FeriasCadastroComponent {

}
