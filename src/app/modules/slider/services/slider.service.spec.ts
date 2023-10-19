import { TestBed } from '@angular/core/testing';

import { SliderService } from './slider.service';
import { SliderItem } from '../interfaces/slider-item';

describe('SliderService', () => {
  let service: SliderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SliderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return slides', () => {
    const dummySlides: SliderItem[] = [
      {
        id: '1',
        image: 'https://picsum.photos/seed/picsum/200/300',
        url: 'https://picsum.photos/seed/picsum/200/300',
        priority: 1,
      },
      {
        id: '2',
        image: 'https://picsum.photos/seed/picsum/200/300',
        url: 'https://picsum.photos/seed/picsum/200/300',
        priority: 2,
      },
    ];

    service.getSlides().subscribe((slides) => {
      expect(slides.length).toBe(2);
      expect(slides).toEqual(dummySlides);
    });
  });
});
