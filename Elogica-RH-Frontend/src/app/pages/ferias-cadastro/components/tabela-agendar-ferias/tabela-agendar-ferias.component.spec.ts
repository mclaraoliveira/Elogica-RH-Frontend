import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaAgendarFeriasComponent } from './tabela-agendar-ferias.component';

describe('TabelaAgendarFeriasComponent', () => {
  let component: TabelaAgendarFeriasComponent;
  let fixture: ComponentFixture<TabelaAgendarFeriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabelaAgendarFeriasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TabelaAgendarFeriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
