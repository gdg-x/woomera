import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[gdgInBrowser]'
})
export class InBrowserDirective {
  constructor(private _templateRef: TemplateRef<any>, private _viewContainer: ViewContainerRef) {}

  @Input() set gdgInBrowser(not: boolean) {
    const isInBrowser = typeof window !== 'undefined';
    if ((not ? !isInBrowser : isInBrowser)) {
      this._viewContainer.createEmbeddedView(this._templateRef);
    } else {
      this._viewContainer.clear();
    }
  }
}
