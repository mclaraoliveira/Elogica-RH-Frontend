import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuCabecalhoComponent } from './shared/components/menu-cabecalho/menu-cabecalho.component';
import { MenuLateralComponent } from './shared/components/menu-lateral/menu-lateral.component';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MenuCabecalhoComponent,
    MenuLateralComponent,
    RouterOutlet,
    HttpClientModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Elogica-RH-Frontend';
}
