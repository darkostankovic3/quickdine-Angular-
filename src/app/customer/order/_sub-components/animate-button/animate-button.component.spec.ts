import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimateButtonComponent } from './animate-button.component';

describe('AnimateButtonComponent', () => {
  let component: AnimateButtonComponent;
  let fixture: ComponentFixture<AnimateButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimateButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimateButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
