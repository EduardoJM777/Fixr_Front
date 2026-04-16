import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatVazioComponent } from './chat-vazio.component';

describe('ChatVazioComponent', () => {
  let component: ChatVazioComponent;
  let fixture: ComponentFixture<ChatVazioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatVazioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatVazioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
