import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[test]',
  standalone: true,
})
export class TestDirective {
  elRef = inject(ElementRef);

  constructor() {
    console.log(this.elRef.nativeElement);
    this.elRef.nativeElement.style.border = '10px solid red';
  }
}
