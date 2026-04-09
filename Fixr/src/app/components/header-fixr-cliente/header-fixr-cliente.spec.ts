import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderFixrCliente } from './header-fixr-cliente';

describe('HeaderFixrCliente', () => {
  let component: HeaderFixrCliente;
  let fixture: ComponentFixture<HeaderFixrCliente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderFixrCliente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderFixrCliente);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
