import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdicaoAnuncio } from './edicao-anuncio';

describe('EdicaoAnuncio', () => {
  let component: EdicaoAnuncio;
  let fixture: ComponentFixture<EdicaoAnuncio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EdicaoAnuncio]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EdicaoAnuncio);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
