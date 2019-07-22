import { Directive, Input, TemplateRef, AfterViewChecked, HostListener, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[gdgAspectRatio]'
})
export class AspectRatioDirective implements AfterViewChecked {
  @Input() gdgAspectRatio = 1;

  constructor(private _templateRef: TemplateRef<any>, private _viewContainer: ViewContainerRef) {
    this._viewContainer.createEmbeddedView(this._templateRef);
  }

  ngAfterViewChecked() {
    this.resize();
  }

  @HostListener('window:resize')
  public resize(): void {
    const element: HTMLElement = this._templateRef.elementRef.nativeElement.nextElementSibling;
    if (!element) { return; }
    const width = element.offsetWidth;
    if (!width) { return; }
    element.setAttribute('height', String(width * this.gdgAspectRatio));
  }
}
