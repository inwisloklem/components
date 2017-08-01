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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
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
    str = str || __webpack_require__(3).readFileSync(filename, 'utf8')
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
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_pug__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_pug___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__index_pug__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__css_style_css__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__css_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__css_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_phone_page_phone_page__ = __webpack_require__(5);







new __WEBPACK_IMPORTED_MODULE_2__components_phone_page_phone_page__["a" /* default */]({
  element: document.querySelector('[data-component="phone-page"]')
});


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003C!-- removed by extract-text-webpack-plugin--\u003E";;return pug_html;};
module.exports = template;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 4 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__phone_catalogue_phone_catalogue__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__phone_viewer_phone_viewer__ = __webpack_require__(8);





class PhonePage {
  constructor(options) {
    this._element = options.element;

    this._viewer = new __WEBPACK_IMPORTED_MODULE_1__phone_viewer_phone_viewer__["a" /* default */]({
      element: this._element.querySelector('[data-component="phone-viewer"]'),
      phoneDetails: phoneFromServer
    });

    this._catalogue = new __WEBPACK_IMPORTED_MODULE_0__phone_catalogue_phone_catalogue__["a" /* default */]({
      element: this._element.querySelector('[data-component="phone-catalogue"]'),
      phones: phonesFromServer
    });
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PhonePage;


const phonesFromServer = [
  {
    'age': 0,
    'id': 'motorola-xoom-with-wi-fi',
    'imageUrl': 'img/phones/motorola-xoom-with-wi-fi.0.jpg',
    'name': 'Motorola XOOM\u2122 with Wi-Fi',
    'snippet': 'The Next, Next Generation\r\n\r\nExperience the future with Motorola XOOM with Wi-Fi, the world\'s first tablet powered by Android 3.0 (Honeycomb).'
  },
  {
    'age': 1,
    'id': 'motorola-xoom',
    'imageUrl': 'img/phones/motorola-xoom.0.jpg',
    'name': 'MOTOROLA XOOM\u2122',
    'snippet': 'The Next, Next Generation\n\nExperience the future with MOTOROLA XOOM, the world\'s first tablet powered by Android 3.0 (Honeycomb).'
  },
  {
    'age': 2,
    'carrier': 'AT&T',
    'id': 'motorola-atrix-4g',
    'imageUrl': 'img/phones/motorola-atrix-4g.0.jpg',
    'name': 'MOTOROLA ATRIX\u2122 4G',
    'snippet': 'MOTOROLA ATRIX 4G the world\'s most powerful smartphone.'
  },
  {
    'age': 3,
    'id': 'dell-streak-7',
    'imageUrl': 'img/phones/dell-streak-7.0.jpg',
    'name': 'Dell Streak 7',
    'snippet': 'Introducing Dell\u2122 Streak 7. Share photos, videos and movies together. It\u2019s small enough to carry around, big enough to gather around.'
  },
  {
    'age': 4,
    'carrier': 'Cellular South',
    'id': 'samsung-gem',
    'imageUrl': 'img/phones/samsung-gem.0.jpg',
    'name': 'Samsung Gem\u2122',
    'snippet': 'The Samsung Gem\u2122 brings you everything that you would expect and more from a touch display smart phone \u2013 more apps, more features and a more affordable price.'
  },
  {
    'age': 5,
    'carrier': 'Dell',
    'id': 'dell-venue',
    'imageUrl': 'img/phones/dell-venue.0.jpg',
    'name': 'Dell Venue',
    'snippet': 'The Dell Venue; Your Personal Express Lane to Everything'
  },
  {
    'age': 6,
    'carrier': 'Best Buy',
    'id': 'nexus-s',
    'imageUrl': 'img/phones/nexus-s.0.jpg',
    'name': 'Nexus S',
    'snippet': 'Fast just got faster with Nexus S. A pure Google experience, Nexus S is the first phone to run Gingerbread (Android 2.3), the fastest version of Android yet.'
  },
  {
    'age': 7,
    'carrier': 'Cellular South',
    'id': 'lg-axis',
    'imageUrl': 'img/phones/lg-axis.0.jpg',
    'name': 'LG Axis',
    'snippet': 'Android Powered, Google Maps Navigation, 5 Customizable Home Screens'
  },
  {
    'age': 8,
    'id': 'samsung-galaxy-tab',
    'imageUrl': 'img/phones/samsung-galaxy-tab.0.jpg',
    'name': 'Samsung Galaxy Tab\u2122',
    'snippet': 'Feel Free to Tab\u2122. The Samsung Galaxy Tab\u2122 brings you an ultra-mobile entertainment experience through its 7\u201d display, high-power processor and Adobe\u00ae Flash\u00ae Player compatibility.'
  },
  {
    'age': 9,
    'carrier': 'Cellular South',
    'id': 'samsung-showcase-a-galaxy-s-phone',
    'imageUrl': 'img/phones/samsung-showcase-a-galaxy-s-phone.0.jpg',
    'name': 'Samsung Showcase\u2122 a Galaxy S\u2122 phone',
    'snippet': 'The Samsung Showcase\u2122 delivers a cinema quality experience like you\u2019ve never seen before. Its innovative 4\u201d touch display technology provides rich picture brilliance, even outdoors'
  },
  {
    'age': 10,
    'carrier': 'Verizon',
    'id': 'droid-2-global-by-motorola',
    'imageUrl': 'img/phones/droid-2-global-by-motorola.0.jpg',
    'name': 'DROID\u2122 2 Global by Motorola',
    'snippet': 'The first smartphone with a 1.2 GHz processor and global capabilities.'
  },
  {
    'age': 11,
    'carrier': 'Verizon',
    'id': 'droid-pro-by-motorola',
    'imageUrl': 'img/phones/droid-pro-by-motorola.0.jpg',
    'name': 'DROID\u2122 Pro by Motorola',
    'snippet': 'The next generation of DOES.'
  },
  {
    'age': 12,
    'carrier': 'AT&T',
    'id': 'motorola-bravo-with-motoblur',
    'imageUrl': 'img/phones/motorola-bravo-with-motoblur.0.jpg',
    'name': 'MOTOROLA BRAVO\u2122 with MOTOBLUR\u2122',
    'snippet': 'An experience to cheer about.'
  },
  {
    'age': 13,
    'carrier': 'T-Mobile',
    'id': 'motorola-defy-with-motoblur',
    'imageUrl': 'img/phones/motorola-defy-with-motoblur.0.jpg',
    'name': 'Motorola DEFY\u2122 with MOTOBLUR\u2122',
    'snippet': 'Are you ready for everything life throws your way?'
  },
  {
    'age': 14,
    'carrier': 'T-Mobile',
    'id': 't-mobile-mytouch-4g',
    'imageUrl': 'img/phones/t-mobile-mytouch-4g.0.jpg',
    'name': 'T-Mobile myTouch 4G',
    'snippet': 'The T-Mobile myTouch 4G is a premium smartphone designed to deliver blazing fast 4G speeds so that you can video chat from practically anywhere, with or without Wi-Fi.'
  },
  {
    'age': 15,
    'carrier': 'US Cellular',
    'id': 'samsung-mesmerize-a-galaxy-s-phone',
    'imageUrl': 'img/phones/samsung-mesmerize-a-galaxy-s-phone.0.jpg',
    'name': 'Samsung Mesmerize\u2122 a Galaxy S\u2122 phone',
    'snippet': 'The Samsung Mesmerize\u2122 delivers a cinema quality experience like you\u2019ve never seen before. Its innovative 4\u201d touch display technology provides rich picture brilliance,even outdoors'
  },
  {
    'age': 16,
    'carrier': 'Sprint',
    'id': 'sanyo-zio',
    'imageUrl': 'img/phones/sanyo-zio.0.jpg',
    'name': 'SANYO ZIO',
    'snippet': 'The Sanyo Zio by Kyocera is an Android smartphone with a combination of ultra-sleek styling, strong performance and unprecedented value.'
  },
  {
    'age': 17,
    'id': 'samsung-transform',
    'imageUrl': 'img/phones/samsung-transform.0.jpg',
    'name': 'Samsung Transform\u2122',
    'snippet': 'The Samsung Transform\u2122 brings you a fun way to customize your Android powered touch screen phone to just the way you like it through your favorite themed \u201cSprint ID Service Pack\u201d.'
  },
  {
    'age': 18,
    'id': 't-mobile-g2',
    'imageUrl': 'img/phones/t-mobile-g2.0.jpg',
    'name': 'T-Mobile G2',
    'snippet': 'The T-Mobile G2 with Google is the first smartphone built for 4G speeds on T-Mobile\'s new network. Get the information you need, faster than you ever thought possible.'
  },
  {
    'age': 19,
    'id': 'motorola-charm-with-motoblur',
    'imageUrl': 'img/phones/motorola-charm-with-motoblur.0.jpg',
    'name': 'Motorola CHARM\u2122 with MOTOBLUR\u2122',
    'snippet': 'Motorola CHARM fits easily in your pocket or palm.  Includes MOTOBLUR service.'
  }
];

const phoneFromServer = {
  'name': 'Dell Streak 7',
  'images': [
    'img/phones/dell-streak-7.0.jpg',
    'img/phones/dell-streak-7.1.jpg',
    'img/phones/dell-streak-7.2.jpg',
    'img/phones/dell-streak-7.3.jpg',
    'img/phones/dell-streak-7.4.jpg'
  ],
  'description': 'Introducing Dell\u2122 Streak 7. Share photos, videos and movies together. It\u2019s small enough to carry around, big enough to gather around. Android\u2122 2.2-based tablet with over-the-air upgrade capability for future OS releases.  A vibrant 7-inch, multitouch display with full Adobe\u00ae Flash 10.1 pre-installed.  Includes a 1.3 MP front-facing camera for face-to-face chats on popular services such as Qik or Skype.  16 GB of internal storage, plus Wi-Fi, Bluetooth and built-in GPS keeps you in touch with the world around you.  Connect on your terms. Save with 2-year contract or flexibility with prepaid pay-as-you-go plans',
};


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__template_pug__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__template_pug___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__template_pug__);




class PhoneCatalogue {
  constructor(options) {
    this._element = options.element;
    this._phones = options.phones;

    this._render();

    this._element.addEventListener('click', this._onPhoneClick);
  }

  _render() {
    this._element.innerHTML = __WEBPACK_IMPORTED_MODULE_0__template_pug___default()({
      phones: this._phones
    });
  }

  _onPhoneClick(e) {
    let selected = e.target.closest('[data-element="phone-item"]');

    alert(selected.dataset.phoneId);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PhoneCatalogue;



/***/ }),
/* 7 */
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
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__template_pug__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__template_pug___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__template_pug__);




class PhoneViewer {
  constructor(options) {
    this._element = options.element;

    this.render(options.phoneDetails);
  }

  render(phoneDetails) {
    this._element.innerHTML = __WEBPACK_IMPORTED_MODULE_0__template_pug___default()({
      phone: phoneDetails
    });
  }

  show() {
    this._element.classList.remove('js-hidden');
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PhoneViewer;



/***/ }),
/* 9 */
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

pug_html = pug_html + "\u003C\u002Ful\u003E";}.call(this,"phone" in locals_for_with?locals_for_with.phone:typeof phone!=="undefined"?phone:undefined));;return pug_html;};
module.exports = template;

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map