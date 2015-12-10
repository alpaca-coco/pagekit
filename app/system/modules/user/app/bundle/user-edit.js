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

	window.User = module.exports = {

	    data: function() {
	        return _.merge({password: ''}, window.$data);
	    },

	    created: function () {

	        var sections = [];

	        _.forIn(this.$options.components, function (component, name) {

	            var options = component.options || {};

	            if (options.section) {
	                sections.push(_.extend({name: name, priority: 0}, options.section));
	            }

	        });

	        this.$set('sections', _.sortBy(sections, 'priority'));

	    },

	    ready: function () {
	        this.tab = UIkit.tab(this.$$.tab, {connect: this.$$.content});
	    },

	    computed: {

	        isNew: function () {
	            return !this.user.access && this.user.status;
	        }

	    },

	    methods: {

	        save: function (e) {
	            e.preventDefault();

	            var data = {user: this.user, password: this.password};

	            this.$broadcast('save', data);

	            this.$resource('api/user/:id').save({id: this.user.id}, data, function (data) {

	                if (!this.user.id) {
	                    window.history.replaceState({}, '', this.$url.route('admin/user/edit', {id: data.user.id}))
	                }

	                this.$set('user', data.user);

	                this.$notify('User saved.');

	            }).error(function (data) {
	                this.$notify(data, 'danger');
	            });
	        }

	    },

	    components: {

	        'settings': __webpack_require__(8)

	    }

	};

	$(function () {

	    new Vue(module.exports).$mount('#user-edit');

	});


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(9)
	module.exports.template = __webpack_require__(10)


/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = {

	        inherit: true,

	        section: {
	            label: 'User'
	        }

	    };

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = "<div class=\"uk-grid\" data-uk-grid-margin>\n        <div class=\"uk-width-medium-2-3 uk-width-large-3-4\">\n\n            <div class=\"uk-form-row\">\n                <label for=\"form-username\" class=\"uk-form-label\">{{ 'Username' | trans }}</label>\n                <div class=\"uk-form-controls\">\n                    <input id=\"form-username\" class=\"uk-form-width-large\" type=\"text\" name=\"username\" v-model=\"user.username\" v-validate=\"required\">\n                    <p class=\"uk-form-help-block uk-text-danger\" v-show=\"form.username.invalid\">{{ 'Username cannot be blank.' | trans }}</p>\n                </div>\n            </div>\n\n            <div class=\"uk-form-row\">\n                <label for=\"form-name\" class=\"uk-form-label\">{{ 'Name' | trans }}</label>\n                <div class=\"uk-form-controls\">\n                    <input id=\"form-name\" class=\"uk-form-width-large\" type=\"text\" name=\"name\" v-model=\"user.name\" v-validate=\"required\">\n                    <p class=\"uk-form-help-block uk-text-danger\" v-show=\"form.name.invalid\">{{ 'Name cannot be blank.' | trans }}</p>\n                </div>\n            </div>\n\n            <div class=\"uk-form-row\">\n                <label for=\"form-email\" class=\"uk-form-label\">{{ 'Email' | trans }}</label>\n                <div class=\"uk-form-controls\">\n                    <input id=\"form-email\" class=\"uk-form-width-large\" type=\"text\" name=\"email\" v-model=\"user.email\" v-validate=\"email, required\" lazy>\n                    <p class=\"uk-form-help-block uk-text-danger\" v-show=\"form.email.invalid\">{{ 'Field must be a valid email address.' | trans }}</p>\n                </div>\n            </div>\n\n            <div class=\"uk-form-row\">\n                <label for=\"form-password\" class=\"uk-form-label\">{{ 'Password' | trans }}</label>\n                <div class=\"uk-form-controls uk-form-controls-text js-password\" v-show=\"user.id\">\n                    <a href=\"#\" data-uk-toggle=\"{ target: '.js-password' }\">{{ 'Change password' | trans }}</a>\n                </div>\n                <div class=\"uk-form-controls js-password\" v-class=\"'uk-hidden' : user.id\">\n                    <div class=\"uk-form-password\">\n                        <input id=\"form-password\" class=\"uk-form-width-large\" type=\"password\" v-model=\"password\">\n                        <a href=\"\" class=\"uk-form-password-toggle\" data-uk-form-password=\"{ lblShow: '{{ 'Show' | trans }}', lblHide: '{{ 'Hide' | trans }}' }\">{{ 'Show' | trans }}</a>\n                    </div>\n                </div>\n            </div>\n\n            <div class=\"uk-form-row\">\n                <span class=\"uk-form-label\">{{ 'Status' | trans }}</span>\n                <div class=\"uk-form-controls uk-form-controls-text\">\n                    <p class=\"uk-form-controls-condensed\" v-repeat=\"statuses\">\n                        <label><input type=\"radio\" v-model=\"user.status\" value=\"{{ $key }}\" v-attr=\"disabled: config.currentUser == user.id\" number> {{ $value }}</label>\n                    </p>\n                </div>\n            </div>\n\n            <div class=\"uk-form-row\">\n                <span class=\"uk-form-label\">{{ 'Roles' | trans }}</span>\n                <div class=\"uk-form-controls uk-form-controls-text\">\n                    <p class=\"uk-form-controls-condensed\" v-repeat=\"role: roles\">\n                        <label><input type=\"checkbox\" value=\"{{ role.id }}\" v-checkbox=\"user.roles\" v-attr=\"disabled: role.disabled\" number> {{ role.name }}</label>\n                    </p>\n                </div>\n            </div>\n\n            <div class=\"uk-form-row\">\n                <span class=\"uk-form-label\">{{ 'Last login' | trans }}</span>\n                <div class=\"uk-form-controls uk-form-controls-text\">\n                    <p>{{ $trans('%date%', { date: user.login ? $date(user.login) : $trans('Never') }) }}</p>\n                </div>\n            </div>\n\n            <div class=\"uk-form-row\">\n                <span class=\"uk-form-label\">{{ 'Registered since' | trans }}</span>\n                <div class=\"uk-form-controls uk-form-controls-text\">\n                    {{ $trans('%date%', { date: $date(user.registered) }) }}\n                </div>\n            </div>\n\n        </div>\n        <div class=\"uk-width-medium-1-3 uk-width-large-1-4\">\n\n            <div class=\"uk-panel uk-panel-box uk-text-center\" v-show=\"user.name\">\n\n                <div class=\"uk-panel-teaser\">\n                    <img height=\"280\" width=\"280\" v-attr=\"alt: user.name\" v-gravatar=\"user.email\">\n                </div>\n\n                <h3 class=\"uk-panel-tile uk-margin-bottom-remove uk-text-break\">{{ user.name }}\n                    <i title=\"{{ (isNew ? 'New' : statuses[user.status]) | trans }}\" v-class=\"\n                        pk-icon-circle-primary: isNew,\n                        pk-icon-circle-success: user.access && user.status,\n                        pk-icon-circle-danger: !user.status\n                    \"></i>\n                </h3>\n\n                <div>\n                    <a class=\"uk-text-break\" href=\"mailto:{{ user.email }}\">{{ user.email }}</a><i class=\"uk-icon-check\" title=\"{{ 'Verified email address' | trans }}\" v-show=\"config.emailVerification && user.data.verified\"></i>\n                </div>\n\n            </div>\n\n        </div>\n    </div>";

/***/ }
/******/ ]);