import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOnItemComponent } from './add-on-item.component';

describe('AddOnItemComponent', () => {
  let component: AddOnItemComponent;
  let fixture: ComponentFixture<AddOnItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOnItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOnItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
