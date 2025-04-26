import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCabecalhoComponent } from './menu-cabecalho.component';

describe('MenuCabecalhoComponent', () => {
  let component: MenuCabecalhoComponent;
  let fixture: ComponentFixture<MenuCabecalhoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuCabecalhoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuCabecalhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
