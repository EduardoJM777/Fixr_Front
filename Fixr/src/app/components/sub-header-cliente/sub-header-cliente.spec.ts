import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubHeaderCliente } from './sub-header-cliente';

describe('SubHeaderCliente', () => {
  let component: SubHeaderCliente;
  let fixture: ComponentFixture<SubHeaderCliente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubHeaderCliente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubHeaderCliente);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
