import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarContaPrestador } from './criar-conta-prestador';

describe('CriarContaPrestador', () => {
  let component: CriarContaPrestador;
  let fixture: ComponentFixture<CriarContaPrestador>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriarContaPrestador]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriarContaPrestador);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
