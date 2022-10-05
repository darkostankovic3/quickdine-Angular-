import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuAddOnComponent } from './menu-add-on.component';

describe('MenuAddOnComponent', () => {
  let component: MenuAddOnComponent;
  let fixture: ComponentFixture<MenuAddOnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuAddOnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuAddOnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
