import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstatisticasAnuncio } from './estatisticas-anuncio';

describe('EstatisticasAnuncio', () => {
  let component: EstatisticasAnuncio;
  let fixture: ComponentFixture<EstatisticasAnuncio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstatisticasAnuncio]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstatisticasAnuncio);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
