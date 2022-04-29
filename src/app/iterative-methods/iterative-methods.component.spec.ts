import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IterativeMethodsComponent } from './iterative-methods.component';

describe('IterativeMethodsComponent', () => {
  let component: IterativeMethodsComponent;
  let fixture: ComponentFixture<IterativeMethodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IterativeMethodsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IterativeMethodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
