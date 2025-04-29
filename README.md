# Front-end do Sistema Elógica RH

## Descrição do Projeto
Este projeto é o front-end de um sistema de gerenciamento de Recursos Humanos (RH), utilizando **Angular 17** e **Bootstrap 5**. O projeto visa atender às necessidades de gestão de funcionários, cargos, setores, férias e horários. Também inclui validações, funcionalidades como modo claro/escuro, busca no menu e paginação em listagens.

### Funcionalidades
- **Gestão de Funcionários**: Cadastro, edição, exclusão e visualização de dados pessoais, cargos e salários.
- **Controle de Cargos e Setores**: Cadastro e vinculação de cargos a setores, além de atribuição de funcionários a setores.
- **Gestão de Férias**: Solicitação e controle de férias com verificação de conflitos de datas (mínimo de 1 mês de antecedência).
- **Horários**: Gerenciamento de horários de trabalho (8h às 20h, com intervalos de 1h ou 2h entre 12h e 14h).
- **Itens de Menu**: Cadastro e edição de itens de menu com suporte a ícones para itens pai e URLs para itens filhos.
- **Páginas Adicionais**: Página inicial, página não encontrada e página em construção.

## Tecnologias Utilizadas
- **Angular 17**: Framework principal para construção do front-end.
- **Bootstrap 5**: Framework CSS para estilização e responsividade.
- **Bibliotecas Adicionais**:
  - **Sweet Alert 2**: Para exibição de alertas e modais.
  - **Bootstrap Icons**: Ícones para o menu e interface.
  - **Ngx Mask**: Máscaras para inputs (ex.: CPF com formato 123.456.789-00).
  - **Spinner**: Indicadores de carregamento.
  - **Font Awesome** (via CDN): Ícones adicionais.
- **Fonte**: Inter, definida como fonte global no `style.css`.

## Estrutura do Projeto
O projeto segue uma organização modular para facilitar manutenção e colaboração:

