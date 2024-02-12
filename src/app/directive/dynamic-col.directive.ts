import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[dynamic-col]'
})
export class DynamicColDirective {

  @Input('dynamic-col') value: string;

  constructor(private el: ElementRef, private _renderer: Renderer2) {}

  ngOnInit() {
    this._renderer.setProperty(this.el.nativeElement, 'col-' + this.value, '');
  }

}
