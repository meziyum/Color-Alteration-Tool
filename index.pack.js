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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var hexInput = document.getElementById('hexInput');
var inputColor = document.getElementById('inputColor');
var alteredColor = document.getElementById('alteredColor');
var alteredColorText = document.getElementById('alteredColorText');
var slider = document.getElementById('slider');
var sliderText = document.getElementById('sliderText');
var lightenText = document.getElementById('lightenText');
var darkenText = document.getElementById('darkenText');
var toggleBtn = document.getElementById('toggleBtn');

toggleBtn.addEventListener('click', function () {
  if (toggleBtn.classList.contains('toggled')) {
    toggleBtn.classList.remove('toggled');
    lightenText.classList.remove('unselected');
    darkenText.classList.add('unselected');
  } else {
    toggleBtn.classList.add('toggled');
    lightenText.classList.add('unselected');
    darkenText.classList.remove('unselected');
  }
  reset();
});

hexInput.addEventListener('keyup', function () {

  var hex = hexInput.value;
  if (!isValidHex(hex)) return;

  var strippedHex = hex.replace('#', '');

  inputColor.style.backgroundColor = "#" + strippedHex;
  reset();
});

var isValidHex = function isValidHex(hex) {
  if (!hex) return false;

  var regex = /[0-9A-Fa-f]{6}/g;

  var strippedHex = hex.replace('#', '');
  return (strippedHex.length === 3 || strippedHex.length === 6) && hex.match(regex);
};

var convertHexToRGB = function convertHexToRGB(hex) {
  if (!isValidHex(hex)) return null;

  var strippedHex = hex.replace('#', '');

  if (strippedHex.length === 3) {
    strippedHex = strippedHex[0] + strippedHex[0] + strippedHex[1] + strippedHex[1] + strippedHex[2] + strippedHex[2];
  }

  var r = parseInt(strippedHex.substring(0, 2), 16);
  var g = parseInt(strippedHex.substring(2, 4), 16);
  var b = parseInt(strippedHex.substring(4, 6), 16);

  return { r: r, g: g, b: b };
};

var convertRGBToHex = function convertRGBToHex(r, g, b) {
  var firstPair = ("0" + r.toString(16)).slice(-2);
  var secondPair = ("0" + g.toString(16)).slice(-2);
  var thirdPair = ("0" + b.toString(16)).slice(-2);

  var hex = "#" + firstPair + secondPair + thirdPair;
  return hex;
};

var alterColor = function alterColor(hex, percentage) {
  var _convertHexToRGB = convertHexToRGB(hex),
      r = _convertHexToRGB.r,
      g = _convertHexToRGB.g,
      b = _convertHexToRGB.b;

  var amount = Math.floor(percentage / 100 * 255);

  var newR = increaseWithin0To255(r, amount);
  var newG = increaseWithin0To255(g, amount);
  var newB = increaseWithin0To255(b, amount);
  return convertRGBToHex(newR, newG, newB);
};

var increaseWithin0To255 = function increaseWithin0To255(hex, amount) {
  return Math.min(255, Math.max(0, hex + amount));
};

slider.addEventListener('input', function () {
  if (!isValidHex(hexInput.value)) return;

  sliderText.textContent = slider.value + '%';
  var valueAddition = toggleBtn.classList.contains('toggled') ? -slider.value : slider.value;

  var alteredHex = alterColor(hexInput.value, valueAddition);
  alteredColor.style.backgroundColor = alteredHex;
  alteredColorText.innerText = 'Altered Color ' + alteredHex;
});

var reset = function reset() {
  alteredColor.style.backgroundColor = hexInput.value;
  alteredColorText.innerText = 'Altered Color ' + hexInput.value;
  sliderText.textContent = '0%';
  slider.value = 0;
};

/***/ })
/******/ ]);