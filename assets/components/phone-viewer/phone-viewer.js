'use strict';

import compiledTemplate from './template.pug';

export default class PhoneViewer {
  constructor(options) {
    this._element = options.element;

    this.render(options.phoneDetails);
  }

  render(phoneDetails) {
    this._element.innerHTML = compiledTemplate({
      phone: phoneDetails
    });
  }

  show() {
    this._element.classList.remove('js-hidden');
  }
}
