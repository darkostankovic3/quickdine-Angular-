import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { QueueListComponent } from './queue-list.component';

describe('QueueListComponent', () => {
  let component: QueueListComponent;
  let fixture: ComponentFixture<QueueListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QueueListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueueListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

export class DemoCarouselMultilistSingleOffsetComponent {
  itemsPerSlide = 5;
  singleSlideOffset = true;
  noWrap = true;

  slides = [
    { image: '../assets/img/food-img.jpg' },
    { image: 'assets/images/nature/2.jpg' },
    { image: 'assets/images/nature/3.jpg' },
    { image: 'assets/images/nature/4.jpg' },
    { image: 'assets/images/nature/5.jpg' },
    { image: 'assets/images/nature/6.jpg' },
    { image: 'assets/images/nature/7.jpg' },
    { image: 'assets/images/nature/8.jpg' },
    { image: 'assets/images/nature/1.jpg' },
    { image: 'assets/images/nature/2.jpg' }
  ];
}

