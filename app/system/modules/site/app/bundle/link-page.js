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
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(20)
	module.exports.template = __webpack_require__(21)


/***/ },

/***/ 20:
/***/ function(module, exports) {

	module.exports = {

	        link: {
	            label: 'Page'
	        },

	        props: ['link'],

	        data: function () {
	            return {
	                pages: [],
	                page: ''
	            }
	        },

	        created: function () {
	            //TODO don't retrieve entire page objects
	            this.$resource('api/site/page').get(function (pages) {
	                this.pages = pages;
	                if (pages.length) {
	                    this.page = pages[0].id;
	                }
	            });
	        },

	        watch: {

	            page: function (page) {
	                this.link = '@page/' + page;
	            }

	        },

	        computed: {

	            pageOptions: function () {
	                return _.map(this.pages, function (page) {
	                    return {text: page.title, value: page.id};
	                });
	            }

	        }

	    };

	    window.Links.components['link-page'] = module.exports;

/***/ },

/***/ 21:
/***/ function(module, exports) {

	module.exports = "<div class=\"uk-form-row\">\n        <label for=\"form-link-page\" class=\"uk-form-label\">{{ 'View' | trans }}</label>\n        <div class=\"uk-form-controls\">\n            <select id=\"form-link-page\" class=\"uk-width-1-1\" v-model=\"page\" options=\"pageOptions\"></select>\n        </div>\n    </div>";

/***/ }

/******/ });