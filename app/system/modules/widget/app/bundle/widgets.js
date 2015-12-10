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

	window.Widgets = module.exports = {

	    data: function () {
	        return {
	            widgets: []
	        };
	    },

	    created: function () {
	        this.resource = this.$resource('api/site/widget/:id');
	    },

	    methods: {

	        load: function () {

	            return this.resource.query(function (data) {
	                this.$set('widgets', data);
	            });

	        }

	    },

	    partials: {

	        settings: __webpack_require__(3)

	    },

	    components: {

	        settings: __webpack_require__(4),
	        visibility: __webpack_require__(7)

	    }

	};


/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports) {

	module.exports = "<div class=\"uk-panel uk-form-stacked\">\n\n    <div class=\"uk-form-row\">\n        <label for=\"form-status\" class=\"uk-form-label\">{{ 'Status' | trans }}</label>\n        <div class=\"uk-form-controls\">\n            <select id=\"form-status\" class=\"uk-width-1-1\" v-model=\"widget.status\">\n                <option value=\"0\">{{ 'Disabled' | trans }}</option>\n                <option value=\"1\">{{ 'Enabled' | trans }}</option>\n            </select>\n        </div>\n    </div>\n    <div class=\"uk-form-row\">\n        <label for=\"form-position\" class=\"uk-form-label\">{{ 'Position' | trans }}</label>\n        <div class=\"uk-form-controls\">\n            <select id=\"form-position\" name=\"position\" class=\"uk-width-1-1\" v-model=\"widget.position\" options=\"$parent.positionOptions\">\n                <option value=\"\">{{ '- Assign -' | trans }}</option>\n            </select>\n        </div>\n    </div>\n    <div class=\"uk-form-row\">\n        <span class=\"uk-form-label\">{{ 'Restrict Access' | trans }}</span>\n        <div class=\"uk-form-controls uk-form-controls-text\">\n            <p v-repeat=\"role: config.roles\" class=\"uk-form-controls-condensed\">\n                <label><input type=\"checkbox\" value=\"{{ role.id }}\" v-checkbox=\"widget.roles\" number> {{ role.name }}</label>\n            </p>\n        </div>\n    </div>\n\n</div>\n";

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(5)
	module.exports.template = __webpack_require__(6)


/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = {

	        section: {
	            label: 'Settings'
	        },

	        inherit: true,

	        props: ['widget']

	    }

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = "<div class=\"uk-grid pk-grid-large\" data-uk-grid-margin>\n        <div class=\"uk-flex-item-1 uk-form-horizontal\">\n\n            <div class=\"uk-form-row\">\n                <label for=\"form-title\" class=\"uk-form-label\">{{ 'Title' | trans }}</label>\n                <div class=\"uk-form-controls\">\n                    <input id=\"form-title\" class=\"uk-form-width-large\" type=\"text\" name=\"title\" v-model=\"widget.title\" v-validate=\"required\">\n                    <p class=\"uk-form-help-block uk-text-danger\" v-show=\"form.title.invalid\">{{ 'Title cannot be blank.' | trans }}</p>\n                </div>\n            </div>\n\n        </div>\n        <div class=\"pk-width-sidebar pk-width-sidebar-large\">\n\n            <partial name=\"settings\"></partial>\n\n        </div>\n    </div>";

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(8)
	module.exports.template = __webpack_require__(9)


/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = {

	        section: {
	            label: 'Visibility',
	            priority: 100
	        },

	        inherit: true,

	        props: ['widget'],

	        ready: function () {

	            var nodes = _(this.config.nodes).groupBy('menu').value();

	            this.$set('menus', _.mapValues(this.config.menus, function (menu, id) {

	                return _.extend(menu, {

	                    nodes: _(nodes[id] || {}).sortBy('priority').groupBy('parent_id').value(),

	                    getNodes: function (node) {
	                        return node ? this.nodes[node.id] : this.nodes[0];
	                    }

	                });
	            }));
	        },

	        computed: {

	            all: function () {
	                return !this.widget.nodes || !this.widget.nodes.length;
	            }

	        },

	        components: {

	            node: {

	                inherit: true,

	                template:
	                        '<li>'+
	                            '<label>' +
	                                '<input type="checkbox" value="{{ node.id }}" v-checkbox="widget.nodes" number>' +
	                                ' {{ node.title }}' +
	                            '</label>' +
	                            '<ul class="uk-list" v-if="menu.getNodes(node)">' +
	                                '<node v-repeat="node: menu.getNodes(node)"></node>' +
	                            '</ul>'+
	                        '<li>'

	            }

	        }

	    }

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = "<div class=\"uk-form-horizontal\">\n\n        <div class=\"uk-form-row\">\n            <span class=\"uk-form-label\">Pages</span>\n            <div class=\"uk-form-controls uk-form-controls-text\">\n                <p><strong>{{ all ? 'All Pages' : 'Only selected pages' | trans }}</strong></p>\n                <ul class=\"uk-list uk-margin-top-remove\" v-repeat=\"menu: menus\" v-show=\"menu.getNodes().length\">\n                    <li class=\"pk-list-header\">{{ menu.label }}</li>\n                    <node v-repeat=\"node: menu.getNodes()\"></node>\n                </ul>\n            </div>\n        </div>\n\n    </div>";

/***/ }
/******/ ]);