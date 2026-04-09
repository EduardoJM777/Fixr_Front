import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderFixrVazio } from './header-fixr-vazio';

describe('HeaderFixrVazio', () => {
  let component: HeaderFixrVazio;
  let fixture: ComponentFixture<HeaderFixrVazio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderFixrVazio]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderFixrVazio);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
