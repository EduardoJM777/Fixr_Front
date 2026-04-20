import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadrFixrPrestador } from './headr-fixr-prestador';

describe('HeadrFixrPrestador', () => {
  let component: HeadrFixrPrestador;
  let fixture: ComponentFixture<HeadrFixrPrestador>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeadrFixrPrestador]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeadrFixrPrestador);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
