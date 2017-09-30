(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/platform-browser')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/platform-browser'], factory) :
	(factory((global['angular2-horizontal-slider'] = {}),global.ng.core,global.ng.platformBrowser));
}(this, (function (exports,core,platformBrowser) { 'use strict';

var HsSlideComponent = /** @class */ (function () {
    /**
     * @param {?} _renderer
     * @param {?} _element
     */
    function HsSlideComponent(_renderer, _element) {
        this._renderer = _renderer;
        this._element = _element;
    }
    /**
     * @param {?} width
     * @return {?}
     */
    HsSlideComponent.prototype.SetWidth = function (width) {
        this._renderer.setElementStyle(this._element.nativeElement, "width", width.toString() + "px");
    };
    return HsSlideComponent;
}());
HsSlideComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'hs-slide, [hs-slide]',
                template: "\n      <ng-content></ng-content>\n    ",
                styles: ["\n      :host{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:stretch;-ms-flex-align:stretch;align-items:stretch;overflow:hidden}\n    "],
            },] },
];
/**
 * @nocollapse
 */
HsSlideComponent.ctorParameters = function () { return [
    { type: core.Renderer, },
    { type: core.ElementRef, },
]; };
var SlidesContainerComponent = /** @class */ (function () {
    /**
     * @param {?} _renderer
     * @param {?} _element
     */
    function SlidesContainerComponent(_renderer, _element) {
        this._renderer = _renderer;
        this._element = _element;
        this._containerOffsetLeft = 0;
    }
    /**
     * @return {?}
     */
    SlidesContainerComponent.prototype.ngAfterContentInit = function () {
    };
    /**
     * @param {?} visibleSlides
     * @return {?}
     */
    SlidesContainerComponent.prototype.SetVisibleSlides = function (visibleSlides) {
        this.VisibleSlides = visibleSlides;
        this.CheckEdges();
    };
    /**
     * @param {?} width
     * @return {?}
     */
    SlidesContainerComponent.prototype.SetWidth = function (width) {
        this._containerWidth = width;
        this._renderer.setElementStyle(this._element.nativeElement, "width", width.toString() + "px");
    };
    /**
     * @param {?} slideWidth
     * @return {?}
     */
    SlidesContainerComponent.prototype.SetSlideWidth = function (slideWidth) {
        this._slideWidth = slideWidth;
    };
    /**
     * @param {?} left
     * @return {?}
     */
    SlidesContainerComponent.prototype.SetLeft = function (left) {
        this._renderer.setElementStyle(this._element.nativeElement, "left", left.toString() + "px");
    };
    /**
     * @return {?}
     */
    SlidesContainerComponent.prototype.onNavigateLeft = function () {
        var /** @type {?} */ SlideContainerLeft = this._element.nativeElement.offsetLeft;
        if (SlideContainerLeft >= 0) {
            this.NavigateLeft(0);
        }
        else if (SlideContainerLeft <= -(this._slideWidth * this.VisibleSlides)) {
            this.NavigateLeft(SlideContainerLeft + (this._slideWidth * this.VisibleSlides));
        }
        else if (SlideContainerLeft > (-(this._slideWidth * this.VisibleSlides)) && SlideContainerLeft < 0) {
            this.NavigateLeft(0);
        }
    };
    /**
     * @return {?}
     */
    SlidesContainerComponent.prototype.onNavigateRight = function () {
        var /** @type {?} */ SlideContainerLeft = this._element.nativeElement.offsetLeft;
        if (SlideContainerLeft !== 0 && SlideContainerLeft <= -(this._containerWidth - (this._slideWidth * this.VisibleSlides))) {
            this.NavigateLeft(-(this._containerWidth - (this._slideWidth * this.VisibleSlides)));
        }
        else if (this._containerWidth + SlideContainerLeft >= 2 * (this._slideWidth * this.VisibleSlides)) {
            this.NavigateLeft(SlideContainerLeft + (-this._slideWidth * this.VisibleSlides));
        }
        else if (this._containerWidth + SlideContainerLeft >= (this._slideWidth * this.VisibleSlides)
            && this._containerWidth + SlideContainerLeft < 2 * (this._slideWidth * this.VisibleSlides)) {
            var /** @type {?} */ toleft = ((this._containerWidth - this._slideWidth * this.VisibleSlides) + SlideContainerLeft);
            this.NavigateLeft(SlideContainerLeft + (-toleft));
        }
    };
    /**
     * @param {?} left
     * @return {?}
     */
    SlidesContainerComponent.prototype.NavigateLeft = function (left) {
        this._containerOffsetLeft = left;
        this.SetLeft(left);
    };
    /**
     * @return {?}
     */
    SlidesContainerComponent.prototype.CheckEdges = function () {
        var /** @type {?} */ SlideContainerLeft = this._element.nativeElement.offsetLeft;
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
            var /** @type {?} */ remainder = SlideContainerLeft % this._slideWidth;
            if (Math.abs(remainder) >= (this._slideWidth / 2)) {
                this.NavigateLeft(SlideContainerLeft + -(this._slideWidth + remainder));
            }
            else {
                this.NavigateLeft(SlideContainerLeft + (-remainder));
            }
        }
    };
    Object.defineProperty(SlidesContainerComponent.prototype, "IsAtStart", {
        /**
         * @return {?}
         */
        get: function () {
            return Math.abs(this._containerOffsetLeft) == 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlidesContainerComponent.prototype, "IsAtEnd", {
        /**
         * @return {?}
         */
        get: function () {
            var /** @type {?} */ isLastSlide = Math.abs(Math.trunc(this._containerOffsetLeft)) == Math.trunc((this._containerWidth - (this._slideWidth * this.VisibleSlides)));
            var /** @type {?} */ smallContainer = this._containerWidth < (this._slideWidth * this.VisibleSlides);
            return isLastSlide || smallContainer;
        },
        enumerable: true,
        configurable: true
    });
    return SlidesContainerComponent;
}());
SlidesContainerComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'slides-container',
                template: "\n    <ng-content></ng-content>\n  ",
                styles: ["\n    :host{display:block;height:100%;position:relative;left:0;-webkit-transition:left .4s ease-out;transition:left .4s ease-out}:host /deep/.slides{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-flex:1;-ms-flex:1;flex:1;height:100%}\n  "]
            },] },
];
/**
 * @nocollapse
 */
