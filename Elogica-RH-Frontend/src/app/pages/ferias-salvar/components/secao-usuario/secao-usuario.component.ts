import { Component, Input } from '@angular/core';
import { Funcionario } from '../../../../shared/interfaces/funcionario';
import { CommonModule } from '@angular/common';
import { NgxMaskPipe } from 'ngx-mask';
import { FuncionarioService } from '../../../../services/funcionario.service';

@Component({
  selector: 'app-secao-usuario',
  standalone: true,
  imports: [CommonModule, NgxMaskPipe],
  templateUrl: './secao-usuario.component.html',
  styleUrl: './secao-usuario.component.css'
})
export class SecaoUsuarioComponent {
  @Input() funcionario: Funcionario | null = null;

  constructor(public funcionarioService: FuncionarioService) {}
}
