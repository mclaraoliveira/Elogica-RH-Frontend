import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidaMenuComponent } from './valida-menu.component';

describe('ValidaMenuComponent', () => {
  let component: ValidaMenuComponent;
  let fixture: ComponentFixture<ValidaMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidaMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ValidaMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
