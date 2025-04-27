import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicial',
  standalone: true,
  imports: [],
  templateUrl: './inicial.component.html',
  styleUrl: './inicial.component.css'
})
export class InicialComponent {
  constructor(private router: Router) {}

  iniciar() {
    this.router.navigate(['/funcionarios']);
  }
}
