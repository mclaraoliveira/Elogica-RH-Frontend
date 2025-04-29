import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, Renderer2, signal } from '@angular/core';

@Component({
  selector: 'app-menu-cabecalho',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu-cabecalho.component.html',
  styleUrl: './menu-cabecalho.component.css'
})
export class MenuCabecalhoComponent {
  theme: 'light' | 'dark' = 'dark';

  isNotificationsVisible = signal(false);
  isProfileVisible = signal(false);
  isMessagesVisible = signal(false);
  isSearchVisible = signal(false);

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    // Carrega tema salvo (se houver)
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    this.theme = savedTheme ?? 'dark';
    this.applyTheme(this.theme);
  }

  // Aplica o tema no elemento <html>
  private applyTheme(theme: 'light' | 'dark') {
    const html = document.documentElement;
    this.renderer.setAttribute(html, 'data-bs-theme', theme);
  }

  // Alterna tema e salva no localStorage
  toggleTheme(): void {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    this.applyTheme(this.theme);
    localStorage.setItem('theme', this.theme);
  }

  notifications = [
    { text: 'Solicitação negada', icon: 'bi bi-x-circle', color: 'text-danger', date: '22/03/2024 às 10:00' },
    { text: 'Solicitação aprovada', icon: 'bi bi-check-circle', color: 'text-success', date: '22/03/2024 às 10:05' },
    { text: 'Recebimento de ofício', icon: 'bi bi-file-earmark-text', color: 'text-secondary', date: '22/03/2024 às 10:10' },
    { text: 'Solicitação negada', icon: 'bi bi-x-circle', color: 'text-danger', date: '22/03/2024 às 10:00' },
    { text: 'Solicitação aprovada', icon: 'bi bi-check-circle', color: 'text-success', date: '22/03/2024 às 10:05' },
    { text: 'Recebimento de ofício', icon: 'bi bi-file-earmark-text', color: 'text-secondary', date: '22/03/2024 às 10:10' }
  ];

  messages = Array(8).fill({
    text: 'Mensagem para você',
    date: '22/03/2024 às 10:23'
  });

  toggleSearch() {
    const isVisible = this.isSearchVisible();
    this.closeAllPanels();
    this.isSearchVisible.set(!isVisible);
  }

  toggleProfile() {
    const isVisible = this.isProfileVisible();
    this.closeAllPanels();
    this.isProfileVisible.set(!isVisible);
  }

  toggleMessages() {
    const isVisible = this.isMessagesVisible();
    this.closeAllPanels();
    this.isMessagesVisible.set(!isVisible);
  }

  toggleNotifications() {
    const isVisible = this.isNotificationsVisible();
    this.closeAllPanels();
    this.isNotificationsVisible.set(!isVisible);
  }

  closeAllPanels() {
    this.isSearchVisible.set(false);
    this.isMessagesVisible.set(false);
    this.isNotificationsVisible.set(false);
    this.isProfileVisible.set(false);
  }

  getRowClass(index: number): string {
    return index % 2 === 0 ? 'bg-light-blue' : 'bg-light';
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.closeAllPanels();
    }
  }
}