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

	window.Site = module.exports = {

	    data: function () {
	        return _.merge({form: {}}, window.$data);
	    },

	    ready: function() {

	        UIkit.tab(this.$$.tab, {connect: this.$$.content});

	    },

	    computed: {

	        sections: function () {

	            var sections = [], hash = window.location.hash.replace('#', '');

	            _.forIn(this.$options.components, function (component, name) {

	                var options = component.options || {}, section = options.section;

	                if (section) {
	                    section.name = name;
	                    section.active = name == hash;
	                    sections.push(section);
	                }

	            });

	            return sections;
	        }

	    },

	    methods: {

	        save: function(e) {
	            e.preventDefault();

	            this.$broadcast('save', this.config);

	            this.$http.post('admin/system/settings/config', { name: 'system/site', config: this.config }, function() {
	                 this.$notify('Settings saved.');
	            }).error(function(data) {
	                 this.$notify(data, 'danger');
	            });

	        }

	    },

	    components: {

	        'site-code': __webpack_require__(24),
	        'site-general': __webpack_require__(27),
	        'site-maintenance': __webpack_require__(30)

	    }

	};

	$(function () {

	    new Vue(module.exports).$mount('#settings');

	});


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(25)
	module.exports.template = __webpack_require__(26)


/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = {

	        section: {
	            label: 'Code',
	            icon: 'pk-icon-large-code',
	            priority: 20
	        },

	        props: ['config']

	    }

/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = "<div class=\"uk-margin uk-flex uk-flex-space-between uk-flex-wrap\" data-uk-margin>\n        <div data-uk-margin>\n            <h2 class=\"uk-margin-remove\">{{ 'Code' | trans }}</h2>\n        </div>\n        <div data-uk-margin>\n            <button class=\"uk-button uk-button-primary\" type=\"submit\">{{ 'Save' | trans }}</button>\n        </div>\n    </div>\n\n    <p>{{ 'Insert code in the header and footer of your theme. This is useful for tracking codes and meta tags.' | trans }}</p>\n\n    <div class=\"uk-form uk-form-stacked\">\n        <div class=\"uk-form-row\">\n            <label for=\"form-codeheader\" class=\"uk-form-label\">{{ 'Header' | trans }}</label>\n            <div class=\"uk-form-controls\">\n                <v-editor type=\"code\" value=\"{{@ config.code.header }}\"></v-editor>\n            </div>\n        </div>\n\n        <div class=\"uk-form-row\">\n            <label for=\"form-codeheader\" class=\"uk-form-label\">{{ 'Footer' | trans }}</label>\n            <div class=\"uk-form-controls\">\n                <v-editor type=\"code\" value=\"{{@ config.code.footer }}\"></v-editor>\n            </div>\n        </div>\n    </div>";

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(28)
	module.exports.template = __webpack_require__(29)


/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = {

	        section: {
	            label: 'General',
	            icon: 'pk-icon-large-settings',
	            priority: 10
	        },

	        props: ['config', 'form']

	    }

/***/ },
/* 29 */
/***/ function(module, exports) {

	module.exports = "<div class=\"uk-margin uk-flex uk-flex-space-between uk-flex-wrap\" data-uk-margin>\n        <div data-uk-margin>\n            <h2 class=\"uk-margin-remove\">{{ 'General' | trans }}</h2>\n        </div>\n        <div data-uk-margin>\n            <button class=\"uk-button uk-button-primary\" type=\"submit\">{{ 'Save' | trans }}</button>\n        </div>\n    </div>\n\n    <div class=\"uk-form uk-form-horizontal\">\n\n        <div class=\"uk-form-row\">\n            <label for=\"form-title\" class=\"uk-form-label\">{{ 'Title' | trans }}</label>\n            <div class=\"uk-form-controls\">\n                <input id=\"form-title\" class=\"uk-form-width-large\" name=\"title\" type=\"text\" v-model=\"config.title\" v-validate=\"required\">\n                <p class=\"uk-form-help-block uk-text-danger\" v-show=\"form.title.invalid\">{{ 'Site title cannot be blank.' | trans }}</p>\n            </div>\n        </div>\n\n        <div class=\"uk-form-row\">\n            <label for=\"form-appicon\" class=\"uk-form-label\">{{ 'Logo' | trans }}</label>\n            <div class=\"uk-form-controls uk-form-width-large\">\n                <input-image source=\"{{@ config.view.logo }}\"></input-image>\n            </div>\n        </div>\n\n        <div class=\"uk-form-row\">\n            <label for=\"form-favicon\" class=\"uk-form-label\">{{ 'Favicon' | trans }}</label>\n            <div class=\"uk-form-controls uk-form-width-large\">\n                <input-image source=\"{{@ config.icons.favicon }}\"></input-image>\n            </div>\n        </div>\n\n        <div class=\"uk-form-row\">\n            <label for=\"form-appicon\" class=\"uk-form-label\">{{ 'Appicon' | trans }}</label>\n            <div class=\"uk-form-controls uk-form-width-large\">\n                <input-image source=\"{{@ config.icons.appicon }}\"></input-image>\n            </div>\n        </div>\n\n    </div>";

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(31)
	module.exports.template = __webpack_require__(32)


/***/ },
/* 31 */
/***/ function(module, exports) {

	module.exports = {

	        section: {
	            label: 'Maintenance',
	            icon: 'pk-icon-large-cone',
	            priority: 30
	        },

	        props: ['config']

	    }

/***/ },
/* 32 */
/***/ function(module, exports) {

	module.exports = "<div class=\"uk-margin uk-flex uk-flex-space-between uk-flex-wrap\" data-uk-margin>\n        <div data-uk-margin>\n            <h2 class=\"uk-margin-remove\">{{ 'Maintenance' | trans }}</h2>\n        </div>\n        <div data-uk-margin>\n            <button class=\"uk-button uk-button-primary\" type=\"submit\">{{ 'Save' | trans }}</button>\n        </div>\n    </div>\n\n    <div class=\"uk-form uk-form-horizontal\">\n\n        <div class=\"uk-form-row\">\n            <span class=\"uk-form-label\">{{ 'Offline' | trans }}</span>\n            <div class=\"uk-form-controls uk-form-controls-text\">\n                <label><input type=\"checkbox\" value=\"1\" v-model=\"config.maintenance.enabled\"> {{ 'Put the site offline and show the offline message.' | trans }}</label>\n            </div>\n        </div>\n\n\n        <div class=\"uk-form-row\">\n            <label for=\"form-offlinemessage\" class=\"uk-form-label\">{{ 'Message' | trans }}</label>\n            <div class=\"uk-form-controls\">\n                <textarea id=\"form-offlinemessage\" class=\"uk-form-width-large\" placeholder=\"{{ &quot;We'll be back soon.&quot; | trans }}\" rows=\"5\" v-model=\"config.maintenance.msg\"></textarea>\n            </div>\n        </div>\n\n    </div>";

/***/ }
/******/ ]);