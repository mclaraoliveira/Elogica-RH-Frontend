import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItensDeMenuComponent } from './itens-de-menu.component';

describe('ItensDeMenuComponent', () => {
  let component: ItensDeMenuComponent;
  let fixture: ComponentFixture<ItensDeMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItensDeMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItensDeMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
