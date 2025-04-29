import { Component, OnInit } from '@angular/core';
import { MenuLateralService } from '../../services/menu-lateral.service';
import { CommonModule } from '@angular/common';
import { Menu } from '../../interfaces/menu';

@Component({
  selector: 'app-menu-lateral',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu-lateral.component.html',
  styleUrl: './menu-lateral.component.css',
})
export class MenuLateralComponent implements OnInit {
  menusPais: Menu[] = [];
  menusFilhos: { [key: number]: Menu[] } = {};
  menusAbertos: { [key: number]: boolean } = {}; // <<< Aqui controla abertos

  constructor(private menuLateralService: MenuLateralService) {}

  ngOnInit(): void {
    this.menuLateralService.listar().subscribe((menus) => {
      this.menusPais = menus
        .filter((menu) => menu.menuPaiId === 0)
        .sort((a, b) => a.ordem - b.ordem);

      menus
        .filter((menu) => menu.menuPaiId !== 0)
        .forEach((filho) => {
          if (!this.menusFilhos[filho.menuPaiId]) {
            this.menusFilhos[filho.menuPaiId] = [];
          }
          this.menusFilhos[filho.menuPaiId].push(filho);
        });

      for (let key in this.menusFilhos) {
        this.menusFilhos[key] = this.menusFilhos[key].sort(
          (a, b) => a.ordem - b.ordem
        );
      }
    });
  }

  toggleMenu(menuId: number) {
    this.menusAbertos[menuId] = !this.menusAbertos[menuId];
  }
}
