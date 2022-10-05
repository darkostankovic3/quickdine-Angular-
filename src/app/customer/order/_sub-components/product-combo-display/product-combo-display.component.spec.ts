import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComboDisplayComponent } from './product-combo-display.component';

describe('ProductComboDisplayComponent', () => {
  let component: ProductComboDisplayComponent;
  let fixture: ComponentFixture<ProductComboDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductComboDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComboDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
