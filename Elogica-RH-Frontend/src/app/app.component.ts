import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
<<<<<<< HEAD
import { RouterOutlet } from '@angular/router';
import { HorariosComponent } from './pages/horarios/horarios.component';
=======
import { MenuCabecalhoComponent } from './shared/components/menu-cabecalho/menu-cabecalho.component';
import { MenuLateralComponent } from './shared/components/menu-lateral/menu-lateral.component';
>>>>>>> main

@Component({
  selector: 'app-root',
  standalone: true,
<<<<<<< HEAD
  imports: [CommonModule, RouterOutlet, HorariosComponent],
=======
  imports: [CommonModule, MenuCabecalhoComponent, MenuLateralComponent],
>>>>>>> main
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Elogica-RH-Frontend';
}
