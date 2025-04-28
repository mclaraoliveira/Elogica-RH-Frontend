import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MenuCabecalhoComponent } from './shared/components/menu-cabecalho/menu-cabecalho.component';
import { MenuLateralComponent } from './shared/components/menu-lateral/menu-lateral.component';
import { FeriasComponent } from './pages/ferias/ferias.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MenuCabecalhoComponent, MenuLateralComponent, FeriasComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Elogica-RH-Frontend';
}
