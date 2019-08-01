import { TestBed } from '@angular/core/testing';

import { ExpressionService } from './expression.service';

fdescribe('ExpressionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExpressionService = TestBed.get(ExpressionService);
    expect(service).toBeTruthy();
  });

  fit('should return true from expression', () => {
    const service: ExpressionService = TestBed.get(ExpressionService);
    const expression = '((a.source = id)AND (target= id) AND ( NOT( color != blue) OR ( age<= 23 )))';
    const data = {
      id: 12345,
      a: { source: 12345 },
      target: 12345,
      color: '#FF0',
      blue: '#00F',
      age: 20
    };

    const tree = service.parse(expression);
    const actual = tree.compute(data);
    expect(actual).toBeTruthy();
  });
});
