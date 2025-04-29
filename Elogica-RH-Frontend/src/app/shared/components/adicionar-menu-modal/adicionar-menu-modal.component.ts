import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ValidaMenuComponent, nonZeroValidator } from "../valida-menu/valida-menu.component";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ItensMenuService } from '../../../services/itens-menu.service';
import { Menu } from '../../interfaces/menu';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-adicionar-menu-modal',
  standalone: true,
  imports: [ValidaMenuComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './adicionar-menu-modal.component.html',
  styleUrl: './adicionar-menu-modal.component.css'
})
export class AdicionarMenuModalComponent  implements OnInit {

  @Input() menus: Menu[] = [];
  formulario: FormGroup;
  @Output() salvar = new EventEmitter<any>();
  @Output() cancelar = new EventEmitter<void>();
  abrirModalAdicionar = false;
    private herancaSubscription: Subscription | null | undefined = null;

  constructor(private fb: FormBuilder, private _itensMenuService: ItensMenuService) {
    this.formulario = this.fb.group({
      titulo: ['', Validators.required],
      descricao: ['', Validators.required],
      heranca: [true],
      ordem: [0, [Validators.required, Validators.min(1)]],
      icone: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.abrirModalAdicionar = true;
    this.ouvirMudancasHeranca();
  }

  private ouvirMudancasHeranca(): void {
    if (this.herancaSubscription) {
      this.herancaSubscription.unsubscribe();
    }

    this.herancaSubscription = this.formulario.get('heranca')?.valueChanges.subscribe((isPai: boolean) => {
      if (isPai) {
        // Item Pai: Adiciona icone, remove url e itemPai
        this.formulario.addControl('icone', this.fb.control('', Validators.required));
        this.formulario.removeControl('url');
        this.formulario.removeControl('itemPai');
      } else {
        // Item Filho: Adiciona url e itemPai, remove icone
        this.formulario.addControl('url', this.fb.control('', Validators.required));
        this.formulario.addControl('itemPai', this.fb.control('', [Validators.required, nonZeroValidator()]));
        this.formulario.removeControl('icone');
      }
    });
  }

  obterControle(nome: string): FormControl {
    const control = this.formulario.get(nome);
    if (!control) {
      throw new Error('Controle de formulário não encotrado:' + nome)
    }
    return control as FormControl;
  }

  verificaPai(): boolean {
    return this.formulario.get('heranca')?.value ?? false;
  }

  fecharModal() {
    this.cancelar.emit();
    this.abrirModalAdicionar = false;
  }

  salvarFormulario(): void {
    if (this.formulario.valid) {
      // Obtém os valores do formulário
      const formValues = this.formulario.value;

      // Cria o objeto Menu mapeando os valores do formulário
      const menu: any = {
        titulo: formValues.titulo,
        descricao: formValues.descricao,
        ordem: formValues.ordem,
        icone: formValues.heranca ? formValues.icone : "-", // Inclui icone apenas se for Item Pai
        url: !formValues.heranca ? formValues.url : "-", // Inclui url apenas se for Item Filho
        menuPaiId: !formValues.heranca ? (formValues.itemPai ? +formValues.itemPai : 0) : 0, // Define menuPaiId (0 para Item Pai, ou o valor de itemPai para Item Filho)
      };

      // Emite o objeto mapeado
      this.salvar.emit(menu);
      this.abrirModalAdicionar = false;
    } else {
      this.formulario.markAllAsTouched();
    }
  }
}
