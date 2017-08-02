'use strict';

const HIDDEN = 'js-hidden';

export default class Component {
  constructor(options) {
    this._element = options.element;
  }

  show() {
    this._element.classList.remove(HIDDEN);
  }

  hide() {
    this._element.classList.add(HIDDEN);
  }
}
