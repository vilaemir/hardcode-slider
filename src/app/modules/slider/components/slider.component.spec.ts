import { Observable } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderComponent } from './slider.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('CarouselComponent', () => {
  let component: SliderComponent;
  let fixture: ComponentFixture<SliderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SliderComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: '', component: SliderComponent },
        ]),
      ],
    });
    fixture = TestBed.createComponent(SliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check default params', () => {
    expect(component.id).toBe('');
    expect(component.displayTime).toBe(5000);
    expect(component.slidesToShow).toBe(1);
    expect(component.items).toBeInstanceOf(Observable);
    expect(component.currentItems).toEqual([]);
  });
});
