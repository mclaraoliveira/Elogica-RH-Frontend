import { Component, Input } from '@angular/core';
import { Funcionario } from '../../../../shared/interfaces/funcionario';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { FuncionarioService } from '../../../../services/funcionario.service';
import { FeriasService } from '../../../../services/ferias.service';
import Ferias from '../../../../shared/interfaces/ferias';
import { ModalService } from '../../../../shared/services/modal.service';

@Component({
  selector: 'app-form-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-registro.component.html',
  styleUrl: './form-registro.component.css'
})
export class FormRegistroComponent {
  @Input() funcionario: Funcionario | null = null;

  feriasForm = new FormGroup({
    dataInicio: new FormControl('', Validators.required),
    dataFim: new FormControl('', Validators.required)
  });

  constructor(
    public funcionarioService: FuncionarioService,
    private readonly feriasService: FeriasService,
    private readonly modalService: ModalService
  ) {}

  onSubmit() {
    console.log(this.feriasForm.valid);
    if (this.feriasForm.valid && this.funcionario) {
      const feriasData: Ferias = {
        dataInicio: new Date(this.feriasForm.value.dataInicio!),
        dataFim: new Date(this.feriasForm.value.dataFim!),
        funcionarioId: this.funcionario?.id!
      };

      this.feriasService.adicionarFerias(feriasData).subscribe({
        next: (response) => {
          console.log('Férias salvas com sucesso:', response);
          this.modalService.sucesso("Férias salvas com sucesso!", "As férias foram salvas com sucesso").then(() => {
            window.location.href = '/ferias';
          });
        },
        error: (err) => {
          this.modalService.erro('Erro ao salvar férias:', err.message);
        }
      });
    }
  }
}
