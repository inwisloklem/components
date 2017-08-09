'use strict';

import Component from '../component/component';
import HTTPService from '../service/http.service';
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

    HTTPService.sendRequest('/data/phones.json')
      .then(this._showPhones.bind(this));

    this._onPhoneSelected = this._onPhoneSelected.bind(this);
    this._catalogue.on('phoneSelected', this._onPhoneSelected);

    this._onPhoneViewerBack = this._onPhoneViewerBack.bind(this);
    this._viewer.on('click', this._onPhoneViewerBack, 'back-button');
  }

  _showPhones(phones) {
    this._catalogue.setPhones(phones);
  }

  _showPhone(phone) {
    this._viewer.setPhone(phone);
  }

  _onPhoneSelected(e) {
    let phoneId = e.detail;

    HTTPService.sendRequest(`/data/phones/${phoneId}.json`)
      .then(this._showPhone.bind(this));

    this._viewer.show();
    this._catalogue.hide();
  }

  _onPhoneViewerBack() {
    this._viewer.hide();
    this._catalogue.show();
  }
}
