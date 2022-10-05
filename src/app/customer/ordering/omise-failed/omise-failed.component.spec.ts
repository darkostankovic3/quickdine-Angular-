import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OmiseFailedComponent } from './omise-failed.component';

describe('OmiseFailedComponent', () => {
  let component: OmiseFailedComponent;
  let fixture: ComponentFixture<OmiseFailedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OmiseFailedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OmiseFailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
