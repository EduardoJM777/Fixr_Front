import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubHeaderPrestador } from './sub-header-prestador';

describe('SubHeaderPrestador', () => {
  let component: SubHeaderPrestador;
  let fixture: ComponentFixture<SubHeaderPrestador>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubHeaderPrestador]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubHeaderPrestador);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
