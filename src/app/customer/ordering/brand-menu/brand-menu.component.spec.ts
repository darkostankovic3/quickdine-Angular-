import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandMenuComponent } from './brand-menu.component';

describe('BrandMenuComponent', () => {
  let component: BrandMenuComponent;
  let fixture: ComponentFixture<BrandMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
