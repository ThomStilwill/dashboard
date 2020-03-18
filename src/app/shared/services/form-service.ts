import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class FormService {
  state$: Observable<any>;
  private stateSubject: Subject<any> = new Subject();

  constructor() {
    this.state$ = this.stateSubject.asObservable();
  }

  public setState(state) {
    this.stateSubject.next(state);
  }
}
