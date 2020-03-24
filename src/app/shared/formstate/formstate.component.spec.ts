import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormstateComponent } from './formstate.component';

describe('FormstateComponent', () => {
  let component: FormstateComponent;
  let fixture: ComponentFixture<FormstateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormstateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormstateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
