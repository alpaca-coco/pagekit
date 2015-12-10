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

	window.Settings = module.exports = {

	    data: function () {
	        return window.$settings;
	    },

	    ready: function() {

	        UIkit.tab(this.$$.tab, {connect: this.$$.content});

	    },

	    computed: {

	        sections: function () {

	            var sections = [];

	            _.forIn(this.$options.components, function (component, name) {

	                var options = component.options || {}, section = options.section;

	                if (section) {
	                    section.name = name;
	                    sections.push(section);
	                }

	            });

	            return sections;
	        }

	    },

	    methods: {

	        save: function(e) {

	            e.preventDefault();

	            this.$broadcast('save', this.$data);
	            this.$resource('admin/system/settings/save').save({ config: this.config, options: this.options }, function() {
	                this.$notify('Settings saved.');
	            }, function (data) {
	                this.$notify(data, 'danger');
	            });
	        }

	    },

	    components: {

	        locale: __webpack_require__(3),
	        system: __webpack_require__(6)

	    }

	};

	jQuery(function () {

	    (new Vue(module.exports)).$mount('#settings');

	});


/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(4)
	module.exports.template = __webpack_require__(5)


/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = {

	        section: {
	            label: 'Localization',
	            icon: 'pk-icon-large-pin',
	            priority: 20
	        },

	        props: ['config', 'options'],

	        data: function() {
	            return _.merge({
	                link: '<a href="https://www.transifex.com/pagekit/pagekit-cms/">Transifex</a>'
	            }, window.$system);
	        },

	        computed: {

	            option: function() {
	                return this.$root.$get('options.system');
	            }

	        }

	    };

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = "<div class=\"uk-margin uk-flex uk-flex-space-between uk-flex-wrap\" data-uk-margin>\n        <div data-uk-margin>\n            <h2 class=\"uk-margin-remove\">{{ 'Localization' | trans }}</h2>\n        </div>\n        <div data-uk-margin>\n            <button class=\"uk-button uk-button-primary\" type=\"submit\">{{ 'Save' | trans }}</button>\n        </div>\n    </div>\n\n    <div class=\"uk-form-row\">\n        <label for=\"form-sitelocale\" class=\"uk-form-label\">{{ 'Site Locale' | trans }}</label>\n        <div class=\"uk-form-controls\">\n            <select id=\"form-sitelocale\" class=\"uk-form-width-large\" v-model=\"option.site.locale\" options=\"locales | toOptions\"></select>\n        </div>\n    </div>\n\n    <div class=\"uk-form-row\">\n        <label for=\"form-adminlocale\" class=\"uk-form-label\">{{ 'Admin Locale' | trans }}</label>\n        <div class=\"uk-form-controls\">\n            <select id=\"form-adminlocale\" class=\"uk-form-width-large\" v-model=\"option.admin.locale\" options=\"locales | toOptions\"></select>\n        </div>\n    </div>\n\n    <p>{{{ 'Is your language not available? Please help out by translating Pagekit into your own language on %link%.' | trans {link:link} }}}</p>";

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(7)
	module.exports.template = __webpack_require__(8)


/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = {

	        section: {
	            label: 'System',
	            icon: 'pk-icon-large-settings',
	            priority: 10
	        },

	        props: ['config', 'options'],

	        data: function() {
	            return window.$system;
	        }

	    };

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = "<div class=\"uk-margin uk-flex uk-flex-space-between uk-flex-wrap\" data-uk-margin>\n        <div data-uk-margin>\n            <h2 class=\"uk-margin-remove\">{{ 'System' | trans }}</h2>\n        </div>\n        <div data-uk-margin>\n            <button class=\"uk-button uk-button-primary\" type=\"submit\">{{ 'Save' | trans }}</button>\n        </div>\n    </div>\n\n    <div class=\"uk-form-row\">\n        <label for=\"form-uploadfolder\" class=\"uk-form-label\">{{ 'Storage' | trans }}</label>\n        <div class=\"uk-form-controls\">\n            <input id=\"form-uploadfolder\" class=\"uk-form-width-large\" type=\"text\" placeholder=\"/storage\" v-model=\"$root.config['system/finder'].storage\">\n        </div>\n    </div>\n\n    <div class=\"uk-form-row\">\n        <span class=\"uk-form-label\">{{ 'Developer' | trans }}</span>\n        <div class=\"uk-form-controls uk-form-controls-text\">\n            <p class=\"uk-form-controls-condensed\">\n                <label><input type=\"checkbox\" value=\"1\" v-model=\"$root.config.application.debug\"> {{ 'Enable debug mode' | trans }}</label>\n            </p>\n            <p class=\"uk-form-controls-condensed\">\n                <label><input type=\"checkbox\" value=\"1\" v-model=\"$root.config.debug.enabled\" v-attr=\"disabled: !sqlite\"> {{ 'Enable debug toolbar' | trans }}</label>\n            </p>\n            <p class=\"uk-form-help-block\" v-if=\"!sqlite\">{{ 'Please enable the SQLite database extension.' | trans }}</p>\n        </div>\n    </div>";

/***/ }
/******/ ]);