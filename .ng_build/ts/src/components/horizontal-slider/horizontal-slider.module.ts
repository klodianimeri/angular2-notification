import { NgModule, ModuleWithProviders } from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';

import {
    HorizontalSliderComponent,
    HsNavLeftComponent,
    HsNavRightComponent
} from "./horizontal-slider.component";
import { HsSlideComponent } from "./hs-slide/hs-slide.component";
import { SlidesContainerComponent } from "./slides-container/slides-container.component";

@NgModule({
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
})
export class HorizontalSliderModule {
    static forRoot(): ModuleWithProviders {
        return { ngModule: HorizontalSliderModule, providers: [] };
    }
}