import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuWizardComponent } from './menu-wizard.component';

describe('MenuWizardComponent', () => {
  let component: MenuWizardComponent;
  let fixture: ComponentFixture<MenuWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
