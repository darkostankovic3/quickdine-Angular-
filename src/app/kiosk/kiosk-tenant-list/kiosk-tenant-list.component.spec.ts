import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KioskTenantListComponent } from './kiosk-tenant-list.component';

describe('KioskTenantListComponent', () => {
  let component: KioskTenantListComponent;
  let fixture: ComponentFixture<KioskTenantListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KioskTenantListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KioskTenantListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
