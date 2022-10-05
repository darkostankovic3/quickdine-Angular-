import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOnTypeComponent } from './add-on-type.component';

describe('AddOnTypeComponent', () => {
  let component: AddOnTypeComponent;
  let fixture: ComponentFixture<AddOnTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOnTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOnTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
