import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KioskTenantNameComponent } from './kiosk-tenant-name.component';

describe('KioskTenantNameComponent', () => {
  let component: KioskTenantNameComponent;
  let fixture: ComponentFixture<KioskTenantNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KioskTenantNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KioskTenantNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
