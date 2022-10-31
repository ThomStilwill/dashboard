import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutsandboxComponent } from './layoutsandbox.component';

describe('LayoutsandboxComponent', () => {
  let component: LayoutsandboxComponent;
  let fixture: ComponentFixture<LayoutsandboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutsandboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutsandboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
