import { nextSlideGenerator } from './index';
import { SliderItem } from '../interfaces/slider-item';

describe('nextSlideGenerator', () => {
  it('should return null', () => {
    const generator = nextSlideGenerator([]);

    expect(generator.next().value).toBeNull();
  });

  it('should return one slide', () => {
    const items: SliderItem[] = [
      {
        id: '1',
        image: 'https://picsum.photos/seed/1/300/200',
        url: 'https://picsum.photos/seed/1/300/200',
        priority: 1,
      },
    ];

    const generator = nextSlideGenerator(items);

    const nextItem = generator.next();

    expect(nextItem.value).toEqual(items[0]);
    expect(nextItem.done).toBe(false);

    expect(nextItem.value).toEqual(items[0]);
    expect(nextItem.done).toBe(false);
  });

  it('should return two slides with the same priorities in the correct order', () => {
    const items: SliderItem[] = [
      {
        id: '1',
        image: 'https://picsum.photos/seed/1/300/200',
        url: 'https://picsum.photos/seed/1/300/200',
        priority: 1,
      },
      {
        id: '2',
        image: 'https://picsum.photos/seed/1/300/200',
        url: 'https://picsum.photos/seed/1/300/200',
        priority: 1,
      },
    ];

    const generator = nextSlideGenerator(items);

    expect(generator.next().value).toEqual(items[0]);
    expect(generator.next().value).toEqual(items[1]);
  });

  it('should return slides for integers priorities in the correct order', () => {
    const items: SliderItem[] = [
      {
        id: '1',
        image: 'https://picsum.photos/seed/1/300/200',
        url: 'https://picsum.photos/seed/1/300/200',
        priority: 1,
      },
      {
        id: '2',
        image: 'https://picsum.photos/seed/2/300/200',
        url: 'https://picsum.photos/seed/2/300/200',
        priority: 1,
      },
      {
        id: '3',
        image: 'https://picsum.photos/seed/3/300/200',
        url: 'https://picsum.photos/seed/3/300/200',
        priority: 2,
      },
    ];

    const generator = nextSlideGenerator(items);

    expect(generator.next().value).toEqual(items[2]);
    expect(generator.next().value).toEqual(items[0]);
    expect(generator.next().value).toEqual(items[2]);
    expect(generator.next().value).toEqual(items[1]);
  });

  it('should return slides for float priorities in the correct order', () => {
    const items: SliderItem[] = [
      {
        id: '1',
        image: 'https://picsum.photos/seed/1/300/200',
        url: 'https://picsum.photos/seed/1/300/200',
        priority: 1,
      },
      {
        id: '2',
        image: 'https://picsum.photos/seed/2/300/200',
        url: 'https://picsum.photos/seed/2/300/200',
        priority: 1.5,
      },
      {
        id: '3',
        image: 'https://picsum.photos/seed/3/300/200',
        url: 'https://picsum.photos/seed/3/300/200',
        priority: 2,
      },
    ];

    const generator = nextSlideGenerator(items);

    expect(generator.next().value).toEqual(items[2]);
    expect(generator.next().value).toEqual(items[1]);
    expect(generator.next().value).toEqual(items[2]);
    expect(generator.next().value).toEqual(items[0]);

    expect(generator.next().value).toEqual(items[2]);
    expect(generator.next().value).toEqual(items[1]);
    expect(generator.next().value).toEqual(items[2]);
    expect(generator.next().value).toEqual(items[1]);
    expect(generator.next().value).toEqual(items[0]);
  });
});
