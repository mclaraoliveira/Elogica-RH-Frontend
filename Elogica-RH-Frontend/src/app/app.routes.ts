import { Routes } from '@angular/router';
<<<<<<< HEAD
// import { InicialComponent } from './pages/inicial/inicial.component';
=======
import { InicialComponent } from './pages/inicial/inicial.component';
>>>>>>> main
// import { ItensDeMenuComponent } from './pages/itens-de-menu/itens-de-menu.component';
// import { CargosComponent } from './pages/cargos/cargos.component';
// import { FuncionariosComponent } from './pages/funcionarios/funcionarios.component';
// import { SetoresComponent } from './pages/setores/setores.component';
<<<<<<< HEAD
import { HorariosComponent } from './pages/horarios/horarios.component';
// import { FeriasComponent } from './pages/ferias/ferias.component';
// import { PaginaNaoEncontradaComponent } from './pages/pagina-nao-encontrada/pagina-nao-encontrada.component';
=======
// import { HorariosComponent } from './pages/horarios/horarios.component';
// import { FeriasComponent } from './pages/ferias/ferias.component';
import { PaginaNaoEncontradaComponent } from './pages/pagina-nao-encontrada/pagina-nao-encontrada.component';
>>>>>>> main

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/inicial',
    pathMatch: 'full'
  },
<<<<<<< HEAD
  // {
  //   path: 'inicial',
  //   component: InicialComponent,
  //   title: 'Página Inicial'
  // },
=======
  {
    path: 'inicial',
    component: InicialComponent,
    title: 'Página Inicial'
  },
>>>>>>> main
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
  // {
  //   path: 'funcionarios',
  //   component: FuncionariosComponent,
  //   title: 'Funcionários'
  // },
  // {
  //   path: 'setores',
  //   component: SetoresComponent,
  //   title: 'Setores'
  // },
<<<<<<< HEAD
  {
    path: 'horarios',
    component: HorariosComponent,
    title: 'Horários'
  },
=======
  // {
  //   path: 'horarios',
  //   component: HorariosComponent,
  //   title: 'Horários'
  // },
>>>>>>> main
  // {
  //   path: 'ferias',
  //   component: FeriasComponent,
  //   title: 'Férias'
  // },
<<<<<<< HEAD
  // {
  //   path: '**',
  //   component: PaginaNaoEncontradaComponent,
  //   title: 'Página não encontrada'
  // }
=======
  {
    path: '**',
    component: PaginaNaoEncontradaComponent,
    title: 'Página não encontrada'
  }
>>>>>>> main
];
