import {
  Component,
  ViewEncapsulation,
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

@Component({
  selector: 'slides-container',
  template: `
    <ng-content></ng-content>
  `,
  styles: [`
    :host{display:block;height:100%;position:relative;left:0;-webkit-transition:left .4s ease-out;transition:left .4s ease-out}:host /deep/.slides{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-flex:1;-ms-flex:1;flex:1;height:100%}
  `]
})
export class SlidesContainerComponent implements AfterContentInit {
  private _slideWidth: number;
  private _containerWidth: number;
  private _containerOffsetLeft: number = 0;

  private VisibleSlides: number;

  constructor(private _renderer: Renderer, public _element: ElementRef) { }

  ngAfterContentInit() {
  }

  SetVisibleSlides(visibleSlides: number) {
    this.VisibleSlides = visibleSlides;
    this.CheckEdges();

  }

  SetWidth(width: number) {
    this._containerWidth = width;
    this._renderer.setElementStyle(this._element.nativeElement, "width", width.toString() + "px");

  }

  SetSlideWidth(slideWidth: number) {
    this._slideWidth = slideWidth;
  }

  SetLeft(left: number) {

    this._renderer.setElementStyle(this._element.nativeElement, "left", left.toString() + "px");

  }

  onNavigateLeft() {

    let SlideContainerLeft = this._element.nativeElement.offsetLeft;

    if (SlideContainerLeft >= 0) {
      this.NavigateLeft(0);
    } else if (SlideContainerLeft <= - (this._slideWidth * this.VisibleSlides)) {
      this.NavigateLeft(SlideContainerLeft + (this._slideWidth * this.VisibleSlides));
    }
    else if (SlideContainerLeft > (-(this._slideWidth * this.VisibleSlides)) && SlideContainerLeft < 0) {
      this.NavigateLeft(0);
    }

  }

  onNavigateRight() {

    let SlideContainerLeft = this._element.nativeElement.offsetLeft;

    if (SlideContainerLeft !== 0 && SlideContainerLeft <= -(this._containerWidth - (this._slideWidth * this.VisibleSlides))) {
      this.NavigateLeft(-(this._containerWidth - (this._slideWidth * this.VisibleSlides)));
    }
    else if (this._containerWidth + SlideContainerLeft >= 2 * (this._slideWidth * this.VisibleSlides)) {

      this.NavigateLeft(SlideContainerLeft + (-this._slideWidth * this.VisibleSlides));

    }
    else if (this._containerWidth + SlideContainerLeft >= (this._slideWidth * this.VisibleSlides)
      && this._containerWidth + SlideContainerLeft < 2 * (this._slideWidth * this.VisibleSlides)) {
      let toleft: number = ((this._containerWidth - this._slideWidth * this.VisibleSlides) + SlideContainerLeft);

      this.NavigateLeft(SlideContainerLeft + (-toleft));

    }
  }

  public NavigateLeft(left: number) {
    this._containerOffsetLeft = left;
    this.SetLeft(left);

  }

  CheckEdges() {

    let SlideContainerLeft = this._element.nativeElement.offsetLeft;

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
      let remainder = SlideContainerLeft % this._slideWidth;

      if (Math.abs(remainder) >= (this._slideWidth / 2)) {
        this.NavigateLeft(SlideContainerLeft + -(this._slideWidth + remainder));
      } else {
        this.NavigateLeft(SlideContainerLeft + (-remainder));
      }
    }
  }

  get IsAtStart(): boolean {
    return Math.abs(this._containerOffsetLeft) == 0;
  }

  get IsAtEnd(): boolean {
    let isLastSlide: boolean = Math.abs(Math.trunc(this._containerOffsetLeft)) == Math.trunc((this._containerWidth - (this._slideWidth * this.VisibleSlides)));
    let smallContainer: boolean = this._containerWidth < (this._slideWidth * this.VisibleSlides);

    return isLastSlide || smallContainer;
  }

};
