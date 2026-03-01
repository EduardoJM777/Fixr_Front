import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderRec } from './header-rec';

describe('HeaderRec', () => {
  let component: HeaderRec;
  let fixture: ComponentFixture<HeaderRec>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderRec]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderRec);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
