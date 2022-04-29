import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoolittleComponent } from './doolittle.component';

describe('DoolittleComponent', () => {
  let component: DoolittleComponent;
  let fixture: ComponentFixture<DoolittleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoolittleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoolittleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
