import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnunciosPublicados } from './anuncios-publicados';

describe('AnunciosPublicados', () => {
  let component: AnunciosPublicados;
  let fixture: ComponentFixture<AnunciosPublicados>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnunciosPublicados]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnunciosPublicados);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
