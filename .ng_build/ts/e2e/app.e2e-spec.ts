import { Angular2HorizontalSliderPage } from './app.po';

describe('angular2-horizontal-slider App', () => {
  let page: Angular2HorizontalSliderPage;

  beforeEach(() => {
    page = new Angular2HorizontalSliderPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
