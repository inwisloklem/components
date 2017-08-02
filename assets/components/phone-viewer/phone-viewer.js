'use strict';

import Component from '../component/component';
import compiledTemplate from './template.pug';

export default class PhoneViewer extends Component {
  constructor(options) {
    super(options);

    this.render(options.phoneDetails);
  }

  render(phoneDetails) {
    this._element.innerHTML = compiledTemplate({
      phone: phoneDetails
    });
  }
}
