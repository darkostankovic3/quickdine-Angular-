import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderFullLayoutComponent } from './order-full-layout.component';

describe('OrderFullLayoutComponent', () => {
  let component: OrderFullLayoutComponent;
  let fixture: ComponentFixture<OrderFullLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderFullLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderFullLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
