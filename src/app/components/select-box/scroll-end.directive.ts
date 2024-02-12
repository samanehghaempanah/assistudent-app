import { Directive, EventEmitter, HostListener, Output } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { filter, switchMap, takeUntil, throttleTime } from 'rxjs/operators';
import { fromEvent, Subject } from 'rxjs';

@Directive({
  selector: '[appScrollEnd]'
})
export class ScrollEndDirective {
  private readonly BOTTOM_SCROLL_OFFSET = 25;
  @Output('appScrollEnd') reachedBottom = new EventEmitter<void>();
  unsubscribeAll = new Subject<boolean>();

  constructor(private matSelect: MatSelect) {

    this.matSelect.openedChange

      .pipe(filter(isOpened => !!isOpened), switchMap(isOpened =>
        fromEvent(this.matSelect.panel.nativeElement, 'scroll').pipe(throttleTime(50))
      ),
        //controles the thrasold of scroll event
        takeUntil(this.unsubscribeAll)
      )
      .subscribe((event: any) => {
        if (event.target.scrollTop >= event.target.scrollHeight - event.target.offsetHeight - this.BOTTOM_SCROLL_OFFSET) {
          this.reachedBottom.emit();
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(true);
    this.unsubscribeAll.complete();
  }
}
