import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KioskProductDetailsComponent } from './kiosk-product-details.component';

describe('KioskProductDetailsComponent', () => {
  let component: KioskProductDetailsComponent;
  let fixture: ComponentFixture<KioskProductDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KioskProductDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KioskProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
