import { FB2Parser } from './FB2Parser';

export interface FB2Params {
  container: HTMLElement;
  url: string;
}

export class FB2 {
  container: HTMLElement;
  url: string;
  parser: FB2Parser;
  loading = false;

  constructor(params: FB2Params) {
    const { container, url } = params;

    this.container = container;
    this.url = url;
    this.parser = new FB2Parser();

    this.prepare();
  }

  private async prepare() {
    const book = await this.parser.getDocument(this.url);

    if (book) {
      this.container.innerHTML = '';
      this.container.appendChild(book);
    }
  }
}
