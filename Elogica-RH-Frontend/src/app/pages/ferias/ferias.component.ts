import { Component } from '@angular/core';
import { FormBuscaComponent } from './components/form-busca/form-busca.component';
import { TabelaComponent } from './components/tabela/tabela.component';
import { PaginacaoComponent } from './components/paginacao/paginacao.component';

@Component({
  selector: 'app-ferias',
  standalone: true,
  imports: [
    FormBuscaComponent,
    TabelaComponent,
    PaginacaoComponent
  ],
  templateUrl: './ferias.component.html',
  styleUrl: './ferias.component.css'
})
export class FeriasComponent {

}
