/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(2)
	module.exports.template = __webpack_require__(3)


/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports) {

	module.exports = {

	        section: {
	            label: 'Cache',
	            icon: 'pk-icon-large-bolt',
	            priority: 30
	        },

	        props: ['config', 'options'],

	        data: function () {
	            return {
	                caches: window.$caches
	            };
	        },

	        methods: {

	            open: function (e) {
	                e.preventDefault();

	                this.$set('cache', {cache: true});

	                this.$.modal.open();
	            },

	            clear: function (e) {
	                e.preventDefault();

	                this.$http.post('admin/system/cache/clear', {caches: this.cache}, function () {
	                    this.$notify('Cache cleared.')
	                });

	                this.$.modal.close();
	            }

	        }

	    };

	    window.Settings.components['system/cache'] = module.exports;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = "<div class=\"uk-margin uk-flex uk-flex-space-between uk-flex-wrap\" data-uk-margin>\n        <div data-uk-margin>\n\n            <h2 class=\"uk-margin-remove\">{{ 'Cache' | trans }}</h2>\n\n        </div>\n        <div data-uk-margin>\n\n            <button class=\"uk-button uk-button-primary\" type=\"submit\">{{ 'Save' | trans }}</button>\n\n        </div>\n    </div>\n\n    <div class=\"uk-form-row\">\n        <span class=\"uk-form-label\">{{ 'Cache' | trans }}</span>\n\n        <div class=\"uk-form-controls uk-form-controls-text\">\n            <p class=\"uk-form-controls-condensed\" v-repeat=\"cache: caches\">\n                <label><input type=\"radio\" value=\"{{ $key }}\" v-model=\"config.caches.cache.storage\" v-attr=\"disabled: !cache.supported\"> {{ cache.name }}</label>\n            </p>\n        </div>\n    </div>\n\n    <div class=\"uk-form-row\">\n        <span class=\"uk-form-label\">{{ 'Developer' | trans }}</span>\n\n        <div class=\"uk-form-controls uk-form-controls-text\">\n            <p class=\"uk-form-controls-condensed\">\n                <label><input type=\"checkbox\" value=\"1\" v-model=\"config.nocache\"> {{ 'Disable cache' | trans }}</label>\n            </p>\n\n            <p>\n                <button class=\"uk-button uk-button-primary\" type=\"button\" v-on=\"click: open\">{{ 'Clear Cache' | trans }}</button>\n            </p>\n        </div>\n    </div>\n\n    <v-modal v-ref=\"modal\">\n        <form class=\"uk-form-stacked\">\n\n            <div class=\"uk-modal-header\">\n                <h2>{{ 'Select Cache to Clear' | trans }}</h2>\n            </div>\n\n            <div class=\"uk-form-row\">\n                <p class=\"uk-form-controls-condensed\">\n                    <label><input type=\"checkbox\" v-model=\"cache.cache\"> {{ 'System Cache' | trans }}</label>\n                </p>\n\n                <p class=\"uk-form-controls-condensed\">\n                    <label><input type=\"checkbox\" v-model=\"cache.temp\"> {{ 'Temporary Files' | trans }}</label>\n                </p>\n            </div>\n\n            <div class=\"uk-modal-footer uk-text-right\">\n                <button class=\"uk-button uk-button-link uk-modal-close\" type=\"button\">{{ 'Cancel' | trans }}</button>\n                <button class=\"uk-button uk-button-link\" v-on=\"click: clear\">{{ 'Clear' | trans }}</button>\n            </div>\n\n        </form>\n    </v-modal>";

/***/ }
/******/ ]);