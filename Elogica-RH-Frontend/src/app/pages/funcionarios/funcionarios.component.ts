import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-funcionarios',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './funcionarios.component.html',
  styleUrl: './funcionarios.component.css',
})
export class FuncionariosComponent {}
