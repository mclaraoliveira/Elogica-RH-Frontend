import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionarioEditarComponent } from './funcionario-editar.component';

describe('FuncionarioEditarComponent', () => {
  let component: FuncionarioEditarComponent;
  let fixture: ComponentFixture<FuncionarioEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuncionarioEditarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FuncionarioEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
