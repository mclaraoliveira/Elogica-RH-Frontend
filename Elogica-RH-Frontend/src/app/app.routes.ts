import { Routes } from '@angular/router';

// import { InicialComponent } from './pages/inicial/inicial.component';

import { InicialComponent } from './pages/inicial/inicial.component';

// import { ItensDeMenuComponent } from './pages/itens-de-menu/itens-de-menu.component';
// import { CargosComponent } from './pages/cargos/cargos.component';
// import { SetoresComponent } from './pages/setores/setores.component';

import { HorariosComponent } from './pages/horarios/horarios.component';
// import { FeriasComponent } from './pages/ferias/ferias.component';
// import { PaginaNaoEncontradaComponent } from './pages/pagina-nao-encontrada/pagina-nao-encontrada.component';

// import { HorariosComponent } from './pages/horarios/horarios.component';
// import { FeriasComponent } from './pages/ferias/ferias.component';
import { PaginaNaoEncontradaComponent } from './pages/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { FuncionariosComponent } from './pages/funcionarios/funcionarios.component';
import { FuncionarioCadastroComponent } from './pages/funcionario-cadastro/funcionario-cadastro.component';
import { FuncionarioEditarComponent } from './pages/funcionario-editar/funcionario-editar.component';
import { FeriasComponent } from './pages/ferias/ferias.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/inicial',
    pathMatch: 'full',
  },
  {
    path: 'inicial',
    component: InicialComponent,
    title: 'Página Inicial',
  },
  // {
  //   path: 'itens-de-menu',
  //   component: ItensDeMenuComponent,
  //   title: 'Itens de Menu'
  // },
  // {
  //   path: 'cargos',
  //   component: CargosComponent,
  //   title: 'Cargos'
  // },
  {
    path: 'funcionarios',
    component: FuncionariosComponent,
    title: 'Funcionários',
  },
  {
    path: 'funcionarios-cadastro',
    component: FuncionarioCadastroComponent,
    title: 'Funcionário Cadastro',
  },
  {
    path: 'funcionarios-editar/:id',
    component: FuncionarioEditarComponent,
    title: 'Funcionário Editar',
  },
  // {
  //   path: 'setores',
  //   component: SetoresComponent,
  //   title: 'Setores'
  // },

  {
    path: 'horarios',
    component: HorariosComponent,
    title: 'Horários'
  },

  // {
  //   path: 'horarios',
  //   component: HorariosComponent,
  //   title: 'Horários'
  // },

  {
    path: 'ferias',
    component: FeriasComponent,
    title: 'Férias'
  },
  {
    path: '**',
    component: PaginaNaoEncontradaComponent,
    title: 'Página não encontrada',
  },
];
