import {
    Component,
    Input,
    Renderer,
    ElementRef,
    AfterViewInit,
    AfterContentInit,
    ViewChild,
    ContentChildren,
    QueryList,
    OnDestroy,
    OnInit
} from '@angular/core';

import {
    NgClass,
    NgIf
} from "@angular/common";

import { HsSlideComponent } from './hs-slide/hs-slide.component';
import { SlidesContainerComponent } from "./slides-container/slides-container.component";

@Component({
    selector: 'hs-nav-left',
    template: '<ng-content></ng-content>',
})
export class HsNavLeftComponent {
    constructor(private _renderer: Renderer, public _element: ElementRef) { }
};

@Component({
    selector: 'hs-nav-right',
    template: '<ng-content></ng-content>',
})
export class HsNavRightComponent {
    constructor(private _renderer: Renderer, public _element: ElementRef) { }
};

@Component({
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
})
export class HorizontalSliderComponent implements OnInit, OnDestroy, AfterContentInit {
    private _onResizeListenerHandler: any;
    private _slideWidth: number;

    @Input("hide-nav") HideNav: boolean;
    @ContentChildren(HsSlideComponent) HsSlideComponents: QueryList<HsSlideComponent>;
    @ViewChild(SlidesContainerComponent) SlidesContainer: SlidesContainerComponent;

    constructor(private _renderer: Renderer, private _element: ElementRef) {
        this.HideNav = false;

        this.XsVisibleSlides = 1;
        this.SmVisibleSlides = 2;
        this.MdVisibleSlides = 3;
        this.LgVisibleSlides = 4;
    }

    @Input("xs-visible-slides") XsVisibleSlides: number;

    @Input("sm-visible-slides") SmVisibleSlides: number;

    @Input("md-visible-slides") MdVisibleSlides: number;

    @Input("lg-visible-slides") LgVisibleSlides: number;


    ngAfterViewInit() {
        if (!this.HideNav) {
            this._renderer.setElementClass(this._element.nativeElement, "hs-navigation", true);
        }

        this.CalulateEngine();
    }

    ngAfterContentInit() {
    }

    onNavigateLeft() {
        this.SlidesContainer.onNavigateLeft();
    }


    onNavigateRight() {
        this.SlidesContainer.onNavigateRight();
    }


    ngOnInit() {

        this._onResizeListenerHandler = window.addEventListener("resize", () => {
            this.CalulateEngine();
        })
    }

    ngOnDestroy() {
        window.removeEventListener("resize", this._onResizeListenerHandler);
    }

    get IsAtStart(): boolean {
        return this.SlidesContainer.IsAtStart;
    }

    get IsAtEnd(): boolean {
        return this.SlidesContainer.IsAtEnd;
    }

    private CalulateEngine() {
        let WindowWidth = window.innerWidth;

        if (WindowWidth > 0 && WindowWidth <= 600) {
            this.SetSizes(this.XsVisibleSlides);
        } else if (WindowWidth > 600 && WindowWidth < 960) {
            this.SetSizes(this.SmVisibleSlides);
        } else if (WindowWidth > 960 && WindowWidth < 1280) {
            this.SetSizes(this.MdVisibleSlides);
        } else if (WindowWidth > 1280) {
            this.SetSizes(this.LgVisibleSlides);
        }
    }

    private SetSizes(visibleSlides: number) {

        this._slideWidth = this._element.nativeElement.clientWidth / visibleSlides;

        this.SlidesContainer.SetSlideWidth(this._slideWidth);
        this.SlidesContainer.SetWidth(this._slideWidth * this.HsSlideComponents.length);

        this.HsSlideComponents.toArray().forEach(element => {
            element.SetWidth(this._slideWidth);
        });

        this.SlidesContainer.SetVisibleSlides(visibleSlides);

    }

}

export const HORIZONTAL_SLIDER_DIRECTIVES = [HorizontalSliderComponent, HsSlideComponent, HsNavLeftComponent, HsNavRightComponent];