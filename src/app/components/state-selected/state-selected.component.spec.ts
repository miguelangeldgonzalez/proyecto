import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateSelectedComponent } from './state-selected.component';

describe('StateSelectedComponent', () => {
  let component: StateSelectedComponent;
  let fixture: ComponentFixture<StateSelectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StateSelectedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StateSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
