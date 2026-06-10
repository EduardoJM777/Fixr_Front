import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvaliacoesRecebidasCliente } from './avaliacoes-recebidas-cliente';

describe('AvaliacoesRecebidasCliente', () => {
  let component: AvaliacoesRecebidasCliente;
  let fixture: ComponentFixture<AvaliacoesRecebidasCliente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvaliacoesRecebidasCliente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvaliacoesRecebidasCliente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
