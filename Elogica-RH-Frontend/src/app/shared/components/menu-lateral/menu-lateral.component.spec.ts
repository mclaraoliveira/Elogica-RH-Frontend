import { FuncionariosComponent } from './../../../pages/funcionarios/funcionarios.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('FuncionariosComponent', () => {
  let component: FuncionariosComponent;
  let fixture: ComponentFixture<FuncionariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuncionariosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuncionariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
