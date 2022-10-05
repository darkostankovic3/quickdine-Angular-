import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenusTypeSecondComponent } from './menus-type-second.component';

describe('MenusTypeSecondComponent', () => {
  let component: MenusTypeSecondComponent;
  let fixture: ComponentFixture<MenusTypeSecondComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenusTypeSecondComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenusTypeSecondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
