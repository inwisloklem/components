'use strict';

import compiledTemplate from './template.pug';

export default class PhoneCatalogue {
  constructor(options) {
    this._element = options.element;
    this._phones = options.phones;

    this._render();
  }

  _render() {
    this._element.innerHTML = compiledTemplate({
      phones: this._phones
    });
  }
}
