import { Pipe, PipeTransform, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


// Matches http:// and https:// urls, including query strings ie. ?variable=something
const URL_PATTERN = /(\bhttps?:\/\/[^\s<>"']+)/gi;

// Punctuation that ends the sentence rather than the url ie. "See https://google.com."
const TRAILING_PATTERN = /[.,:;!?)\]}]+$/;


@Pipe({
    name: 'linkify',
    standalone: true,
})
export class LinkifyPipe implements PipeTransform {

  private _sanitizer = inject(DomSanitizer);

  public transform(value: string): SafeHtml {
    if (!value) {
      return '';
    }

    const html = String(value)
      .split(URL_PATTERN)
      .map((part, index) => {
        // split() with a capture group puts the matched urls at the odd indexes
        if (index % 2 === 0) {
          return this._escape(part);
        }

        const trailing = part.match(TRAILING_PATTERN);
        const url = trailing ? part.slice(0, -trailing[0].length) : part;
        const escaped = this._escape(url);

        return `<a href="${escaped}" target="_blank" rel="noopener noreferrer">${escaped}</a>` +
          (trailing ? this._escape(trailing[0]) : '');
      })
      .join('');

    return this._sanitizer.bypassSecurityTrustHtml(html);
  }

  private _escape(value: string): string {
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
}
