import {
    Component,
    Renderer,
    ElementRef
} from '@angular/core';

@Component({
    selector: 'hs-slide, [hs-slide]',
    template: `
      <ng-content></ng-content>
    `,
    styles: [`
      :host{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:stretch;-ms-flex-align:stretch;align-items:stretch;overflow:hidden}
    `],
})
export class HsSlideComponent {

    constructor(private _renderer: Renderer, private _element: ElementRef) { }

    SetWidth(width: number) {

        this._renderer.setElementStyle(this._element.nativeElement, "width", width.toString() + "px");
    }
}