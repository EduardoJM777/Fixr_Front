import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcordoNotificacao } from './acordo-notificacao';

describe('AcordoNotificacao', () => {
  let component: AcordoNotificacao;
  let fixture: ComponentFixture<AcordoNotificacao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcordoNotificacao]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcordoNotificacao);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
