import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GaussJordanComponent } from './gauss-jordan.component';

describe('GaussJordanComponent', () => {
  let component: GaussJordanComponent;
  let fixture: ComponentFixture<GaussJordanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GaussJordanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GaussJordanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
