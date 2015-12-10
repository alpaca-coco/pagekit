var Debugbar =
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

	var $ = __webpack_require__(11);
	var Debugbar = Vue.extend(__webpack_require__(12));

	Debugbar.component('system', __webpack_require__(15));
	Debugbar.component('routes', __webpack_require__(18));
	Debugbar.component('events', __webpack_require__(21));
	Debugbar.component('time', __webpack_require__(24));
	Debugbar.component('memory', __webpack_require__(27));
	Debugbar.component('database', __webpack_require__(30));
	Debugbar.component('request', __webpack_require__(33));
	Debugbar.component('auth', __webpack_require__(36));
	Debugbar.component('log', __webpack_require__(39));

	$(function () {

	    new Debugbar().$appendTo('body');

	});

	module.exports = Debugbar;


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

	module.exports = jQuery;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(13)
	module.exports.template = __webpack_require__(14)


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(11);
	    var config = window.$debugbar;

	    module.exports = {

	        el: function () {
	            return document.createElement('div');
	        },

	        data: function () {
	            return {
	                data: {},
	                panel: null,
	                sections: {}
	            }
	        },

	        created: function () {

	            this.$http.get(config.url, function (data) {

	                this.$set('data', data);

	                var sections = this.sections;

	                $.each(this.$options.components, function (name, component) {
	                    if (data[name]) {
	                        sections.$add(name, $.extend({name: name}, component.options.section));
	                    }
	                });

	            });

	        },

	        computed: {

	            height: function () {
	                return Math.ceil(window.innerHeight / 2) + 'px';
	            }

	        },

	        methods: {

	            add: function (vm) {
	                this.sections[vm.$options.name]['vm'] = vm;
	            },

	            open: function (name) {

	                var section = this.sections[name], el = document.createElement('div'), panel;

	                if (section.panel) {

	                    if (this.panel) {
	                        this.panel.$destroy(true);
	                    }

	                    panel = section.vm.$addChild({el: el, template: section.panel, inherit: true});
	                    panel.$appendTo(this.$$.panel);

	                    this.$set('panel', panel);
	                }
	            },

	            close: function () {

	                if (this.panel) {
	                    this.panel.$destroy(true);
	                }

	                this.$set('panel', null);
	            }

	        }

	    };

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = "<div id=\"pk-profiler\" class=\"pf-profiler\">\n\n        <div class=\"pf-navbar\">\n\n            <ul class=\"pf-navbar-nav\">\n                <li v-repeat=\"sections | orderBy 'priority'\" v-on=\"click: open(name)\">\n                    <component is=\"{{ name }}\" data=\"{{ data[name] }}\"></component>\n                </li>\n            </ul>\n\n            <a class=\"pf-close\" v-on=\"click: close\"></a>\n\n        </div>\n\n        <div class=\"pf-profiler-panel\" v-el=\"panel\" v-style=\"display: panel ? 'block' : 'none', height: height\"></div>\n\n    </div>";

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(16)
	module.exports.template = __webpack_require__(17)


