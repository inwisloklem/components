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

  on(eventName, callback, dataElement = '') {
    this._element.addEventListener(eventName, e => {
      if (dataElement && e.target.dataset.element !== dataElement) return;

      callback(e);
    });
  }

  trigger(eventName, data = null) {
    this._element.dispatchEvent(new CustomEvent(eventName, {
      bubbles: false,
      detail: data
    }));
  }
}
