'use strict';

import compiledTemplate from './template.pug';

export default class PhoneCatalogue {
  constructor(options) {
    this._element = options.element;
    this._phones = options.phones;

    this._render();

    this._element.addEventListener('click', this._onPhoneClick);
  }

  _render() {
    this._element.innerHTML = compiledTemplate({
      phones: this._phones
    });
  }

  _onPhoneClick(e) {
    let selected = e.target.closest('[data-element="phone-item"]');

    alert(selected.dataset.phoneId);
  }
}
