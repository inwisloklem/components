'use strict';

import Component from '../component/component';
import PhoneCatalogue from '../phone-catalogue/phone-catalogue';
import PhoneViewer from '../phone-viewer/phone-viewer';

export default class PhonePage extends Component {
  constructor(options) {
    super(options);

    this._viewer = new PhoneViewer({
      element: this._element.querySelector('[data-component="phone-viewer"]')
    });

    this._catalogue = new PhoneCatalogue({
      element: this._element.querySelector('[data-component="phone-catalogue"]')
    });

    this._asyncRequest('/data/phones.json', this._showPhones.bind(this));

    this._onPhoneSelected = this._onPhoneSelected.bind(this);
    this._catalogue.on('phoneSelected', this._onPhoneSelected);

    this._onPhoneViewerBack = this._onPhoneViewerBack.bind(this);
    this._viewer.on('click', this._onPhoneViewerBack, 'back-button');
  }

  _showPhones(phones) {
    this._catalogue.setPhones(phones);
  }

  _onPhoneSelected(e) {
    let phoneId = e.detail;

    this._viewer.render(this._syncRequest(`/data/phones/${phoneId}.json`));

    this._viewer.show();
    this._catalogue.hide();
  }

  _onPhoneViewerBack() {
    this._viewer.hide();
    this._catalogue.show();
  }
}
