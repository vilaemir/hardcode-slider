import { SliderItem } from '../interfaces/slider-item';

type SliderItemWithCount = SliderItem & { count: number };

/**
 * Генератор, который возвращает следующий элемент слайдера
 * @param items - массив элементов слайдера
 *
 * @returns следующий элемент слайдера
 */
export function* nextSlideGenerator(
  items: SliderItem[],
): Generator<SliderItem | null> {
  if (items.length === 0) {
    yield null;
  }

  // Сортируем элементы по убыванию приоритета и добавляем параметр count,
  // который равен приоритету и будет уменьшаться при каждом показе
  const sorted: SliderItemWithCount[] = [...items]
    .sort((a, b) => b.priority - a.priority)
    .map((item) => ({
      ...item,
      count: item.priority,
    }));

  let prevItem: SliderItem | null = null;

  while (true) {
    // Ищем максимальное количество показов среди всех элементов с приоритетом
    let maxCount = Math.max(
      ...sorted.filter((item) => item !== prevItem).map((item) => item.count),
    );

    // Если максимальное количество показов меньше 1, то увеличиваем количество показов у всех элементов с приоритетом
    if (maxCount < 1.0) {
      sorted.forEach((item) => (item.count += item.priority));

      // Ищем максимальное количество показов среди всех элементов с приоритетом после увеличения
      maxCount = Math.max(
        ...sorted.filter((item) => item !== prevItem).map((item) => item.count),
      );
    }

    // Ищем элемент с максимальным количеством показов среди всех элементов с приоритетом и не равным предыдущему элементу
    const item = sorted.find(
      (item) => item.count === maxCount && item !== prevItem,
    );

    // Если элемент найден, то возвращаем его
    if (item) {
      // Деструктурируем количество показов, чтобы не возвращать его вместе с элементом
      const { count, ...rest } = item;

      yield rest;

      // Уменьшаем количество показов у текущего элемента
      item.count -= 1;

      // Если в начальном массиве больше одного элемента,
      // то не запоминаем текущий элемент, он должен показываться снова
      if (items.length > 1) {
        // Запоминаем текущий элемент для следующей итерации,
        // чтобы не показывать его два раза подряд
        prevItem = item;
      }
    }
  }
}
