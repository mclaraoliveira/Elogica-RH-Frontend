import { Component, Input } from '@angular/core';
import { Funcionario } from '../../../../shared/interfaces/funcionario';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

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

  onSubmit() {
    if (this.feriasForm.valid && this.funcionario) {
      const feriasData = {
        dataInicio: this.feriasForm.value.dataInicio,
        dataFim: this.feriasForm.value.dataFim,
        funcionarioId: this.funcionario.id
      };
      console.log('Dados para enviar:', feriasData);
      // TODO: Chamar o serviço para salvar as férias
      // Exemplo: this.feriasService.salvarFerias(feriasData).subscribe(...)
    }
  }
}
