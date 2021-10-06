import axios from 'axios';

const TIMEOUT = 2 * 1000;

const http = axios.create({
  withCredentials: false,
  timeout: TIMEOUT,
  headers: {
    'Content-Type': 'text/plain',
  },
});

export class FB2Parser {
  xml?: Document;
  xsl?: Document;

  async getDocument(url: string) {
    const xmlStr = await this.getFile(url);
    return this.parseXML(xmlStr);
  }

  private async getFile(url: string) {
    return http.get<string>(url).then((res) => res.data);
  }

  private parseXML(xmlStr: string) {
    if (window.DOMParser) {
      try {
        this.xml = new window.DOMParser().parseFromString(xmlStr, 'text/xml');
        return this.convertToHTML(this.xml);
      } catch (err) {
        console.error(err);
      }
    }
  }

  private async convertToHTML(xml: Document) {
    if (this.xsl) {
      return this.xsltTransform(xml, this.xsl);
    }

    try {
      this.xsl = await http
        .get('/reader.xsl')
        .then((res) =>
          new window.DOMParser().parseFromString(res.data, 'text/xml'),
        );
      return this.xsltTransform(xml, this.xsl);
    } catch (err) {
      console.error(err);
    }
  }

  private xsltTransform(xml: Document, xsl: Document) {
    if (document.implementation) {
      const xsltProcessor = new XSLTProcessor();
      xsltProcessor.importStylesheet(xsl);
      return xsltProcessor.transformToFragment(xml, document);
    }
  }
}
