import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-valida-menu',
  standalone: true,
  imports: [],
  templateUrl: './valida-menu.component.html',
  styleUrl: './valida-menu.component.css'
})
export class ValidaMenuComponent {
  @Input() control!: FormControl;

}

export function nonZeroValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return control.value === '0' ? { nonZero: true } : null;
  };
}
