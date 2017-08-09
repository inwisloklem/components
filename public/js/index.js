/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var pug_has_own_property = Object.prototype.hasOwnProperty;

/**
 * Merge two attribute objects giving precedence
 * to values in object `b`. Classes are special-cased
 * allowing for arrays and merging/joining appropriately
 * resulting in a string.
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object} a
 * @api private
 */

exports.merge = pug_merge;
function pug_merge(a, b) {
  if (arguments.length === 1) {
    var attrs = a[0];
    for (var i = 1; i < a.length; i++) {
      attrs = pug_merge(attrs, a[i]);
    }
    return attrs;
  }

  for (var key in b) {
    if (key === 'class') {
      var valA = a[key] || [];
      a[key] = (Array.isArray(valA) ? valA : [valA]).concat(b[key] || []);
    } else if (key === 'style') {
      var valA = pug_style(a[key]);
      var valB = pug_style(b[key]);
      a[key] = valA + valB;
    } else {
      a[key] = b[key];
    }
  }

  return a;
};

/**
 * Process array, object, or string as a string of classes delimited by a space.
 *
 * If `val` is an array, all members of it and its subarrays are counted as
 * classes. If `escaping` is an array, then whether or not the item in `val` is
 * escaped depends on the corresponding item in `escaping`. If `escaping` is
 * not an array, no escaping is done.
 *
 * If `val` is an object, all the keys whose value is truthy are counted as
 * classes. No escaping is done.
 *
 * If `val` is a string, it is counted as a class. No escaping is done.
 *
 * @param {(Array.<string>|Object.<string, boolean>|string)} val
 * @param {?Array.<string>} escaping
 * @return {String}
 */
exports.classes = pug_classes;
function pug_classes_array(val, escaping) {
  var classString = '', className, padding = '', escapeEnabled = Array.isArray(escaping);
  for (var i = 0; i < val.length; i++) {
    className = pug_classes(val[i]);
    if (!className) continue;
    escapeEnabled && escaping[i] && (className = pug_escape(className));
    classString = classString + padding + className;
    padding = ' ';
  }
  return classString;
}
function pug_classes_object(val) {
  var classString = '', padding = '';
  for (var key in val) {
    if (key && val[key] && pug_has_own_property.call(val, key)) {
      classString = classString + padding + key;
      padding = ' ';
    }
  }
  return classString;
}
function pug_classes(val, escaping) {
  if (Array.isArray(val)) {
    return pug_classes_array(val, escaping);
  } else if (val && typeof val === 'object') {
    return pug_classes_object(val);
  } else {
    return val || '';
  }
}

/**
 * Convert object or string to a string of CSS styles delimited by a semicolon.
 *
 * @param {(Object.<string, string>|string)} val
 * @return {String}
 */

exports.style = pug_style;
function pug_style(val) {
  if (!val) return '';
  if (typeof val === 'object') {
    var out = '';
    for (var style in val) {
      /* istanbul ignore else */
      if (pug_has_own_property.call(val, style)) {
        out = out + style + ':' + val[style] + ';';
      }
    }
    return out;
  } else {
    val += '';
    if (val[val.length - 1] !== ';') 
      return val + ';';
    return val;
  }
};

/**
 * Render the given attribute.
 *
 * @param {String} key
 * @param {String} val
 * @param {Boolean} escaped
 * @param {Boolean} terse
 * @return {String}
 */
