import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KioskTagDisplayComponent } from './kiosk-tag-display.component';

describe('KioskTagDisplayComponent', () => {
  let component: KioskTagDisplayComponent;
  let fixture: ComponentFixture<KioskTagDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KioskTagDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KioskTagDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
