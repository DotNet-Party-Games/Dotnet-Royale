import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Left1Component } from './left1.component';

describe('Left1Component', () => {
  let component: Left1Component;
  let fixture: ComponentFixture<Left1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Left1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Left1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
