'use strict';

export default class HTTPService {
  static sendRequest(url) {
    return fetch(url).then(response => {
      if (!response.ok) {
        console.error(`${response.status}: ${response.statusText}`);
        return;
      }

      return response.json();
    });
  }
}
