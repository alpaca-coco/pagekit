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
	        return _.merge({}, window.$data);
	    },

	    created: function () {

	        var sections = [], type = _.kebabCase(this.type.id), active;

	        _.forIn(this.$options.components, function (component, name) {

	            var options = component.options || {};

	            if (options.section) {
	                sections.push(_.extend({name: name, priority: 0}, options.section));
	            }

	        });

	        sections = _.sortBy(sections.filter(function (section) {

	            active = section.name.match('(.+):(.+)');

	            if (active === null) {
	                return !_.find(sections, {name: type + ':' + section.name});
	            }

	            return active[1] == type;
	        }, this), 'priority');

	        this.$set('sections', sections);

	    },

	    ready: function () {
	        this.Nodes = this.$resource('api/site/node/:id');
	        this.tab = UIkit.tab(this.$$.tab, {connect: this.$$.content});
	    },

	    computed: {

	        path: function () {
	            return (this.node.path ? this.node.path.split('/').slice(0, -1).join('/') : '') + '/' + (this.node.slug || '');
	        }

	    },

	    methods: {

	        save: function (e) {
	            e.preventDefault();

	            var data = {node: this.node};

	            this.$broadcast('save', data);

	            this.Nodes.save({id: this.node.id}, data, function (data) {

	                if (!this.node.id) {
	                    window.history.replaceState({}, '', this.$url.route('admin/site/page/edit', {id: data.node.id}));
	                }

	                this.$set('node', data.node);

	                this.$notify(this.$trans('%type% saved.', {type: this.type.label}));

	            }, function (data) {

	                this.$notify(data, 'danger');
	            });
	        }

	    },

	    partials: {

	        'settings': __webpack_require__(11)

	    },

	    components: {

	        'settings': __webpack_require__(12),
	        'link:settings': __webpack_require__(15)

	    }

	};

	jQuery(function () {

	    (new Vue(module.exports)).$mount('#site-edit');

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
/* 11 */
/***/ function(module, exports) {

	module.exports = "<div class=\"uk-form-row\">\n    <label for=\"form-menu-title\" class=\"uk-form-label\">{{ 'Menu Title' | trans }}</label>\n    <div class=\"uk-form-controls\">\n        <input id=\"form-menu-title\" class=\"uk-form-width-large\" type=\"text\" name=\"title\" v-model=\"node.title\" v-validate=\"required\">\n        <div class=\"uk-form-help-block uk-text-danger\" v-show=\"form.title.invalid\">{{ 'Invalid name.' | trans }}</div>\n    </div>\n</div>\n\n<div class=\"uk-form-row\">\n    <label for=\"form-slug\" class=\"uk-form-label\">{{ 'Slug' | trans }}</label>\n    <div class=\"uk-form-controls\">\n        <input id=\"form-slug\" class=\"uk-form-width-large\" type=\"text\" v-model=\"node.slug\">\n    </div>\n</div>\n\n<div class=\"uk-form-row\">\n    <label for=\"form-status\" class=\"uk-form-label\">{{ 'Status' | trans }}</label>\n    <div class=\"uk-form-controls\">\n        <select id=\"form-status\" class=\"uk-form-width-large\" v-model=\"node.status\">\n            <option value=\"0\">{{ 'Disabled' | trans }}</option>\n            <option value=\"1\">{{ 'Enabled' | trans }}</option>\n        </select>\n    </div>\n</div>\n\n<div class=\"uk-form-row\">\n    <span class=\"uk-form-label\">{{ 'Restrict Access' | trans }}</span>\n    <div class=\"uk-form-controls uk-form-controls-text\">\n        <p v-repeat=\"role: roles\" class=\"uk-form-controls-condensed\">\n            <label><input type=\"checkbox\" value=\"{{ role.id }}\" v-checkbox=\"node.roles\" number> {{ role.name }}</label>\n        </p>\n    </div>\n</div>\n\n<div class=\"uk-form-row\">\n    <span class=\"uk-form-label\">{{ 'Menu' | trans }}</span>\n    <div class=\"uk-form-controls uk-form-controls-text\">\n        <label><input type=\"checkbox\" value=\"center-content\" v-model=\"node.data.menu_hide\"> {{ 'Hide in menu' | trans }}</label>\n    </div>\n</div>\n";

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(13)
	module.exports.template = __webpack_require__(14)


/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = {

	        inherit: true,

	        section: {
	            label: 'Settings'
	        }

	    };

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = "<div class=\"uk-form-horizontal\">\n        <partial name=\"settings\"></partial>\n    </div>";

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(16)
	module.exports.template = __webpack_require__(17)


/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = {

	        inherit: true,

	        section: {
	            label: 'Settings',
	            priority: 0,
	            active: 'link'
	        },

	        created: function () {
	            if (this.behavior === 'redirect') {
	                this.node.link = this.node.data.redirect;
	            }

	            if (!this.node.id) {
	                this.node.status = 1;
	            }
	        },

	        computed: {

	            behavior: {

	                get: function () {
	                    if (this.node.data.alias) {
	                        return 'alias';
	                    } else if (this.node.data.redirect) {
	                        return 'redirect';
	                    }

	                    return 'link';
	                },

	                set: function (type) {
	                    this.$set('node.data', _.extend(this.node.data, {
	                        alias: type === 'alias',
	                        redirect: type === 'redirect' ? this.node.link : false
	                    }));
	                }

	            }

	        },

	        events: {

	            save: function () {
	                if (this.behavior === 'redirect') {
	                    this.node.data.redirect = this.node.link;
	                }
	            }

	        }

	    }

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = "<div class=\"uk-form-horizontal\">\n\n        <div class=\"uk-form-row\">\n            <label for=\"form-url\" class=\"uk-form-label\">{{ 'Url' | trans }}</label>\n            <div class=\"uk-form-controls\">\n                <input-link id=\"form-url\" class=\"uk-form-width-large\" name=\"link\" link=\"{{@ node.link}}\" required></input-link>\n                <div class=\"uk-form-help-block uk-text-danger\" v-show=\"form.link.invalid\">{{ 'Invalid url.' | trans }}</div>\n            </div>\n        </div>\n\n        <div class=\"uk-form-row\">\n            <label for=\"form-type\" class=\"uk-form-label\">{{ 'Type' | trans }}</label>\n\n            <div class=\"uk-form-controls\">\n                <select id=\"form-type\" class=\"uk-form-width-large\" v-model=\"behavior\">\n                    <option value=\"link\">{{ 'Link' | trans }}</option>\n                    <option value=\"alias\">{{ 'URL Alias' | trans }}</option>\n                    <option value=\"redirect\">{{ 'Redirect' | trans }}</option>\n                </select>\n            </div>\n        </div>\n\n        <partial name=\"settings\"></partial>\n\n    </div>";

/***/ }
/******/ ]);