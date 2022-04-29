import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CholeskyComponent } from './cholesky.component';

describe('CholeskyComponent', () => {
  let component: CholeskyComponent;
  let fixture: ComponentFixture<CholeskyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CholeskyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CholeskyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
