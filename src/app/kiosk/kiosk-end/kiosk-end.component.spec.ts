import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KioskEndComponent } from './kiosk-end.component';

describe('KioskEndComponent', () => {
  let component: KioskEndComponent;
  let fixture: ComponentFixture<KioskEndComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KioskEndComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KioskEndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
