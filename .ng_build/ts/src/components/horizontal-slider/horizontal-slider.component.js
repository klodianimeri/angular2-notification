import { Component, Input, Renderer, ElementRef, ViewChild, ContentChildren } from '@angular/core';
import { HsSlideComponent } from './hs-slide/hs-slide.component';
import { SlidesContainerComponent } from './slides-container/slides-container.component';
export class HsNavLeftComponent {
    /**
     * @param {?} _renderer
     * @param {?} _element
     */
    constructor(_renderer, _element) {
        this._renderer = _renderer;
        this._element = _element;
    }
}
HsNavLeftComponent.decorators = [
    { type: Component, args: [{
                selector: 'hs-nav-left',
                template: '<ng-content></ng-content>',
            },] },
];
/**
 * @nocollapse
 */
HsNavLeftComponent.ctorParameters = () => [
    { type: Renderer, },
    { type: ElementRef, },
];
function HsNavLeftComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    HsNavLeftComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    HsNavLeftComponent.ctorParameters;
    /** @type {?} */
    HsNavLeftComponent.prototype._renderer;
    /** @type {?} */
    HsNavLeftComponent.prototype._element;
}
;
export class HsNavRightComponent {
    /**
     * @param {?} _renderer
     * @param {?} _element
     */
    constructor(_renderer, _element) {
        this._renderer = _renderer;
        this._element = _element;
    }
}
HsNavRightComponent.decorators = [
    { type: Component, args: [{
                selector: 'hs-nav-right',
                template: '<ng-content></ng-content>',
            },] },
];
/**
 * @nocollapse
 */
