import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowUpsellComponent } from './show-upsell.component';

describe('ShowUpsellComponent', () => {
  let component: ShowUpsellComponent;
  let fixture: ComponentFixture<ShowUpsellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowUpsellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowUpsellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
