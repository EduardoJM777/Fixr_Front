import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuSenhaComponent } from './recu-senha.component';

describe('RecuSenhaComponent', () => {
  let component: RecuSenhaComponent;
  let fixture: ComponentFixture<RecuSenhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecuSenhaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecuSenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
