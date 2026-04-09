import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubHeaderSolid } from './sub-header-solid';

describe('SubHeaderSolid', () => {
  let component: SubHeaderSolid;
  let fixture: ComponentFixture<SubHeaderSolid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubHeaderSolid]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubHeaderSolid);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
