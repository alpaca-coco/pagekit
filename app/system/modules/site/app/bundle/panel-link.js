var Links =
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

	window.Links = module.exports = {

	        data: function () {
	            return {
	                type: false,
	                link: ''
	            };
	        },

	        watch: {

	            type: {
	                handler: function (type) {
	                    if (!type && this.types.length) {
	                        this.type = this.types[0].value;
	                    }
	                },
	                immediate: true
	            }

	        },

	        computed: {

	            types: function () {

	                var types = [], options;

	                _.forIn(this.$options.components, function (component, name) {

	                    options = component.options || {};

	                    if (options.link) {
	                        types.push({ text: options.link.label, value: name });
	                    }

	                });

	                return _.sortBy(types, 'text');
	            }

	        },

	        components: {}

	    };

	    Vue.component('panel-link', function (resolve) {
	        resolve(module.exports);
	    });

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = "<div class=\"uk-form-row\">\n        <label for=\"form-style\" class=\"uk-form-label\">{{ 'Extension' | trans }}</label>\n        <div class=\"uk-form-controls\">\n            <select id=\"form-style\" class=\"uk-width-1-1\" v-model=\"type\" options=\"types\"></select>\n        </div>\n    </div>\n\n    <div v-component=\"{{ type }}\" link=\"{{@ link }}\" v-if=\"type\"></div>";

/***/ }
/******/ ]);