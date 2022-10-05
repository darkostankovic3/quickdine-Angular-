import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OmisePayComponent } from './omise-pay.component';

describe('OmisePayComponent', () => {
  let component: OmisePayComponent;
  let fixture: ComponentFixture<OmisePayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OmisePayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OmisePayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
