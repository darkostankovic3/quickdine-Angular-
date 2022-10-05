import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClearOrderComponent } from './clear-order.component';

describe('ClearOrderComponent', () => {
  let component: ClearOrderComponent;
  let fixture: ComponentFixture<ClearOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClearOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClearOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
