import { Component, ContentChildren, ElementRef, Input, NgModule, Renderer, ViewChild } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

class HsSlideComponent {
    /**
     * @param {?} _renderer
     * @param {?} _element
     */
    constructor(_renderer, _element) {
        this._renderer = _renderer;
        this._element = _element;
    }
    /**
     * @param {?} width
     * @return {?}
     */
    SetWidth(width) {
        this._renderer.setElementStyle(this._element.nativeElement, "width", width.toString() + "px");
    }
}
HsSlideComponent.decorators = [
    { type: Component, args: [{
                selector: 'hs-slide, [hs-slide]',
                template: `
      <ng-content></ng-content>
    `,
                styles: [`
      :host{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:stretch;-ms-flex-align:stretch;align-items:stretch;overflow:hidden}
    `],
            },] },
];
/**
 * @nocollapse
 */
HsSlideComponent.ctorParameters = () => [
    { type: Renderer, },
    { type: ElementRef, },
];

class SlidesContainerComponent {
    /**
     * @param {?} _renderer
     * @param {?} _element
     */
    constructor(_renderer, _element) {
        this._renderer = _renderer;
        this._element = _element;
        this._containerOffsetLeft = 0;
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
    }
    /**
     * @param {?} visibleSlides
     * @return {?}
     */
    SetVisibleSlides(visibleSlides) {
        this.VisibleSlides = visibleSlides;
        this.CheckEdges();
    }
    /**
     * @param {?} width
     * @return {?}
     */
    SetWidth(width) {
        this._containerWidth = width;
        this._renderer.setElementStyle(this._element.nativeElement, "width", width.toString() + "px");
    }
    /**
     * @param {?} slideWidth
     * @return {?}
     */
    SetSlideWidth(slideWidth) {
        this._slideWidth = slideWidth;
    }
    /**
     * @param {?} left
     * @return {?}
     */
    SetLeft(left) {
        this._renderer.setElementStyle(this._element.nativeElement, "left", left.toString() + "px");
    }
    /**
     * @return {?}
     */
    onNavigateLeft() {
        let /** @type {?} */ SlideContainerLeft = this._element.nativeElement.offsetLeft;
        if (SlideContainerLeft >= 0) {
            this.NavigateLeft(0);
        }
        else if (SlideContainerLeft <= -(this._slideWidth * this.VisibleSlides)) {
            this.NavigateLeft(SlideContainerLeft + (this._slideWidth * this.VisibleSlides));
        }
        else if (SlideContainerLeft > (-(this._slideWidth * this.VisibleSlides)) && SlideContainerLeft < 0) {
            this.NavigateLeft(0);
        }
    }
    /**
     * @return {?}
     */
    onNavigateRight() {
        let /** @type {?} */ SlideContainerLeft = this._element.nativeElement.offsetLeft;
        if (SlideContainerLeft !== 0 && SlideContainerLeft <= -(this._containerWidth - (this._slideWidth * this.VisibleSlides))) {
            this.NavigateLeft(-(this._containerWidth - (this._slideWidth * this.VisibleSlides)));
        }
        else if (this._containerWidth + SlideContainerLeft >= 2 * (this._slideWidth * this.VisibleSlides)) {
            this.NavigateLeft(SlideContainerLeft + (-this._slideWidth * this.VisibleSlides));
        }
        else if (this._containerWidth + SlideContainerLeft >= (this._slideWidth * this.VisibleSlides)
            && this._containerWidth + SlideContainerLeft < 2 * (this._slideWidth * this.VisibleSlides)) {
            let /** @type {?} */ toleft = ((this._containerWidth - this._slideWidth * this.VisibleSlides) + SlideContainerLeft);
            this.NavigateLeft(SlideContainerLeft + (-toleft));
        }
    }
    /**
     * @param {?} left
     * @return {?}
     */
    NavigateLeft(left) {
        this._containerOffsetLeft = left;
        this.SetLeft(left);
    }
    /**
     * @return {?}
     */
    CheckEdges() {
        let /** @type {?} */ SlideContainerLeft = this._element.nativeElement.offsetLeft;
        if (SlideContainerLeft >= 0) {
            this.NavigateLeft(0);
            return;
        }
        if (SlideContainerLeft < -(this._containerWidth - (this._slideWidth * this.VisibleSlides))) {
            this.NavigateLeft(-(this._containerWidth - (this._slideWidth * this.VisibleSlides)));
            return;
        }
        //Prevent half sides of other slides from showing when window is resized
        if (SlideContainerLeft % (this._slideWidth * this.VisibleSlides) != 0) {
            let /** @type {?} */ remainder = SlideContainerLeft % this._slideWidth;
            if (Math.abs(remainder) >= (this._slideWidth / 2)) {
                this.NavigateLeft(SlideContainerLeft + -(this._slideWidth + remainder));
            }
            else {
                this.NavigateLeft(SlideContainerLeft + (-remainder));
            }
        }
    }
    /**
     * @return {?}
     */
    get IsAtStart() {
        return Math.abs(this._containerOffsetLeft) == 0;
    }
    /**
     * @return {?}
     */
    get IsAtEnd() {
        let /** @type {?} */ isLastSlide = Math.abs(Math.trunc(this._containerOffsetLeft)) == Math.trunc((this._containerWidth - (this._slideWidth * this.VisibleSlides)));
        let /** @type {?} */ smallContainer = this._containerWidth < (this._slideWidth * this.VisibleSlides);
        return isLastSlide || smallContainer;
    }
}
SlidesContainerComponent.decorators = [
    { type: Component, args: [{
                selector: 'slides-container',
                template: `
    <ng-content></ng-content>
  `,
                styles: [`
    :host{display:block;height:100%;position:relative;left:0;-webkit-transition:left .4s ease-out;transition:left .4s ease-out}:host /deep/.slides{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-flex:1;-ms-flex:1;flex:1;height:100%}
  `]
            },] },
];
/**
 * @nocollapse
 */
SlidesContainerComponent.ctorParameters = () => [
    { type: Renderer, },
    { type: ElementRef, },
];

class HsNavLeftComponent {
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

class HsNavRightComponent {
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

class HorizontalSliderComponent {
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

class HorizontalSliderModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return { ngModule: HorizontalSliderModule, providers: [] };
    }
}
HorizontalSliderModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    HorizontalSliderComponent,
                    SlidesContainerComponent,
                    HsNavLeftComponent,
                    HsNavRightComponent,
                    HsSlideComponent
                ],
                imports: [
                    BrowserModule
                ],
                exports: [
                    HorizontalSliderComponent,
                    HsSlideComponent,
                    HsNavLeftComponent,
                    HsNavRightComponent,
                ],
                providers: [],
            },] },
];
/**
 * @nocollapse
 */
HorizontalSliderModule.ctorParameters = () => [];

/**
 * Generated bundle index. Do not edit.
 */

export { HorizontalSliderModule, HorizontalSliderComponent as ɵc, HsNavLeftComponent as ɵa, HsNavRightComponent as ɵb, HsSlideComponent as ɵd, SlidesContainerComponent as ɵe };
//# sourceMappingURL=angular2-horizontal-slider.js.map
