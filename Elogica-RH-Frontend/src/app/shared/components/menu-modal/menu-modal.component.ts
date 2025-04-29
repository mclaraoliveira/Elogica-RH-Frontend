import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ItensMenuService } from '../../../services/itens-menu.service';
import { Subscription } from 'rxjs';
import { nonZeroValidator, ValidaMenuComponent } from "../valida-menu/valida-menu.component";
import { ItemMenu } from '../../interfaces/itemMenu';

@Component({
  selector: 'app-menu-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ValidaMenuComponent],
  templateUrl: './menu-modal.component.html',
  styleUrl: './menu-modal.component.css'
})
export class MenuModalComponent implements OnInit, OnChanges, OnDestroy {
  @Input() menu: ItemMenu | null = null;
  @Input() menus: ItemMenu[] = [];
  @Output() salvar = new EventEmitter<any>();
  @Output() cancelar = new EventEmitter<void>();
  abrirModalEditar = false;
  formulario: FormGroup;
  private herancaSubscription: Subscription | null | undefined = null;

  constructor(private fb: FormBuilder, private _itensMenuService: ItensMenuService) {
    this.formulario = this.fb.group({
      titulo: ['', Validators.required],
      descricao: ['', Validators.required],
      heranca: [true],
      ordem: [0, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    this.abrirModalEditar = true;
    this.carregarMenus();
    this.configurarFormulario();
    this.ouvirMudancasHeranca();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['menu'] && changes['menu'].currentValue) {
      this.abrirModalEditar = true;
      this.configurarFormulario();
    }
  }

  ngOnDestroy(): void {
    if (this.herancaSubscription) {
      this.herancaSubscription.unsubscribe();
    }
  }

  private configurarFormulario(): void {
    const isPai = this.menu ? this.menu.menuPaiId === 0 : true;

    // Define os valores iniciais dos campos comuns
    this.formulario.patchValue({
      titulo: this.menu?.titulo || '',
      descricao: this.menu?.descricao || '',
      heranca: isPai,
      ordem: this.menu?.ordem || 0,
    });

    // Adiciona os campos condicionais iniciais
    if (isPai) {
      this.formulario.addControl('icone', this.fb.control(this.menu?.icone || '', Validators.required));
      this.formulario.removeControl('url');
      this.formulario.removeControl('itemPai');
    } else {
      this.formulario.addControl('url', this.fb.control(this.menu?.url || '', Validators.required));
      this.formulario.addControl('itemPai', this.fb.control(this.menu?.menuPaiId || '', [Validators.required, nonZeroValidator()]));
      this.formulario.removeControl('icone');
    }
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
        this.formulario.addControl('itemPai', this.fb.control('', [Validators.required,nonZeroValidator()]));
        this.formulario.removeControl('icone');
      }
    });
  }

  verificaPai(): boolean {
    return this.formulario.get('heranca')?.value ?? false;
  }

  fecharModal() {
    this.cancelar.emit();
    this.abrirModalEditar = false;
  }

  salvarFormulario(): void {
    if (this.formulario.valid) {
      // Obtém os valores do formulário
      const formValues = this.formulario.value;

      // Cria o objeto Menu mapeando os valores do formulário
      const menu: ItemMenu = {
        id: this.menu?.id, // Preserva o ID se o menu já existir (edição)
        titulo: formValues.titulo,
        descricao: formValues.descricao,
        ordem: formValues.ordem,
        icone: formValues.heranca ? formValues.icone : "-", // Inclui icone apenas se for Item Pai
        url: !formValues.heranca ? formValues.url : "-", // Inclui url apenas se for Item Filho
        menuPaiId: !formValues.heranca ? (formValues.itemPai ? +formValues.itemPai : 0) : 0, // Define menuPaiId (0 para Item Pai, ou o valor de itemPai para Item Filho)
      };

      // Emite o objeto mapeado
      this.salvar.emit(menu);
      this.abrirModalEditar = false;
    } else {
      this.formulario.markAllAsTouched();
    }
  }

  carregarMenus() {
    this._itensMenuService.obterMenus().subscribe((response) => {
      const menus = response.data;
      this.menus = menus.filter((m: ItemMenu) => m.menuPaiId === 0);
    });
  }

  obterControle(nome: string): FormControl {
    const control = this.formulario.get(nome);
    if (!control) {
      throw new Error('Controle de formulário não encotrado:' + nome)
    }
    return control as FormControl;
  }
}
