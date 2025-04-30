import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginacaoSelecionarUsuarioComponent } from './paginacao-selecionar-usuario.component';

describe('PaginacaoSelecionarUsuarioComponent', () => {
  let component: PaginacaoSelecionarUsuarioComponent;
  let fixture: ComponentFixture<PaginacaoSelecionarUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginacaoSelecionarUsuarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaginacaoSelecionarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
