import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritosPrestador } from './favoritos-prestador';

describe('FavoritosPrestador', () => {
  let component: FavoritosPrestador;
  let fixture: ComponentFixture<FavoritosPrestador>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoritosPrestador]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoritosPrestador);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
