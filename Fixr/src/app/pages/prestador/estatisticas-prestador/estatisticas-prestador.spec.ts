import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstatisticasPrestador } from './estatisticas-prestador';

describe('EstatisticasPrestador', () => {
  let component: EstatisticasPrestador;
  let fixture: ComponentFixture<EstatisticasPrestador>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstatisticasPrestador]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstatisticasPrestador);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
