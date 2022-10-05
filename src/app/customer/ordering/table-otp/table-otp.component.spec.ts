import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableOtpComponent } from './table-otp.component';

describe('TableOtpComponent', () => {
  let component: TableOtpComponent;
  let fixture: ComponentFixture<TableOtpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableOtpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
