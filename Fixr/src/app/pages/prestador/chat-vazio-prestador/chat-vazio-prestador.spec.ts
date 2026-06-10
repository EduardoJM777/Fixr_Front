import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatVazioPrestador } from './chat-vazio-prestador';

describe('ChatVazioPrestador', () => {
  let component: ChatVazioPrestador;
  let fixture: ComponentFixture<ChatVazioPrestador>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatVazioPrestador]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatVazioPrestador);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
