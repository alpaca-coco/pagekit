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

	module.exports = __webpack_require__(33)
	module.exports.template = __webpack_require__(34)


/***/ },

/***/ 33:
/***/ function(module, exports) {

	module.exports = {

	        section: {
	            label: 'Settings'
	        },

	        props: ['widget', 'config', 'form'],

	        created: function () {
	            this.$resource('api/site/menu').query(function (data) {
	                this.$set('menus', data.filter(function (menu) {
	                    return menu.id !== 'trash';
	                }));
	            });
	        },

	        computed: {

	            menuOptions: function () {
	                return _.map(this.menus, function (menu) {
	                    return {text: menu.label, value: menu.id};
	                });
	            }

	        }

	    };

	    window.Widgets.components['system-menu:settings'] = module.exports;

/***/ },

/***/ 34:
/***/ function(module, exports) {

	module.exports = "<div class=\"uk-grid pk-grid-large\" data-uk-grid-margin>\n        <div class=\"uk-flex-item-1 uk-form-horizontal\">\n\n            <div class=\"uk-form-row\">\n                <label for=\"form-title\" class=\"uk-form-label\">{{ 'Title' | trans }}</label>\n                <div class=\"uk-form-controls\">\n                    <input id=\"form-title\" class=\"uk-form-width-large\" type=\"text\" name=\"title\" v-model=\"widget.title\" v-validate=\"required\">\n                    <p class=\"uk-form-help-block uk-text-danger\" v-show=\"form.title.invalid\">{{ 'Title cannot be blank.' | trans }}</p>\n                </div>\n            </div>\n\n            <div class=\"uk-form-row\">\n                <label for=\"form-menu\" class=\"uk-form-label\">{{ 'Menu' | trans }}</label>\n                <div class=\"uk-form-controls\">\n                    <select id=\"form-menu\" class=\"uk-form-width-large\" v-model=\"widget.data.menu\" options=\"menuOptions\">\n                        <option value=\"\">{{ '- Menu -' | trans }}</option>\n                    </select>\n                </div>\n            </div>\n\n            <div class=\"uk-form-row\">\n                <label for=\"form-level\" class=\"uk-form-label\">{{ 'Start Level' | trans }}</label>\n                <div class=\"uk-form-controls\">\n                    <select id=\"form-level\" class=\"uk-form-width-large\" v-model=\"widget.data.start_level\" number>\n                        <option value=\"1\">1</option>\n                        <option value=\"2\">2</option>\n                        <option value=\"3\">3</option>\n                        <option value=\"4\">4</option>\n                        <option value=\"5\">5</option>\n                        <option value=\"6\">6</option>\n                        <option value=\"7\">7</option>\n                        <option value=\"8\">8</option>\n                        <option value=\"9\">9</option>\n                        <option value=\"10\">10</option>\n                    </select>\n                </div>\n            </div>\n\n            <div class=\"uk-form-row\">\n                <label for=\"form-depth\" class=\"uk-form-label\">{{ 'Depth' | trans }}</label>\n                <div class=\"uk-form-controls\">\n                    <select id=\"form-depth\" class=\"uk-form-width-large\" v-model=\"widget.data.depth\" number>\n                        <option value=\"\">{{ 'No Limit' | trans }}</option>\n                        <option value=\"1\">1</option>\n                        <option value=\"2\">2</option>\n                        <option value=\"3\">3</option>\n                        <option value=\"4\">4</option>\n                        <option value=\"5\">5</option>\n                        <option value=\"6\">6</option>\n                        <option value=\"7\">7</option>\n                        <option value=\"8\">8</option>\n                        <option value=\"9\">9</option>\n                        <option value=\"10\">10</option>\n                    </select>\n                </div>\n            </div>\n\n            <div class=\"uk-form-row\">\n                <span class=\"uk-form-label\">{{ 'Sub Items' | trans }}</span>\n                <div class=\"uk-form-controls uk-form-controls-text\">\n                    <p class=\"uk-form-controls-condensed\">\n                        <label><input type=\"radio\" value=\"all\" v-model=\"widget.data.mode\"> {{ 'Show all' | trans }}</label>\n                    </p>\n                    <p class=\"uk-form-controls-condensed\">\n                        <label><input type=\"radio\" value=\"active\" v-model=\"widget.data.mode\"> {{ 'Show only for active item' | trans }}</label>\n                    </p>\n                </div>\n            </div>\n\n        </div>\n        <div class=\"pk-width-sidebar pk-width-sidebar-large\">\n\n            <partial name=\"settings\"></partial>\n\n        </div>\n    </div>";

/***/ }

/******/ });