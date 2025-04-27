import { Routes } from '@angular/router';
import { InicialComponent } from './pages/inicial/inicial.component';
// import { ItensDeMenuComponent } from './pages/itens-de-menu/itens-de-menu.component';
// import { CargosComponent } from './pages/cargos/cargos.component';
<<<<<<< HEAD
import { FuncionariosComponent } from './pages/funcionarios/funcionarios.component';
=======
// import { FuncionariosComponent } from './pages/funcionarios/funcionarios.component';
>>>>>>> main
// import { SetoresComponent } from './pages/setores/setores.component';
// import { HorariosComponent } from './pages/horarios/horarios.component';
// import { FeriasComponent } from './pages/ferias/ferias.component';
import { PaginaNaoEncontradaComponent } from './pages/pagina-nao-encontrada/pagina-nao-encontrada.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/inicial',
    pathMatch: 'full',
  },
  {
    path: 'inicial',
    component: InicialComponent,
<<<<<<< HEAD
    title: 'Página Inicial',
=======
    title: 'Página Inicial'
>>>>>>> main
  },
  // {
  //   path: 'itens-de-menu',
  //   component: ItensDeMenuComponent,
<<<<<<< HEAD
  //   title: 'Itens de Menu',
=======
  //   title: 'Itens de Menu'
>>>>>>> main
  // },
  // {
  //   path: 'cargos',
  //   component: CargosComponent,
<<<<<<< HEAD
  //   title: 'Cargos',
  // },
  {
    path: 'funcionarios',
    component: FuncionariosComponent,
    title: 'Funcionários',
  },
  // {
  //   path: 'setores',
  //   component: SetoresComponent,
  //   title: 'Setores',
=======
  //   title: 'Cargos'
  // },
  // {
  //   path: 'funcionarios',
  //   component: FuncionariosComponent,
  //   title: 'Funcionários'
  // },
  // {
  //   path: 'setores',
  //   component: SetoresComponent,
  //   title: 'Setores'
>>>>>>> main
  // },
  // {
  //   path: 'horarios',
  //   component: HorariosComponent,
<<<<<<< HEAD
  //   title: 'Horários',
=======
  //   title: 'Horários'
>>>>>>> main
  // },
  // {
  //   path: 'ferias',
  //   component: FeriasComponent,
<<<<<<< HEAD
  //   title: 'Férias',
=======
  //   title: 'Férias'
>>>>>>> main
  // },
  {
    path: '**',
    component: PaginaNaoEncontradaComponent,
    title: 'Página não encontrada',
  },
];
