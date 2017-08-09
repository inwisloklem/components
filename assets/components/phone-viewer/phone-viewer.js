'use strict';

import Component from '../component/component';
import compiledTemplate from './template.pug';

export default class PhoneViewer extends Component {
  constructor(options) {
    super(options);
  }

  setPhone(phoneDetails) {
    this._render(phoneDetails);
  }

  _render(phoneDetails) {
    this._element.innerHTML = compiledTemplate({
      phone: phoneDetails
    });
  }
}