- **app/**
  - **pages/**: Contém os componentes das páginas da aplicação.
  - **services/**: Services individuais para comunicação com a API por tela.
  - **shared/**:
    - **components/**: Componentes reutilizáveis.
    - **interfaces/**: Interface `retornoPaginado.ts` para tipagem de respostas paginadas e interfaces específicas para páginas individuais (como `cargo.ts` e `funcionario.ts`).
    - **services/**: Services compartilhados:
      - `modal.service.ts`: Gerenciamento de modais.
      - `tratamento-erros.service.ts`: Tratamento de mensagens de erros da API para exibição em modais.
- **assets/**: Contém ilustrações e recursos visuais acessíveis a todos os colaboradores.
- **index.html**: Importa a fonte Inter via CDN.
- **style.css**: Define a fonte Inter como global.

### Configuração do Layout
O layout principal é estruturado no `app.component.html` com o uso de `router-outlet` para renderização dinâmica das páginas:

```html
<div class="d-flex flex-column min-vh-100">
  <app-menu-cabecalho></app-menu-cabecalho>
  <router-outlet></router-outlet>
  <app-menu-lateral></app-menu-lateral>
</div>
```

O `router-outlet` foi posicionado no componente de menu lateral para evitar sobreposições e garantir a correta renderização das páginas.

### Rotas
As rotas da aplicação estão definidas no arquivo `app.routes.ts`:

```typescript
import { Routes } from '@angular/router';
import { InicialComponent } from './pages/inicial/inicial.component';
import { ItensDeMenuComponent } from './pages/itens-de-menu/itens-de-menu.component';
import { CargosComponent } from './pages/cargos/cargos.component';
import { SetoresComponent } from './pages/setores/setores.component';
import { HorariosComponent } from './pages/horarios/horarios.component';
import { FeriasComponent } from './pages/ferias/ferias.component';
import { PaginaNaoEncontradaComponent } from './pages/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { FuncionariosComponent } from './pages/funcionarios/funcionarios.component';
import { FuncionarioCadastroComponent } from './pages/funcionario-cadastro/funcionario-cadastro.component';
import { FuncionarioEditarComponent } from './pages/funcionario-editar/funcionario-editar.component';

export const routes: Routes = [
  { path: '', redirectTo: '/inicial', pathMatch: 'full' },
  { path: 'inicial', component: InicialComponent, title: 'Página Inicial' },
  { path: 'itens-de-menu', component: ItensDeMenuComponent, title: 'Itens de Menu' },
  { path: 'cargos', component: CargosComponent, title: 'Cargos' },
  { path: 'setores', component: SetoresComponent, title: 'Setores' },
  { path: 'horarios', component: HorariosComponent, title: 'Horários' },
  { path: 'ferias', component: FeriasComponent, title: 'Férias' },
  { path: 'funcionarios', component: FuncionariosComponent, title: 'Funcionários' },
  { path: 'funcionarios-cadastro', component: FuncionarioCadastroComponent, title: 'Funcionário Cadastro' },
  { path: 'funcionarios-editar', component: FuncionarioEditarComponent, title: 'Funcionário Editar' },
  { path: '**', component: PaginaNaoEncontradaComponent, title: 'Página não encontrada' },
];
```

## Informações sobre o Front-End
- **Validações**: Todos os inputs possuem validações de tamanho máximo e máscaras (ex.: CPF com pontuação automática).
- **Campos Obrigatórios**: Indicam obrigatoriedade ao usuário quando não preenchidos.
- **Paginação**: Todas as listagens são paginadas.
- **Menu**:
  - Suporta um nível de submenu.
  - Itens pai possuem ícones e não têm URLs.
  - Itens filhos possuem URLs, item pai e não têm ícones.
- **Cabeçalho**:
  - Informações de perfil mockadas.
  - Lâmpada funcional para alternar entre modo claro/escuro.
- **Regras Específicas**:
  - **Funcionários**: Campos de cargo e salário bloqueados até a seleção de setor e cargo, respectivamente.
  - **Férias**: Não podem ser agendadas com menos de 1 mês de antecedência.
  - **Horários**: Limitados entre 8h e 20h, com intervalos de 1h ou 2h entre 12h e 14h, em horas fechadas.
  - **Cargos**: Vinculação obrigatória a setores.
  - **Itens de Menu**: Ícone obrigatório para itens pai; URL e item pai obrigatórios para itens filhos.

## Instalação e Configuração
1. Clone o repositório:
   ```bash
   git clone https://github.com/<seu-usuario>/Elogica-RH-Frontend.git
   ```
2. Acesse o diretório do projeto:
   ```bash
   cd Elogica-RH-Frontend
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Instale as bibliotecas adicionais:
   ```bash
   npm install bootstrap@5 sweetalert2 bootstrap-icons ngx-mask
   ```
5. Inicie o servidor de desenvolvimento:
   ```bash
   ng serve
   ```
6. Acesse a aplicação em `http://localhost:4200`.

## Onde encontrar o Back-end do projeto
- O repositório que contém a API utilizada neste mesmo projeto e o script de seu banco de dados pode ser acessado [aqui](https://github.com/GabrieldSantana/Elogica-RH-Backend).

## Colaboradores
Agradecemos aos seguintes colaboradores pelo seu empenho e trabalho neste projeto:
- [Clara Oliveira](https://github.com/mclaraoliveira)
- [Conrado Capistrano](https://github.com/ConradoCapistrano)
- [Davisson Falcão](https://github.com/DavissonJr)
- [Elton Luiz](https://github.com/eltonluiz178)
- [Gabriel de Santana](https://github.com/gabrieldsantana)
- [Lucas Serafim](https://github.com/LucasSerafim147)
- [Thiago Felipe](https://github.com/thiagotfsilva)
- [Vanessa Rodrigues](https://github.com/Vanvrs)
