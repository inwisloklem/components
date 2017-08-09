'use strict';

const HIDDEN = 'js-hidden';

export default class Component {
  constructor(options) {
    this._element = options.element;
  }

  _syncRequest(url) {
    let xhr = new XMLHttpRequest();

    // XMLHttpRequest.open(method, url, async)
    xhr.open('GET', url, false);
    xhr.send();

    if (xhr.status !== 200) {
      console.error(`${xhr.status}: ${xhr.statusText}`);
      return;
    }

    return JSON.parse(xhr.response);
  }

  _asyncRequest(url, successCallback) {
    let xhr = new XMLHttpRequest();

    // XMLHttpRequest.open(method, url, async)
    xhr.open('GET', url, true);
    xhr.send();

    xhr.addEventListener('error', () => {
      console.error(xhr.status);
    });

    xhr.addEventListener('load', () => {
      if (xhr.status !== 200) {
        console.error(`${xhr.status}: ${xhr.statusText}`);
        return;
      }

      successCallback(JSON.parse(xhr.response));
    });
  }

  _asyncPromise(url) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();

      // XMLHttpRequest.open(method, url, async)
      xhr.open('GET', url, true);
      xhr.send();

      xhr.addEventListener('error', () => {
        reject(`${xhr.status}: ${xhr.statusText}`);
      });

      xhr.addEventListener('load', () => {
        if (xhr.status !== 200) {
          reject(`${xhr.status}: ${xhr.statusText}`);
          return;
        }

        resolve(JSON.parse(xhr.response));
      });
    });
  }

  _asyncFetch(url) {
    return fetch(url).then(response => {
      if (!response.ok) {
        console.error(`${response.status}: ${response.statusText}`);
        return;
      }

      return response.json();
    });
  }

  show() {
    this._element.classList.remove(HIDDEN);
  }

  hide() {
    this._element.classList.add(HIDDEN);
  }

  on(eventName, callback, dataElement = '') {
    this._element.addEventListener(eventName, e => {
      if (dataElement && !e.target.closest(`[data-element="${dataElement}"]`)) return;

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
