import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Right1Component } from './right1.component';

describe('Right1Component', () => {
  let component: Right1Component;
  let fixture: ComponentFixture<Right1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Right1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Right1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
