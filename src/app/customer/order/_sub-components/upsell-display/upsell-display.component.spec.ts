import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsellDisplayComponent } from './upsell-display.component';

describe('UpsellDisplayComponent', () => {
  let component: UpsellDisplayComponent;
  let fixture: ComponentFixture<UpsellDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpsellDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpsellDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
