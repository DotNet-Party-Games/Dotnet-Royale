import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlackjacksrComponent } from './blackjacksr.component';

describe('BlackjacksrComponent', () => {
  let component: BlackjacksrComponent;
  let fixture: ComponentFixture<BlackjacksrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlackjacksrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlackjacksrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