SlidesContainerComponent.ctorParameters = function () { return [
    { type: core.Renderer, },
    { type: core.ElementRef, },
]; };
var HsNavLeftComponent = /** @class */ (function () {
    /**
     * @param {?} _renderer
     * @param {?} _element
     */
    function HsNavLeftComponent(_renderer, _element) {
        this._renderer = _renderer;
        this._element = _element;
    }
    return HsNavLeftComponent;
}());
HsNavLeftComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'hs-nav-left',
                template: '<ng-content></ng-content>',
            },] },
];
/**
 * @nocollapse
 */
HsNavLeftComponent.ctorParameters = function () { return [
    { type: core.Renderer, },
    { type: core.ElementRef, },
]; };
var HsNavRightComponent = /** @class */ (function () {
    /**
     * @param {?} _renderer
     * @param {?} _element
     */
    function HsNavRightComponent(_renderer, _element) {
        this._renderer = _renderer;
        this._element = _element;
    }
    return HsNavRightComponent;
}());
HsNavRightComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'hs-nav-right',
                template: '<ng-content></ng-content>',
            },] },
];
/**
 * @nocollapse
 */
HsNavRightComponent.ctorParameters = function () { return [
    { type: core.Renderer, },
    { type: core.ElementRef, },
]; };
var HorizontalSliderComponent = /** @class */ (function () {
    /**
     * @param {?} _renderer
     * @param {?} _element
     */
    function HorizontalSliderComponent(_renderer, _element) {
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
    HorizontalSliderComponent.prototype.ngAfterViewInit = function () {
        if (!this.HideNav) {
            this._renderer.setElementClass(this._element.nativeElement, "hs-navigation", true);
        }
        this.CalulateEngine();
    };
    /**
     * @return {?}
     */
    HorizontalSliderComponent.prototype.ngAfterContentInit = function () {
    };
    /**
     * @return {?}
     */
    HorizontalSliderComponent.prototype.onNavigateLeft = function () {
        this.SlidesContainer.onNavigateLeft();
    };
    /**
     * @return {?}
     */
    HorizontalSliderComponent.prototype.onNavigateRight = function () {
        this.SlidesContainer.onNavigateRight();
    };
    /**
     * @return {?}
     */
    HorizontalSliderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._onResizeListenerHandler = window.addEventListener("resize", function () {
            _this.CalulateEngine();
        });
    };
    /**
     * @return {?}
     */
    HorizontalSliderComponent.prototype.ngOnDestroy = function () {
        window.removeEventListener("resize", this._onResizeListenerHandler);
    };
    Object.defineProperty(HorizontalSliderComponent.prototype, "IsAtStart", {
        /**
         * @return {?}
         */
        get: function () {
            return this.SlidesContainer.IsAtStart;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HorizontalSliderComponent.prototype, "IsAtEnd", {
        /**
         * @return {?}
         */
        get: function () {
            return this.SlidesContainer.IsAtEnd;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    HorizontalSliderComponent.prototype.CalulateEngine = function () {
        var /** @type {?} */ WindowWidth = window.innerWidth;
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
    };
    /**
     * @param {?} visibleSlides
     * @return {?}
     */
    HorizontalSliderComponent.prototype.SetSizes = function (visibleSlides) {
        var _this = this;
        this._slideWidth = this._element.nativeElement.clientWidth / visibleSlides;
        this.SlidesContainer.SetSlideWidth(this._slideWidth);
        this.SlidesContainer.SetWidth(this._slideWidth * this.HsSlideComponents.length);
        this.HsSlideComponents.toArray().forEach(function (element) {
            element.SetWidth(_this._slideWidth);
        });
        this.SlidesContainer.SetVisibleSlides(visibleSlides);
    };
    return HorizontalSliderComponent;
}());
HorizontalSliderComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'horizontal-slider, [horizontal-slider]',
                template: "\n      <div class=\"horizontal-slider\">\n          <div class=\"horizontal-slider-wrapper\">\n              <slides-container>\n                  <div class=\"slides\">\n                      <ng-content select=\"hs-slide\"></ng-content>\n                  </div>\n              </slides-container>\n          </div>\n\n          <div class=\"nav nav-left\" (click)=\"onNavigateLeft()\" *ngIf=\"!HideNav\" [class.disabled]=\"IsAtStart\">\n              <ng-content select=\"hs-nav-left\"></ng-content>\n          </div>\n          <div class=\"nav nav-right\" (click)=\"onNavigateRight()\" *ngIf=\"!HideNav\" [class.disabled]=\"IsAtEnd\">\n              <ng-content select=\"hs-nav-right\"></ng-content>\n          </div>\n      </div>\n    ",
                styles: ["\n      :host{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;height:100%}:host.hs-navigation{margin-left:34px;margin-right:34px}:host .horizontal-slider{position:relative;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-flex:1;-ms-flex:1;flex:1}:host .horizontal-slider .horizontal-slider-wrapper{position:relative;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-flex:1;-ms-flex:1;flex:1;overflow:hidden}:host .horizontal-slider .nav{position:absolute;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);font-size:2.3rem;padding:7px;cursor:pointer;-webkit-transition:left .31s ease,right .31s ease;transition:left .31s ease,right .31s ease}:host .horizontal-slider .nav:active{color:rgba(0,0,0,.57)}:host .horizontal-slider .nav.disabled{color:rgba(0,0,0,.17)}:host .horizontal-slider .nav.disabled.nav-left:hover{left:-30px}:host .horizontal-slider .nav.disabled.nav-right:hover{right:-30px}:host .horizontal-slider .nav.nav-left{left:-30px}:host .horizontal-slider .nav.nav-left:hover{left:-34px}:host .horizontal-slider .nav.nav-right{right:-30px}:host .horizontal-slider .nav.nav-right:hover{right:-34px}\n    "],
            },] },
];
/**
 * @nocollapse
 */
HorizontalSliderComponent.ctorParameters = function () { return [
    { type: core.Renderer, },
    { type: core.ElementRef, },
]; };
HorizontalSliderComponent.propDecorators = {
    'HideNav': [{ type: core.Input, args: ["hide-nav",] },],
    'HsSlideComponents': [{ type: core.ContentChildren, args: [HsSlideComponent,] },],
    'SlidesContainer': [{ type: core.ViewChild, args: [SlidesContainerComponent,] },],
    'XsVisibleSlides': [{ type: core.Input, args: ["xs-visible-slides",] },],
    'SmVisibleSlides': [{ type: core.Input, args: ["sm-visible-slides",] },],
    'MdVisibleSlides': [{ type: core.Input, args: ["md-visible-slides",] },],
    'LgVisibleSlides': [{ type: core.Input, args: ["lg-visible-slides",] },],
};
var HorizontalSliderModule = /** @class */ (function () {
    function HorizontalSliderModule() {
    }
    /**
     * @return {?}
     */
    HorizontalSliderModule.forRoot = function () {
        return { ngModule: HorizontalSliderModule, providers: [] };
    };
    return HorizontalSliderModule;
}());
HorizontalSliderModule.decorators = [
    { type: core.NgModule, args: [{
                declarations: [
                    HorizontalSliderComponent,
                    SlidesContainerComponent,
                    HsNavLeftComponent,
                    HsNavRightComponent,
                    HsSlideComponent
                ],
                imports: [
                    platformBrowser.BrowserModule
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
HorizontalSliderModule.ctorParameters = function () { return []; };

exports.HorizontalSliderModule = HorizontalSliderModule;
exports.ɵc = HorizontalSliderComponent;
exports.ɵa = HsNavLeftComponent;
exports.ɵb = HsNavRightComponent;
exports.ɵd = HsSlideComponent;
exports.ɵe = SlidesContainerComponent;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=angular2-horizontal-slider.umd.js.map
