import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeriasSalvarComponent } from './ferias-salvar.component';

describe('FeriasSalvarComponent', () => {
  let component: FeriasSalvarComponent;
  let fixture: ComponentFixture<FeriasSalvarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeriasSalvarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeriasSalvarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
