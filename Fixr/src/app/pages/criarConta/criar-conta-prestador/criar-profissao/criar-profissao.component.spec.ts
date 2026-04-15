import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarProfissaoComponent } from './criar-profissao.component';

describe('CriarProfissaoComponent', () => {
  let component: CriarProfissaoComponent;
  let fixture: ComponentFixture<CriarProfissaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriarProfissaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriarProfissaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
