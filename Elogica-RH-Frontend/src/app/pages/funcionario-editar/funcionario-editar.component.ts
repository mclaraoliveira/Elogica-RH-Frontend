import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-funcionario-editar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './funcionario-editar.component.html',
  styleUrl: './funcionario-editar.component.css',
})
export class FuncionarioEditarComponent {}