HsNavRightComponent.ctorParameters = () => [
    { type: Renderer, },
    { type: ElementRef, },
];
function HsNavRightComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    HsNavRightComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    HsNavRightComponent.ctorParameters;
    /** @type {?} */
    HsNavRightComponent.prototype._renderer;
    /** @type {?} */
    HsNavRightComponent.prototype._element;
}
;
export class HorizontalSliderComponent {
    /**
     * @param {?} _renderer
     * @param {?} _element
     */
    constructor(_renderer, _element) {
        this._renderer = _renderer;
        this._element = _element;
        this.HideNav = false;
        this.XsVisibleSlides = 1;
        this.SmVisibleSlides = 2;
        this.MdVisibleSlides = 3;
        this.LgVisibleSlides = 4;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        if (!this.HideNav) {
            this._renderer.setElementClass(this._element.nativeElement, "hs-navigation", true);
        }
        this.CalulateEngine();
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
    }
    /**
     * @return {?}
     */
    onNavigateLeft() {
        this.SlidesContainer.onNavigateLeft();
    }
    /**
     * @return {?}
     */
    onNavigateRight() {
        this.SlidesContainer.onNavigateRight();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._onResizeListenerHandler = window.addEventListener("resize", () => {
            this.CalulateEngine();
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        window.removeEventListener("resize", this._onResizeListenerHandler);
    }
    /**
     * @return {?}
     */
    get IsAtStart() {
        return this.SlidesContainer.IsAtStart;
    }
    /**
     * @return {?}
     */
    get IsAtEnd() {
        return this.SlidesContainer.IsAtEnd;
    }
    /**
     * @return {?}
     */
    CalulateEngine() {
        let /** @type {?} */ WindowWidth = window.innerWidth;
        if (WindowWidth > 0 && WindowWidth <= 600) {
            this.SetSizes(this.XsVisibleSlides);
        }
        else if (WindowWidth > 600 && WindowWidth < 960) {
            this.SetSizes(this.SmVisibleSlides);
        }
        else if (WindowWidth > 960 && WindowWidth < 1280) {
            this.SetSizes(this.MdVisibleSlides);
        }
        else if (WindowWidth > 1280) {
            this.SetSizes(this.LgVisibleSlides);
        }
    }
    /**
     * @param {?} visibleSlides
     * @return {?}
     */
    SetSizes(visibleSlides) {
        this._slideWidth = this._element.nativeElement.clientWidth / visibleSlides;
        this.SlidesContainer.SetSlideWidth(this._slideWidth);
        this.SlidesContainer.SetWidth(this._slideWidth * this.HsSlideComponents.length);
        this.HsSlideComponents.toArray().forEach(element => {
            element.SetWidth(this._slideWidth);
        });
        this.SlidesContainer.SetVisibleSlides(visibleSlides);
    }
}
HorizontalSliderComponent.decorators = [
    { type: Component, args: [{
                selector: 'horizontal-slider, [horizontal-slider]',
                template: `
      <div class="horizontal-slider">
          <div class="horizontal-slider-wrapper">
              <slides-container>
                  <div class="slides">
                      <ng-content select="hs-slide"></ng-content>
                  </div>
              </slides-container>
          </div>

          <div class="nav nav-left" (click)="onNavigateLeft()" *ngIf="!HideNav" [class.disabled]="IsAtStart">
              <ng-content select="hs-nav-left"></ng-content>
          </div>
          <div class="nav nav-right" (click)="onNavigateRight()" *ngIf="!HideNav" [class.disabled]="IsAtEnd">
              <ng-content select="hs-nav-right"></ng-content>
          </div>
      </div>
    `,
                styles: [`
      :host{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;height:100%}:host.hs-navigation{margin-left:34px;margin-right:34px}:host .horizontal-slider{position:relative;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-flex:1;-ms-flex:1;flex:1}:host .horizontal-slider .horizontal-slider-wrapper{position:relative;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-flex:1;-ms-flex:1;flex:1;overflow:hidden}:host .horizontal-slider .nav{position:absolute;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);font-size:2.3rem;padding:7px;cursor:pointer;-webkit-transition:left .31s ease,right .31s ease;transition:left .31s ease,right .31s ease}:host .horizontal-slider .nav:active{color:rgba(0,0,0,.57)}:host .horizontal-slider .nav.disabled{color:rgba(0,0,0,.17)}:host .horizontal-slider .nav.disabled.nav-left:hover{left:-30px}:host .horizontal-slider .nav.disabled.nav-right:hover{right:-30px}:host .horizontal-slider .nav.nav-left{left:-30px}:host .horizontal-slider .nav.nav-left:hover{left:-34px}:host .horizontal-slider .nav.nav-right{right:-30px}:host .horizontal-slider .nav.nav-right:hover{right:-34px}
    `],
            },] },
];
/**
 * @nocollapse
 */
HorizontalSliderComponent.ctorParameters = () => [
    { type: Renderer, },
    { type: ElementRef, },
];
HorizontalSliderComponent.propDecorators = {
    'HideNav': [{ type: Input, args: ["hide-nav",] },],
    'HsSlideComponents': [{ type: ContentChildren, args: [HsSlideComponent,] },],
    'SlidesContainer': [{ type: ViewChild, args: [SlidesContainerComponent,] },],
    'XsVisibleSlides': [{ type: Input, args: ["xs-visible-slides",] },],
    'SmVisibleSlides': [{ type: Input, args: ["sm-visible-slides",] },],
    'MdVisibleSlides': [{ type: Input, args: ["md-visible-slides",] },],
    'LgVisibleSlides': [{ type: Input, args: ["lg-visible-slides",] },],
};
function HorizontalSliderComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    HorizontalSliderComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    HorizontalSliderComponent.ctorParameters;
    /** @type {?} */
    HorizontalSliderComponent.propDecorators;
    /** @type {?} */
    HorizontalSliderComponent.prototype._onResizeListenerHandler;
    /** @type {?} */
    HorizontalSliderComponent.prototype._slideWidth;
    /** @type {?} */
    HorizontalSliderComponent.prototype.HideNav;
    /** @type {?} */
    HorizontalSliderComponent.prototype.HsSlideComponents;
    /** @type {?} */
    HorizontalSliderComponent.prototype.SlidesContainer;
    /** @type {?} */
    HorizontalSliderComponent.prototype.XsVisibleSlides;
    /** @type {?} */
    HorizontalSliderComponent.prototype.SmVisibleSlides;
    /** @type {?} */
    HorizontalSliderComponent.prototype.MdVisibleSlides;
    /** @type {?} */
    HorizontalSliderComponent.prototype.LgVisibleSlides;
    /** @type {?} */
    HorizontalSliderComponent.prototype._renderer;
    /** @type {?} */
    HorizontalSliderComponent.prototype._element;
}
export const /** @type {?} */ HORIZONTAL_SLIDER_DIRECTIVES = [HorizontalSliderComponent, HsSlideComponent, HsNavLeftComponent, HsNavRightComponent];
//# sourceMappingURL=horizontal-slider.component.js.map