import { BehaviorSubject, Subject } from 'rxjs';
import { scan, shareReplay, withLatestFrom, tap } from 'rxjs/operators';

export class NavigationService {
  actions$ = new Subject();
  totalSlides$ = new BehaviorSubject(0);

  state$ = this.actions$.pipe(
    withLatestFrom(this.totalSlides$),
    scan((state, [action, total]) => {
      if (total === 0) return state;
      
      let newIndex = state.currentIndex;
      switch(action) {
        case 'next':
          newIndex = (state.currentIndex + 1) % total;
          break;
        case 'prev':
          newIndex = (state.currentIndex - 1 + total) % total;
          break;
        case 'reset':
          newIndex = 0;
          break;
      }
      
      return { 
        ...state,
        currentIndex: newIndex, 
        totalSlides: total 
      };
    }, { currentIndex: 0, totalSlides: 0 }),
    shareReplay({ bufferSize: 1, refCount: true }) // Фикс для реактивности
  );

  setTotalSlides = (total) => this.totalSlides$.next(total);
  goPrev = () => this.actions$.next('prev');
  goNext = () => this.actions$.next('next');
  reset = () => {
    this.actions$.next('reset');
    this.totalSlides$.next(0);
  };
}

export const navigationService = new NavigationService();