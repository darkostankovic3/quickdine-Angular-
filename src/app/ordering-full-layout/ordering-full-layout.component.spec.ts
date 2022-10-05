import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderingFullLayoutComponent } from './ordering-full-layout.component';

describe('OrderingFullLayoutComponent', () => {
  let component: OrderingFullLayoutComponent;
  let fixture: ComponentFixture<OrderingFullLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderingFullLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderingFullLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
