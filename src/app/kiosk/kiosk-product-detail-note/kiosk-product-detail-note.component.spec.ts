import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KioskProductDetailNoteComponent } from './kiosk-product-detail-note.component';

describe('KioskProductDetailNoteComponent', () => {
  let component: KioskProductDetailNoteComponent;
  let fixture: ComponentFixture<KioskProductDetailNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KioskProductDetailNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KioskProductDetailNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
