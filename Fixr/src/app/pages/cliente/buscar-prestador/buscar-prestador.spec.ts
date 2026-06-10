import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarPrestador } from './buscar-prestador';

describe('BuscarPrestador', () => {
  let component: BuscarPrestador;
  let fixture: ComponentFixture<BuscarPrestador>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscarPrestador]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscarPrestador);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
