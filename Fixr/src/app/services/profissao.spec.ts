import { TestBed } from '@angular/core/testing';

import { Profissao } from './profissao';

describe('Profissao', () => {
  let service: Profissao;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Profissao);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
