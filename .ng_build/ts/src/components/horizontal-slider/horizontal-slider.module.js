import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HorizontalSliderComponent, HsNavLeftComponent, HsNavRightComponent } from './horizontal-slider.component';
import { HsSlideComponent } from './hs-slide/hs-slide.component';
import { SlidesContainerComponent } from './slides-container/slides-container.component';
export class HorizontalSliderModule {
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
function HorizontalSliderModule_tsickle_Closure_declarations() {
    /** @type {?} */
    HorizontalSliderModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    HorizontalSliderModule.ctorParameters;
}
//# sourceMappingURL=horizontal-slider.module.js.map