import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPerfilPrestador } from './editar-perfil-prestador';

describe('EditarPerfilPrestador', () => {
  let component: EditarPerfilPrestador;
  let fixture: ComponentFixture<EditarPerfilPrestador>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarPerfilPrestador]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarPerfilPrestador);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
