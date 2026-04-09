import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuSenhaOk } from './recu-senha-ok';

describe('RecuSenhaOk', () => {
  let component: RecuSenhaOk;
  let fixture: ComponentFixture<RecuSenhaOk>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecuSenhaOk]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecuSenhaOk);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
