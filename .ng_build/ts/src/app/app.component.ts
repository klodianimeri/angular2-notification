import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <horizontal-slider lg-visible-slides="3">
      <hs-slide>
        slide 1
      </hs-slide>
      <hs-slide>
        slide 2
      </hs-slide>
      <hs-slide>
        slide 3
      </hs-slide>
      <hs-slide>
        slide 4
      </hs-slide>
      <hs-slide>
        slide 5
      </hs-slide>
      <hs-slide>
        slide 6
      </hs-slide>
      <hs-slide>
        slide 7
      </hs-slide>
      <hs-slide>
        slide 8
      </hs-slide>
      <hs-slide>
        9
      </hs-slide>
      <hs-slide>
        slide 10
      </hs-slide>
      <hs-nav-left>left</hs-nav-left>
      <hs-nav-right>right</hs-nav-right>
    </horizontal-slider>
  `,
  styles: [`
    :host {
        display: block;
        height: 100vh;
    }
  `]
})
export class AppComponent {
  title = 'app works!';
}
