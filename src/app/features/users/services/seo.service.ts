import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  constructor(
    private title: Title,
    private meta: Meta,
    private router: Router
  ) {}

  generteTags({ title = '', description = '', image = '' }) {
    this.title.setTitle(title);
    this.meta.addTags([
      { name: 'og:url', content: '' },
      { name: 'og:title', content: title },
      { name: 'og:description', content: description },
      { name: 'og: image', content: image },

      //twitter card

      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:site', content: '@fireship_dev' },
    ]);
  }
}