exports.attr = pug_attr;
function pug_attr(key, val, escaped, terse) {
  if (val === false || val == null || !val && (key === 'class' || key === 'style')) {
    return '';
  }
  if (val === true) {
    return ' ' + (terse ? key : key + '="' + key + '"');
  }
  if (typeof val.toJSON === 'function') {
    val = val.toJSON();
  }
  if (typeof val !== 'string') {
    val = JSON.stringify(val);
    if (!escaped && val.indexOf('"') !== -1) {
      return ' ' + key + '=\'' + val.replace(/'/g, '&#39;') + '\'';
    }
  }
  if (escaped) val = pug_escape(val);
  return ' ' + key + '="' + val + '"';
};

/**
 * Render the given attributes object.
 *
 * @param {Object} obj
 * @param {Object} terse whether to use HTML5 terse boolean attributes
 * @return {String}
 */
exports.attrs = pug_attrs;
function pug_attrs(obj, terse){
  var attrs = '';

  for (var key in obj) {
    if (pug_has_own_property.call(obj, key)) {
      var val = obj[key];

      if ('class' === key) {
        val = pug_classes(val);
        attrs = pug_attr(key, val, false, terse) + attrs;
        continue;
      }
      if ('style' === key) {
        val = pug_style(val);
      }
      attrs += pug_attr(key, val, false, terse);
    }
  }

  return attrs;
};

/**
 * Escape the given string of `html`.
 *
 * @param {String} html
 * @return {String}
 * @api private
 */

var pug_match_html = /["&<>]/;
exports.escape = pug_escape;
function pug_escape(_html){
  var html = '' + _html;
  var regexResult = pug_match_html.exec(html);
  if (!regexResult) return _html;

  var result = '';
  var i, lastIndex, escape;
  for (i = regexResult.index, lastIndex = 0; i < html.length; i++) {
    switch (html.charCodeAt(i)) {
      case 34: escape = '&quot;'; break;
      case 38: escape = '&amp;'; break;
      case 60: escape = '&lt;'; break;
      case 62: escape = '&gt;'; break;
      default: continue;
    }
    if (lastIndex !== i) result += html.substring(lastIndex, i);
    lastIndex = i + 1;
    result += escape;
  }
  if (lastIndex !== i) return result + html.substring(lastIndex, i);
  else return result;
};

/**
 * Re-throw the given `err` in context to the
 * the pug in `filename` at the given `lineno`.
 *
 * @param {Error} err
 * @param {String} filename
 * @param {String} lineno
 * @param {String} str original source
 * @api private
 */

exports.rethrow = pug_rethrow;
function pug_rethrow(err, filename, lineno, str){
  if (!(err instanceof Error)) throw err;
  if ((typeof window != 'undefined' || !filename) && !str) {
    err.message += ' on line ' + lineno;
    throw err;
  }
  try {
    str = str || __webpack_require__(4).readFileSync(filename, 'utf8')
  } catch (ex) {
    pug_rethrow(err, null, lineno)
  }
  var context = 3
    , lines = str.split('\n')
    , start = Math.max(lineno - context, 0)
    , end = Math.min(lines.length, lineno + context);

  // Error context
  var context = lines.slice(start, end).map(function(line, i){
    var curr = i + start + 1;
    return (curr == lineno ? '  > ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'Pug') + ':' + lineno
    + '\n' + context + '\n\n' + err.message;
  throw err;
};


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


const HIDDEN = 'js-hidden';

class Component {
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
/* harmony export (immutable) */ __webpack_exports__["a"] = Component;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_pug__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_pug___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__index_pug__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__css_style_css__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__css_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__css_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_phone_page_phone_page__ = __webpack_require__(6);







new __WEBPACK_IMPORTED_MODULE_2__components_phone_page_phone_page__["a" /* default */]({
  element: document.querySelector('[data-component="phone-page"]')
});


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003C!-- removed by extract-text-webpack-plugin--\u003E";;return pug_html;};
module.exports = template;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 5 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__component_component__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_http_service__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__phone_catalogue_phone_catalogue__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__phone_viewer_phone_viewer__ = __webpack_require__(9);







class PhonePage extends __WEBPACK_IMPORTED_MODULE_0__component_component__["a" /* default */] {
  constructor(options) {
    super(options);

    this._viewer = new __WEBPACK_IMPORTED_MODULE_3__phone_viewer_phone_viewer__["a" /* default */]({
      element: this._element.querySelector('[data-component="phone-viewer"]')
    });

    this._catalogue = new __WEBPACK_IMPORTED_MODULE_2__phone_catalogue_phone_catalogue__["a" /* default */]({
      element: this._element.querySelector('[data-component="phone-catalogue"]')
    });

    __WEBPACK_IMPORTED_MODULE_1__service_http_service__["a" /* default */].sendRequest('/data/phones.json')
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

    __WEBPACK_IMPORTED_MODULE_1__service_http_service__["a" /* default */].sendRequest(`/data/phones/${phoneId}.json`)
      .then(this._showPhone.bind(this));

    this._viewer.show();
    this._catalogue.hide();
  }

  _onPhoneViewerBack() {
    this._viewer.hide();
    this._catalogue.show();
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PhonePage;



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__component_component__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__template_pug__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__template_pug___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__template_pug__);





class PhoneCatalogue extends __WEBPACK_IMPORTED_MODULE_0__component_component__["a" /* default */] {
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
    this._element.innerHTML = __WEBPACK_IMPORTED_MODULE_1__template_pug___default()({
      phones: this._phones
    });
  }

  _onPhoneClick(e) {
    e.preventDefault();

    let phone = e.target.closest('[data-element="phone-item"]');
    this.trigger('phoneSelected', phone.dataset.phoneId);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PhoneCatalogue;



/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (phones) {pug_html = pug_html + "\u003Cul class=\"phones\"\u003E";
// iterate phones
;(function(){
  var $$obj = phones;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var phone = $$obj[pug_index0];
pug_html = pug_html + "\u003Cli" + (" class=\"thumbnail\""+" data-element=\"phone-item\""+pug.attr("data-phone-id", phone.id, true, true)) + "\u003E\u003Ca" + (" class=\"thumb\""+pug.attr("href", `#!/phones/${phone.id}`, true, true)) + "\u003E\u003Cimg" + (pug.attr("alt", phone.name, true, true)+pug.attr("src", phone.imageUrl, true, true)) + "\u003E\u003C\u002Fa\u003E\u003Ca" + (pug.attr("href", `#!/phones/${phone.id}`, true, true)) + "\u003E" + (pug.escape(null == (pug_interp = phone.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003Cp\u003E" + (pug.escape(null == (pug_interp = phone.snippet) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var phone = $$obj[pug_index0];
pug_html = pug_html + "\u003Cli" + (" class=\"thumbnail\""+" data-element=\"phone-item\""+pug.attr("data-phone-id", phone.id, true, true)) + "\u003E\u003Ca" + (" class=\"thumb\""+pug.attr("href", `#!/phones/${phone.id}`, true, true)) + "\u003E\u003Cimg" + (pug.attr("alt", phone.name, true, true)+pug.attr("src", phone.imageUrl, true, true)) + "\u003E\u003C\u002Fa\u003E\u003Ca" + (pug.attr("href", `#!/phones/${phone.id}`, true, true)) + "\u003E" + (pug.escape(null == (pug_interp = phone.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003Cp\u003E" + (pug.escape(null == (pug_interp = phone.snippet) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ful\u003E";}.call(this,"phones" in locals_for_with?locals_for_with.phones:typeof phones!=="undefined"?phones:undefined));;return pug_html;};
module.exports = template;

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__component_component__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__template_pug__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__template_pug___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__template_pug__);





class PhoneViewer extends __WEBPACK_IMPORTED_MODULE_0__component_component__["a" /* default */] {
  constructor(options) {
    super(options);
  }

  setPhone(phoneDetails) {
    this._render(phoneDetails);
  }

  _render(phoneDetails) {
    this._element.innerHTML = __WEBPACK_IMPORTED_MODULE_1__template_pug___default()({
      phone: phoneDetails
    });
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PhoneViewer;



/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (phone) {pug_html = pug_html + "\u003Cimg" + (" class=\"phone\""+pug.attr("src", phone.images[0], true, true)) + "\u003E\u003Ch1\u003E" + (pug.escape(null == (pug_interp = phone.name) ? "" : pug_interp)) + "\u003C\u002Fh1\u003E\u003Cp\u003E" + (pug.escape(null == (pug_interp = phone.description) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003Cul class=\"phone-thumbs\"\u003E";
// iterate phone.images
;(function(){
  var $$obj = phone.images;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var image = $$obj[pug_index0];
pug_html = pug_html + "\u003Cli\u003E\u003Cimg" + (pug.attr("src", image, true, true)) + "\u003E\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var image = $$obj[pug_index0];
pug_html = pug_html + "\u003Cli\u003E\u003Cimg" + (pug.attr("src", image, true, true)) + "\u003E\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ful\u003E\u003Cbutton class=\"btn\" type=\"submit\" data-element=\"back-button\"\u003EBack\u003C\u002Fbutton\u003E";}.call(this,"phone" in locals_for_with?locals_for_with.phone:typeof phone!=="undefined"?phone:undefined));;return pug_html;};
module.exports = template;

/***/ }),
/* 11 */,
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


class HTTPService {
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
/* harmony export (immutable) */ __webpack_exports__["a"] = HTTPService;



/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map