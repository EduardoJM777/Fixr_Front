import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FecharAcordo } from './fechar-acordo';

describe('FecharAcordo', () => {
  let component: FecharAcordo;
  let fixture: ComponentFixture<FecharAcordo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FecharAcordo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FecharAcordo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
