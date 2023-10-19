import {
  Component,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  from,
  interval,
  mergeMap,
  Observable,
  Subscription,
  take,
  takeLast,
  toArray,
} from 'rxjs';

import { SliderItem } from '../interfaces/slider-item';
import { nextSlideGenerator } from '../utils';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
})
export class SliderComponent implements OnInit, OnDestroy {
  @Input() items: Observable<SliderItem[]> = new Observable();
  @Input() displayTime: number = 5000;

  @HostBinding('style.--slides-to-show')
  @Input()
  slidesToShow: number = 1;

  @Input({ required: true }) id: string = '';

  private subscriptions: Subscription[] = [];

  currentIndex: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  currentItems: (SliderItem | null)[] = [];

  ngOnInit(): void {
    const queryParamsSubscription = this.route.queryParams.subscribe(
      (params) => {
        const slideIndex = Number(params[this.id]);

        if (slideIndex && slideIndex !== this.currentIndex.getValue()) {
          this.currentIndex.next(slideIndex);

          queryParamsSubscription.unsubscribe();
        }
      },
    );

    const intervalSubscription = interval(this.displayTime).subscribe(() => {
      this.currentIndex.next(this.currentIndex.getValue() + 1);

      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          [this.id]: this.currentIndex.getValue(),
        },
        queryParamsHandling: 'merge',
      });
    });

    const nextSlideGeneratorSubscription = combineLatest([
      this.items,
      this.currentIndex,
    ])
      .pipe(
        mergeMap(([items, currentIndex]) =>
          from(nextSlideGenerator(items)).pipe(
            take(currentIndex + this.slidesToShow),
            takeLast(this.slidesToShow),
            toArray(),
          ),
        ),
      )
      .subscribe((currentItems) => {
        this.currentItems = currentItems;
      });

    this.subscriptions.push(
      queryParamsSubscription,
      intervalSubscription,
      nextSlideGeneratorSubscription,
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}
}
