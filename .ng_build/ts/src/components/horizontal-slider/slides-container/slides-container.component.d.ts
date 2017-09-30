import { Renderer, ElementRef, AfterContentInit } from '@angular/core';
export declare class SlidesContainerComponent implements AfterContentInit {
    private _renderer;
    _element: ElementRef;
    private _slideWidth;
    private _containerWidth;
    private _containerOffsetLeft;
    private VisibleSlides;
    constructor(_renderer: Renderer, _element: ElementRef);
    ngAfterContentInit(): void;
    SetVisibleSlides(visibleSlides: number): void;
    SetWidth(width: number): void;
    SetSlideWidth(slideWidth: number): void;
    SetLeft(left: number): void;
    onNavigateLeft(): void;
    onNavigateRight(): void;
    NavigateLeft(left: number): void;
    CheckEdges(): void;
    readonly IsAtStart: boolean;
    readonly IsAtEnd: boolean;
}
