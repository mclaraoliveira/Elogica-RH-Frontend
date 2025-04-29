import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecaoUsuarioComponent } from './secao-usuario.component';

describe('SecaoUsuarioComponent', () => {
  let component: SecaoUsuarioComponent;
  let fixture: ComponentFixture<SecaoUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecaoUsuarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SecaoUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
