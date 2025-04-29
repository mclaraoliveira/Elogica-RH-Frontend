import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeriasCadastroComponent } from './ferias-cadastro.component';

describe('FeriasCadastroComponent', () => {
  let component: FeriasCadastroComponent;
  let fixture: ComponentFixture<FeriasCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeriasCadastroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeriasCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