/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = {

	    section: {
	        priority: 10,
	        panel: '#panel-system'
	    },

	    props: ['data'],

	    created: function () {
	        this.$data = this.data;
	        this.$parent.add(this);
	    }

	  };

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = "<a title=\"System Information\"><div class=\"pf-icon-large pf-icon-pagekit\"></div></a>\n\n    <script id=\"panel-system\" type=\"text/template\">\n\n        <h1>Information</h1>\n\n        <h2>System</h2>\n        <table class=\"pf-table pf-table-dropdown\">\n            <tbody>\n                <tr>\n                    <td>Pagekit</td>\n                    <td>{{ version }}</td>\n                </tr>\n                <tr>\n                    <td>Server</td>\n                    <td>{{ server }}</td>\n                </tr>\n                <tr>\n                    <td>Useragent</td>\n                    <td>{{ useragent }}</td>\n                </tr>\n            </tbody>\n        </table>\n\n        <h2>PHP</h2>\n        <table class=\"pf-table pf-table-dropdown\">\n            <tbody>\n                <tr>\n                    <td>PHP</td>\n                    <td>{{ phpversion }}</td>\n                </tr>\n                <tr>\n                    <td>PHP SAPI</td>\n                    <td>{{ sapi_name }}</td>\n                </tr>\n                <tr>\n                    <td>System</td>\n                    <td>{{ php }}</td>\n                </tr>\n                <tr>\n                    <td>Extensions</td>\n                    <td>{{ extensions }}</td>\n                </tr>\n            </tbody>\n        </table>\n\n        <h2>Database</h2>\n        <table class=\"pf-table pf-table-dropdown\">\n            <tbody>\n                <tr>\n                    <td>Driver</td>\n                    <td>{{ dbdriver }}</td>\n                </tr>\n                <tr>\n                    <td>Version</td>\n                    <td>{{ dbversion }}</td>\n                </tr>\n                <tr>\n                    <td>Client</td>\n                    <td>{{ dbclient }}</td>\n                </tr>\n            </tbody>\n        </table>\n\n    </script>";

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(19)
	module.exports.template = __webpack_require__(20)


/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = {

	    section: {
	        priority: 20,
	        panel: '#panel-routes'
	    },

	    props: ['data'],

	    created: function () {
	        this.$data = this.data;
	        this.$parent.add(this);
	    },

	    filters: {

	        str: function (methods) {
	            return methods.length ? '(' + methods + ')' : '';
	        },

	        short: function (controller) {
	            return controller.split('\\').pop();
	        }

	    }

	  };

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = "<a title=\"Routes\"><div class=\"pf-icon pf-icon-routes\"></div> Routes</a>\n\n    <script id=\"panel-routes\" type=\"text/template\">\n\n        <h1>Routes</h1>\n\n        <table class=\"pf-table\">\n            <thead>\n                <tr>\n                    <th>Name</th>\n                    <th>Pattern</th>\n                    <th>Controller</th>\n                </tr>\n            </thead>\n            <tbody>\n                <tr v-repeat=\"routes\">\n                    <td>{{ name }}</td>\n                    <td>{{ pattern }} {{ methods | str }}</td>\n                    <td><abbr title=\"{{ controller }}\">{{ controller | short }}</abbr></td>\n                </tr>\n            </tbody>\n        </table>\n\n    </script>";

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(22)
	module.exports.template = __webpack_require__(23)


/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = {

	    section: {
	        priority: 10
	    },

	    props: ['data'],

	    created: function () {
	        this.$data = this.data;
	        this.$parent.add(this);
	    }

	  };

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = "<a title=\"Events\"><div class=\"pf-icon pf-icon-events\"></div> Events</a>";

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(25)
	module.exports.template = __webpack_require__(26)


/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = {

	    section: {
	        priority: 30
	    },

	    props: ['data'],

	    created: function () {
	        this.$data = this.data;
	        this.$parent.add(this);
	    }

	  };

/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = "<a title=\"Time\"><div class=\"pf-icon pf-icon-time\"></div> {{ duration_str }}</a>";

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
	        priority: 40
	    },

	    props: ['data'],

	    created: function () {
	        this.$data = this.data;
	        this.$parent.add(this);
	    }

	  };

/***/ },
/* 29 */
/***/ function(module, exports) {

	module.exports = "<a title=\"Memory\"><div class=\"pf-icon pf-icon-memory\"></div> {{ peak_usage_str }}</a>";

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
	        priority: 50,
	        panel: '#panel-database'
	    },

	    props: ['data'],

	    created: function () {
	        this.$data = this.data;
	        this.$parent.add(this);
	    }

	  };

