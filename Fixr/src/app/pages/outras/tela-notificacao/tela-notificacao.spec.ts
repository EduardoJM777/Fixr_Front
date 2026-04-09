import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaNotificacao } from './tela-notificacao';

describe('TelaNotificacao', () => {
  let component: TelaNotificacao;
  let fixture: ComponentFixture<TelaNotificacao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelaNotificacao]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelaNotificacao);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
