import { FB2Parser } from './FB2Parser';

export interface FB2Params {
  container: HTMLElement;
  url: string;
}

const FIRST_PAGE = 0;
const DEFAULT_GAP_WIDTH = 50;
const DEFAULT_GAPS = 2;
const DEFAULT_LIST_BY = 2;

export class FB2 {
  private book?: HTMLElement;
  private container: HTMLElement;
  private url: string;
  private parser: FB2Parser;
  private pageCount = FIRST_PAGE;
  private currentPage = FIRST_PAGE;
  private gapWidth = DEFAULT_GAP_WIDTH;
  private gaps = DEFAULT_GAPS;
  private listBy = DEFAULT_LIST_BY;
  private canvasWidth = 0;
  private pageWidth = 0;
  private pageStepWidth = 0;

  constructor(params: FB2Params) {
    const { container, url } = params;

    this.container = container;
    this.url = url;
    this.parser = new FB2Parser();

    this.handleResize = this.handleResize.bind(this);

    this.prepare();
  }

  prev() {
    if (!this.isFirstPage()) {
      this.currentPage -= this.listBy;
      this.updatePosition();
    }
  }

  next() {
    if (!this.isLastPage()) {
      this.currentPage += this.listBy;
      this.updatePosition();
    }
  }

  isFirstPage() {
    return this.currentPage <= FIRST_PAGE;
  }

  isLastPage() {
    return this.currentPage >= this.pageCount;
  }

  destroy() {
    window.removeEventListener('resize', this.handleResize);
  }

  private calcDimensions() {
    if (typeof this.book === 'undefined') {
      return;
    }

    const styles = window.getComputedStyle(this.book);
    const rect = this.container.getClientRects()[0];

    this.gapWidth = parseInt(styles.columnGap, 10);
    this.gaps = parseInt(styles.columnCount, 10);
    this.listBy = this.gapWidth <= 40 ? 1 : 2;

    this.canvasWidth = rect.width / this.listBy;

    this.pageWidth = this.canvasWidth - this.gapWidth / this.gaps;
    this.pageStepWidth = this.pageWidth;

    this.pageCount = this.getBookPages();
  }

  private getBookPages() {
    const width = this.book?.scrollWidth;
    return Math.floor(
      ((width || 0) + this.gapWidth) /
        (Math.floor(this.pageWidth) + this.gapWidth),
    );
  }

  private updatePosition() {
    if (this.isFirstPage()) {
      this.currentPage = FIRST_PAGE;
    }

    if (this.isLastPage()) {
      this.currentPage = this.pageCount;
    }

    this.container.scrollTo({
      left: this.pageStepWidth * this.currentPage,
    });
  }

  private handleResize() {
    const percent = (100 / this.pageCount) * this.currentPage;
    this.calcDimensions();

    const page = Math.floor(this.pageCount * (percent / 100));

    this.currentPage = page + (page % this.gaps);
    this.updatePosition();
  }

  private async prepare() {
    const book = await this.parser.getDocument(this.url);

    if (typeof book === 'undefined') {
      return;
    }

    this.container.innerHTML = '';
    this.container.appendChild(book);
    this.book = this.container.children[0] as HTMLElement;

    this.calcDimensions();

    window.addEventListener('resize', this.handleResize);
  }
}
