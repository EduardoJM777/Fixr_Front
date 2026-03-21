import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarContaClienteComponent } from './criar-conta-cliente.component';

describe('CriarContaClienteComponent', () => {
  let component: CriarContaClienteComponent;
  let fixture: ComponentFixture<CriarContaClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriarContaClienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriarContaClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
