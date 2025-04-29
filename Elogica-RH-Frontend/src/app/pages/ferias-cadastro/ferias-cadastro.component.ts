import { Component } from '@angular/core';
import { FormBuscaComponent } from '../ferias/components/form-busca/form-busca.component';
import { TabelaAgendarFeriasComponent } from './components/tabela-agendar-ferias/tabela-agendar-ferias.component';

@Component({
  selector: 'app-ferias-cadastro',
  standalone: true,
  imports: [FormBuscaComponent, TabelaAgendarFeriasComponent],
  templateUrl: './ferias-cadastro.component.html',
  styleUrl: './ferias-cadastro.component.css'
})
export class FeriasCadastroComponent {

}
