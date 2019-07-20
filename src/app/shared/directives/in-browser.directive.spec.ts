import { BrowserModule } from '@angular/platform-browser';
import { TemplateRef, ViewContainerRef } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';

import { InBrowserDirective } from './in-browser.directive';

describe('InBrowserDirective', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserModule]
    });
  });

  it('should create an instance', inject(
    [TemplateRef, ViewContainerRef],
    (templateRef: TemplateRef<any>, viewContainerRef: ViewContainerRef) => {
      const directive = new InBrowserDirective(templateRef, viewContainerRef);
      expect(directive).toBeTruthy();
    }
  ));
});
