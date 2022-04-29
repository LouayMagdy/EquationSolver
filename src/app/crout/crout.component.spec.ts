import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CroutComponent } from './crout.component';

describe('CroutComponent', () => {
  let component: CroutComponent;
  let fixture: ComponentFixture<CroutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CroutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CroutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
