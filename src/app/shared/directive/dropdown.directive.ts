import { Directive, Renderer2, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  manageButtonCounter = 0;

  constructor(private render: Renderer2, private elementRef: ElementRef) { }

  @HostListener('click', ['$event.target']) onClick(eventData: any) {
    this.manageButtonCounter++;
    if (this.manageButtonCounter % 2 === 0) {
      this.render.removeClass(this.elementRef.nativeElement, 'show');
    } else {
      this.render.addClass(this.elementRef.nativeElement, 'show');
    }
  }

}
