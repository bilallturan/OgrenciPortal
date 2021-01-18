import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appSadecesayi]'
})
export class SadecesayiDirective {

  constructor() { }
  @HostListener('keypress', ['$event']) onkeypress(e: KeyboardEvent) {
    console.log(e.key);
    if (e.keyCode < 48 || e.keyCode > 58) {
      e.preventDefault();
    }
  }

}