/***/ },
/* 32 */
/***/ function(module, exports) {

	module.exports = "<a title=\"Database\" class=\"pf-parent\">\n        <div class=\"pf-icon pf-icon-database\"></div> {{ nb_statements }}\n    </a>\n\n    <div class=\"pf-dropdown\">\n\n        <table class=\"pf-table pf-table-dropdown\">\n            <tbody>\n                <tr>\n                    <td>Queries</td>\n                    <td>{{ nb_statements }}</td>\n                </tr>\n                <tr>\n                    <td>Time</td>\n                    <td>{{ accumulated_duration_str }}</td>\n                </tr>\n                <tr>\n                    <td>Driver</td>\n                    <td>{{ driver }}</td>\n                </tr>\n            </tbody>\n        </table>\n\n    </div>\n\n    <script id=\"panel-database\" type=\"text/template\">\n\n        <h1>Queries</h1>\n\n        <p v-show=\"!nb_statements\">\n            <em>No queries.</em>\n        </p>\n\n        <div v-repeat=\"statements\">\n\n            <pre><code>{{ sql }}</code></pre>\n\n            <p class=\"pf-submenu\">\n                <span>{{ duration_str }}</span>\n                <span>{{ params | json }}</span>\n            </p>\n\n        </div>\n\n    </script>";

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(34)
	module.exports.template = __webpack_require__(35)


/***/ },
/* 34 */
/***/ function(module, exports) {

	module.exports = {

	    section: {
	        priority: 10
	    },

	    props: ['data'],

	    created: function () {
	        this.$data = this.data;
	        this.$parent.add(this);
	    }

	  };

/***/ },
/* 35 */
/***/ function(module, exports) {

	module.exports = "<a title=\"Request\"><div class=\"pf-icon pf-icon-request\"></div> <span class=\"pf-badge\">200</span> @test</a>";

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(37)
	module.exports.template = __webpack_require__(38)


/***/ },
/* 37 */
/***/ function(module, exports) {

	module.exports = {

	    section: {
	        priority: 60
	    },

	    props: ['data'],

	    created: function () {
	        this.$data = this.data;
	        this.$parent.add(this);
	    },

	    computed: {

	        label: function () {

	            if (this.user) {
	                return this.user;
	            }

	            return this.enabled ? 'You are not authenticated.' : 'Authentication is disabled.';
	        }

	    }

	  };

/***/ },
/* 38 */
/***/ function(module, exports) {

	module.exports = "<a title=\"User\"><div class=\"pf-icon pf-icon-auth\" v-class=\"pf-parent: user\"></div> {{ label }}</a>\n\n    <div class=\"pf-dropdown\" v-show=\"user\">\n\n        <table class=\"pf-table pf-table-dropdown\">\n            <tbody>\n                <tr>\n                    <td>Username</td>\n                    <td>{{ user }}</td>\n                </tr>\n                <tr>\n                    <td>Roles</td>\n                    <td>{{ roles | json }}</td>\n                </tr>\n                <tr>\n                    <td>Authenticated</td>\n                    <td>{{ authenticated ? 'yes' : 'no' }}</td>\n                </tr>\n                <tr>\n                    <td>Class</td>\n                    <td>{{ user_class }}</td>\n                </tr>\n            </tbody>\n        </table>\n\n    </div>";

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(40)
	module.exports.template = __webpack_require__(41)


/***/ },
/* 40 */
/***/ function(module, exports) {

	module.exports = {

	    section: {
	        priority: 70,
	        panel: '#panel-log'
	    },

	    props: ['data'],

	    created: function () {
	        this.$data = this.data;
	        this.$parent.add(this);
	    }

	  };

/***/ },
/* 41 */
/***/ function(module, exports) {

	module.exports = "<a title=\"Log\">Log ({{ records.length }})</a>\n\n    <script id=\"panel-log\" type=\"text/template\">\n\n        <h1>Logs</h1>\n\n        <table class=\"pf-table\">\n            <thead>\n                <tr>\n                    <th>Message</th>\n                    <th>Level</th>\n                </tr>\n            </thead>\n            <tbody>\n                <tr v-repeat=\"records\">\n                    <td>{{ message }}</td>\n                    <td>{{ level_name }}</td>\n                </tr>\n            </tbody>\n        </table>\n\n    </script>";

/***/ }
/******/ ]);