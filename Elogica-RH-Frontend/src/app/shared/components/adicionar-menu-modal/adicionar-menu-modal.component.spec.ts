import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarMenuModalComponent } from './adicionar-menu-modal.component';

describe('AdicionarMenuModalComponent', () => {
  let component: AdicionarMenuModalComponent;
  let fixture: ComponentFixture<AdicionarMenuModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdicionarMenuModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdicionarMenuModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
