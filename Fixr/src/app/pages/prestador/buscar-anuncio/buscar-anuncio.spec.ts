import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarAnuncio } from './buscar-anuncio';

describe('BuscarAnuncio', () => {
  let component: BuscarAnuncio;
  let fixture: ComponentFixture<BuscarAnuncio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscarAnuncio]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscarAnuncio);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
