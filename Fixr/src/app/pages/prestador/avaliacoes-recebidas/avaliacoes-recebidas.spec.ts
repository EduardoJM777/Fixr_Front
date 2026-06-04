import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvaliacoesRecebidas } from './avaliacoes-recebidas';

describe('AvaliacoesRecebidas', () => {
  let component: AvaliacoesRecebidas;
  let fixture: ComponentFixture<AvaliacoesRecebidas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvaliacoesRecebidas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvaliacoesRecebidas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
