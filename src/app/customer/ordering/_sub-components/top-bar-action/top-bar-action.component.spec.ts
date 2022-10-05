import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopBarActionComponent } from './top-bar-action.component';

describe('TopBarActionComponent', () => {
  let component: TopBarActionComponent;
  let fixture: ComponentFixture<TopBarActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopBarActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopBarActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
