'use strict';

import './index.pug';
import './css/style.css';

import PhonePage from './components/phone-page/phone-page';

new PhonePage({
  element: document.querySelector('[data-component="phone-page"]')
});
