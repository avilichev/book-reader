import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import { PDFDocumentProxy, PDFPageProxy } from 'pdfjs-dist/types/display/api';
import { PageViewport } from 'pdfjs-dist/types/display/display_utils';

export interface PDFParams {
  canvas: HTMLCanvasElement;
  onError?: (err?: any) => void;
  url: string;
}

const WORKER_SRC =
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.worker.js';

// the default params
const DEFAULT_SCALE = 1;

export class PDFDocument {
  private canvas: HTMLCanvasElement;
  private url: string;
  private onError: PDFParams['onError'];
  private document?: PDFDocumentProxy;
  private templeView?: PageViewport;
  private viewport?: PageViewport;
  private page?: PDFPageProxy;
  private currentPage = 1;
  private isRendering = false;

  constructor(params: PDFParams) {
    const { canvas, onError, url } = params;
    this.canvas = canvas;
    this.onError = onError;
    this.url = url;

    this.resize = this.resize.bind(this);
    this.init();
  }

  prev() {
    this.setPage(this.currentPage - 1);
  }

  next() {
    this.setPage(this.currentPage + 1);
  }

  setPage(newPage: number) {
    if (this.document && newPage >= 1 && newPage <= this.document.numPages) {
      this.currentPage = newPage;
      this.renderPage();
    }
  }

  destroy() {
    window.removeEventListener('resize', this.resize);
  }

  private async init() {
    try {
      GlobalWorkerOptions.workerSrc = WORKER_SRC;
      this.document = await getDocument(this.url).promise;
      this.renderPage();
      window.addEventListener('resize', this.resize);
    } catch (err) {
      if (this.onError) {
        this.onError(err);
      }
    }
  }

  private async renderPage() {
    if (this.document) {
      this.page = await this.document.getPage(this.currentPage);
      this.templeView = this.page.getViewport({
        scale: DEFAULT_SCALE,
      });
      this.resize();
    }
  }

  private render() {
    if (!this.isRendering && this.page && this.viewport) {
      const canvasContext = this.canvas.getContext(
        '2d',
      ) as CanvasRenderingContext2D;
      this.isRendering = true;
      this.page
        .render({ canvasContext, viewport: this.viewport })
        .promise.finally(() => {
          this.isRendering = false;
        });
    }
  }

  private async resize() {
    if (this.page && this.templeView) {
      const container = this.canvas.parentElement;

      const scale = Math.min(
        (container?.clientHeight || window.innerHeight) /
          this.templeView.height,
        (container?.clientWidth || window.innerWidth) / this.templeView.width,
      );

      this.viewport = this.page.getViewport({ scale });
      this.canvas.height = this.viewport.height;
      this.canvas.width = this.viewport.width;

      this.render();
    }
  }
}
