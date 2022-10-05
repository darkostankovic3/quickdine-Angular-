import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOnTypeItemComponent } from './add-on-type-item.component';

describe('AddOnTypeItemComponent', () => {
  let component: AddOnTypeItemComponent;
  let fixture: ComponentFixture<AddOnTypeItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOnTypeItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOnTypeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
