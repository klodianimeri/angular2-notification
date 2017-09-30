import { Component, Renderer, ElementRef } from '@angular/core';
export class HsSlideComponent {
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
function HsSlideComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    HsSlideComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    HsSlideComponent.ctorParameters;
    /** @type {?} */
    HsSlideComponent.prototype._renderer;
    /** @type {?} */
    HsSlideComponent.prototype._element;
}
//# sourceMappingURL=hs-slide.component.js.map