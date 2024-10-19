import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDynamicComponent]',
  standalone: true,
})
export class DynamicComponentDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
