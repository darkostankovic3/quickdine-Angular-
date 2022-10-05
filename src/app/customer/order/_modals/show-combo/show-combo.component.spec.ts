import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowComboComponent } from './show-combo.component';

describe('ShowComboComponent', () => {
  let component: ShowComboComponent;
  let fixture: ComponentFixture<ShowComboComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowComboComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowComboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
