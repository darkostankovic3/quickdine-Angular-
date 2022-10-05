import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KioskDealsComponent } from './kiosk-deals.component';

describe('KioskDealsComponent', () => {
  let component: KioskDealsComponent;
  let fixture: ComponentFixture<KioskDealsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KioskDealsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KioskDealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
