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

	module.exports = __webpack_require__(18)
	module.exports.template = __webpack_require__(19)


/***/ },

/***/ 18:
/***/ function(module, exports) {

	module.exports = {

	        props: ['link', 'name', 'class', 'id', 'required'],

	        data: function () {
	            return {url: false};
	        },

	        watch: {

	            link: {
	                handler: 'load',
	                immediate: true
	            }

	        },

	        computed: {

	            isRequired: function() {
	                return this.required !== undefined;
	            }

	        },

	        methods: {

	            load: function () {
	                if (this.link) {
	                    this.$http.get('api/site/link', {link: this.link}, function (data) {
	                        this.url = data.url ? data.url : false;
	                    }).error(function () {
	                        this.url = false;
	                    })
	                } else {
	                    this.url = false;
	                }
	            },

	            open: function (e) {
	                e.preventDefault();
	                this.$.modal.open();
	            },

	            update: function (e) {
	                e.preventDefault();

	                this.$set('link', this.$.links.link);

	                Vue.nextTick(function() {
	                    this.$$.input.dispatchEvent(new Event('input'));
	                }.bind(this));

	                this.$.modal.close();
	            },

	            showUpdate: function () {
	                return !!this.$.links.link;
	            }

	        }

	    };

	    Vue.component('input-link', function (resolve) {
	        resolve(module.exports);
	    });

/***/ },

/***/ 19:
/***/ function(module, exports) {

	module.exports = "<div v-attr=\"class: class\">\n        <div class=\"pk-form-link uk-width-1-1\">\n            <input class=\"uk-width-1-1\" type=\"text\" v-model=\"link\" v-attr=\"name: name, id: id\" v-validate=\"required: isRequired\" v-el=\"input\" lazy>\n            <a class=\"pk-form-link-toggle pk-link-icon uk-flex-middle\" v-on=\"click: open\">{{ 'Select' | trans }} <i class=\"pk-icon-link pk-icon-hover uk-margin-small-left\"></i></a>\n        </div>\n    </div>\n\n    <p class=\"uk-text-muted uk-margin-small-top uk-margin-bottom-remove\" v-show=\"url\">{{ url }}</p>\n\n    <v-modal v-ref=\"modal\">\n\n        <form class=\"uk-form uk-form-stacked\" v-on=\"submit: update\">\n\n            <div class=\"uk-modal-header\">\n                <h2>{{ 'Select Link' | trans }}</h2>\n            </div>\n\n            <panel-link v-ref=\"links\"></panel-link>\n\n            <div class=\"uk-modal-footer uk-text-right\">\n                <button class=\"uk-button uk-button-link uk-modal-close\" type=\"button\">{{ 'Cancel' | trans }}</button>\n                <button class=\"uk-button uk-button-link\" type=\"submit\" v-attr=\"disabled: !showUpdate()\">{{ 'Update' | trans }}</button>\n            </div>\n\n        </form>\n\n    </v-modal>";

/***/ }

/******/ });