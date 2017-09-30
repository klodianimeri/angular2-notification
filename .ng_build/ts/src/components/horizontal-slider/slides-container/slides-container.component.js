import { Component, Renderer, ElementRef } from '@angular/core';
export class SlidesContainerComponent {
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
function SlidesContainerComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    SlidesContainerComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    SlidesContainerComponent.ctorParameters;
    /** @type {?} */
    SlidesContainerComponent.prototype._slideWidth;
    /** @type {?} */
    SlidesContainerComponent.prototype._containerWidth;
    /** @type {?} */
    SlidesContainerComponent.prototype._containerOffsetLeft;
    /** @type {?} */
    SlidesContainerComponent.prototype.VisibleSlides;
    /** @type {?} */
    SlidesContainerComponent.prototype._renderer;
    /** @type {?} */
    SlidesContainerComponent.prototype._element;
}
;
//# sourceMappingURL=slides-container.component.js.map