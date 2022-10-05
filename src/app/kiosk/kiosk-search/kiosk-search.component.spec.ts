import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KioskSearchComponent } from './kiosk-search.component';

describe('KioskSearchComponent', () => {
  let component: KioskSearchComponent;
  let fixture: ComponentFixture<KioskSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KioskSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KioskSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
