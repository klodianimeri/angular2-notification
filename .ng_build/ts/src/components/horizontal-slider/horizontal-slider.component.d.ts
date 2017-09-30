import { Renderer, ElementRef, AfterContentInit, QueryList, OnDestroy, OnInit } from '@angular/core';
import { HsSlideComponent } from './hs-slide/hs-slide.component';
import { SlidesContainerComponent } from "./slides-container/slides-container.component";
export declare class HsNavLeftComponent {
    private _renderer;
    _element: ElementRef;
    constructor(_renderer: Renderer, _element: ElementRef);
}
export declare class HsNavRightComponent {
    private _renderer;
    _element: ElementRef;
    constructor(_renderer: Renderer, _element: ElementRef);
}
export declare class HorizontalSliderComponent implements OnInit, OnDestroy, AfterContentInit {
    private _renderer;
    private _element;
    private _onResizeListenerHandler;
    private _slideWidth;
    HideNav: boolean;
    HsSlideComponents: QueryList<HsSlideComponent>;
    SlidesContainer: SlidesContainerComponent;
    constructor(_renderer: Renderer, _element: ElementRef);
    XsVisibleSlides: number;
    SmVisibleSlides: number;
    MdVisibleSlides: number;
    LgVisibleSlides: number;
    ngAfterViewInit(): void;
    ngAfterContentInit(): void;
    onNavigateLeft(): void;
    onNavigateRight(): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    readonly IsAtStart: boolean;
    readonly IsAtEnd: boolean;
    private CalulateEngine();
    private SetSizes(visibleSlides);
}
export declare const HORIZONTAL_SLIDER_DIRECTIVES: (typeof HsSlideComponent | typeof HsNavLeftComponent | typeof HsNavRightComponent | typeof HorizontalSliderComponent)[];
