'use strict';

import Component from '../component/component';
import compiledTemplate from './template.pug';

export default class PhoneCatalogue extends Component {
  constructor(options) {
    super(options);

    this._phones = [];
    this._render();

    this._onPhoneClick = this._onPhoneClick.bind(this);
    this._element.addEventListener('click', this._onPhoneClick);
  }

  setPhones(phones) {
    this._phones = phones;
    this._render();
  }

  _render() {
    this._element.innerHTML = compiledTemplate({
      phones: this._phones
    });
  }

  _onPhoneClick(e) {
    e.preventDefault();

    let phone = e.target.closest('[data-element="phone-item"]');
    this.trigger('phoneSelected', phone.dataset.phoneId);
  }
}
