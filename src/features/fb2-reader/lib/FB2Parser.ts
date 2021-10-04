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
      const document = new window.DOMParser().parseFromString(
        xmlStr,
        'text/xml',
      );
      return this.convertToHTML(document);
    } else {
      return null;
    }
  }

  private async convertToHTML(xml: Document) {
    this.xml = xml;

    if (this.xsl) {
      return this.xsltTransform(xml, this.xsl);
    }

    return http
      .get('/reader.xsl')
      .then((res) =>
        this.xsltTransform(
          xml,
          new window.DOMParser().parseFromString(res.data, 'text/xml'),
        ),
      );
  }

  private xsltTransform(xml: Document, xsl: Document) {
    this.xsl = xsl;

    if (document.implementation) {
      const xsltProcessor = new XSLTProcessor();
      xsltProcessor.importStylesheet(xsl);
      return xsltProcessor.transformToFragment(xml, document);
    }

    return null;
  }
}
