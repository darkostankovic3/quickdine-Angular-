import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KioskCartComponent } from './kiosk-cart.component';

describe('KioskCartComponent', () => {
  let component: KioskCartComponent;
  let fixture: ComponentFixture<KioskCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KioskCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KioskCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
