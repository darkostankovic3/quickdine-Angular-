import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KioskCategoryOutsideComponent } from './kiosk-category-outside.component';

describe('KioskCategoryOutsideComponent', () => {
  let component: KioskCategoryOutsideComponent;
  let fixture: ComponentFixture<KioskCategoryOutsideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KioskCategoryOutsideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KioskCategoryOutsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
