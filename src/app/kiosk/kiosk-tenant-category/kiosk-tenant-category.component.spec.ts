import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KioskTenantCategoryComponent } from './kiosk-tenant-category.component';

describe('KioskTenantCategoryComponent', () => {
  let component: KioskTenantCategoryComponent;
  let fixture: ComponentFixture<KioskTenantCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KioskTenantCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KioskTenantCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
