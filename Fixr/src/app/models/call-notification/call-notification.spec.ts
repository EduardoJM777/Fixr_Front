import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallNotification } from './call-notification';

describe('CallNotification', () => {
  let component: CallNotification;
  let fixture: ComponentFixture<CallNotification>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CallNotification]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CallNotification);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
