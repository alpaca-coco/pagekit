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

	module.exports = {

	    data: _.extend(window.$data, {
	        search: ''
	    }),

	    components: {
	        'marketplace': __webpack_require__(22)
	    }

	};

	$(function () {

	    new Vue(module.exports).$mount('#marketplace');

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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var Install = __webpack_require__(11);
	var Uninstall = __webpack_require__(15);

	module.exports = {

	    methods: {

	        queryUpdates: function (packages, success) {

	            var pkgs = {}, options = {emulateJSON: true};

	            _.each(packages, function (pkg) {
	                pkgs[pkg.name] = pkg.version;
	            });

	            return this.$http.post(this.api + '/api/package/update', {
	                packages: JSON.stringify(pkgs)
	            }, success, options);
	        },

	        queryPackage: function (pkg, success) {
	            return this.$http.get(this.api + '/api/package/:name', {
	                name: _.isObject(pkg) ? pkg.name : pkg
	            }, success).error(function () {
	            });
	        },


	        enable: function (pkg) {
	            return this.$http.post('admin/system/package/enable', {name: pkg.name})
	                .success(function () {
	                    this.$notify(this.$trans('"%title%" enabled.', {title: pkg.title}));
	                    pkg.$set('enabled', true);
	                    document.location.reload();
	                }).error(this.error);
	        },

	        disable: function (pkg) {
	            return this.$http.post('admin/system/package/disable', {name: pkg.name})
	                .success(function () {
	                    pkg.$set('enabled', false);
	                    document.location.reload();
	                }).error(this.error);
	        },

	        install: function (pkg, packages) {
	            var install = this.$addChild(Install);

	            return install.install(pkg, packages);
	        },

	        uninstall: function (pkg, packages) {
	            var uninstall = this.$addChild(Uninstall);

	            return uninstall.uninstall(pkg, packages);
	        },

	        error: function (message) {
	            this.$notify(message, 'danger');
	        }

	    }

	};


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(12)
	module.exports.template = __webpack_require__(14)


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {

	        methods: {

	            install: function (pkg, packages, onClose) {
	                this.$set('pkg', pkg);
	                this.cb = onClose;

	                var vm = this;
	                return this.$http.post('admin/system/package/install', {package: pkg}, null, {
	                    beforeSend: function (request) {
	                        vm.init(request);
	                    }
	                }).success(function () {
	                    if (this.status === 'success' && packages) {
	                        var index = _.findIndex(packages, 'name', pkg.name);

	                        if (-1 !== index) {
	                            packages.splice(index, 1, pkg);
	                        } else {
	                            packages.push(pkg);
	                        }
	                    }
	                }).error(function (msg) {
	                    this.$notify(msg, 'danger');
	                    this.close();
	                });
	            },

	            enable: function () {
	                this.$parent.enable(this.pkg);
	                this.close();
	            }
	        },

	        mixins: [
	            __webpack_require__(13)
	        ]
	    };

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = {

	    data: function () {
	        return {
	            pkg: {},
	            output: '',
	            status: 'loading',
	            options: {
	                bgclose: false,
	                keyboard: false
	            }
	        }
	    },

	    created: function () {
	        this.$mount().$appendTo('body');
	    },

	    methods: {

	        init: function (request) {
	            var vm = this;

	            request.onprogress = function () {
	                vm.setOutput(this.responseText);
	            };

	            this.open();
	        },

	        setOutput: function (output) {
	            var lines = output.split("\n");
	            var match = lines[lines.length - 1].match(/^status=(success|error)$/);

	            if (match) {
	                this.status = match[1];
	                delete lines[lines.length - 1];
	                this.output = lines.join("\n");
	            } else {
	                this.output = output;
	            }
	        },

	        open: function () {
	            this.$.output.open();
	            this.$.output.modal.on('hide.uk.modal', this.onClose);
	        },

	        close: function () {
	            this.$.output.close();
	        },

	        onClose: function () {
	            if (this.cb) {
	                cb(this);
	            }

	            this.$destroy();
	        }

	    },

	    watch: {
	        status: function () {
	            if (this.status !== 'loading') {
	                this.$.output.modal.options.bgclose = true;
	                this.$.output.modal.options.keyboard = true;
	            }
	        }
	    }

	};

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = "<div>\n        <v-modal v-ref=\"output\" options=\"{{ options }}\">\n\n            <div class=\"uk-modal-header uk-flex uk-flex-middle\">\n                <h2>{{ 'Installing %title% %version%' | trans {title:pkg.title,version:pkg.version} }}</h2>\n            </div>\n\n            <pre class=\"pk-pre uk-text-break\" v-html=\"output\"></pre>\n\n            <v-loader v-show=\"status == 'loading'\"></v-loader>\n\n            <div class=\"uk-alert uk-alert-success\" v-show=\"status == 'success'\">{{ 'Successfully installed.' | trans }}</div>\n            <div class=\"uk-alert uk-alert-danger\" v-show=\"status == 'error'\">{{ 'Error' | trans}}</div>\n\n            <div class=\"uk-modal-footer uk-text-right\" v-show=\"status != 'loading'\">\n                <a class=\"uk-button uk-button-link\" v-on=\"click: close\">{{ 'Close' | trans }}</a>\n                <a class=\"uk-button uk-button-primary\" v-on=\"click: enable\" v-show=\"status == 'success'\">{{ 'Enable' | trans }}</a>\n            </div>\n\n        </v-modal>\n    </div>";

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(16)
	module.exports.template = __webpack_require__(17)


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {

	        methods: {

	            uninstall: function (pkg, packages) {
	                this.$set('pkg', pkg);

	                var vm = this;
	                return this.$http.post('admin/system/package/uninstall', {name: pkg.name}, null, {
	                    beforeSend: function (request) {
	                        vm.init(request);
	                    }
	                }).success(function () {
	                    if (this.status === 'success' && packages) {
	                        packages.splice(packages.indexOf(pkg), 1);
	                    }
	                }).error(function (msg) {
	                    this.$notify(msg, 'danger');
	                    this.close();
	                });
	            }

	        },

	        mixins: [
	            __webpack_require__(13)
	        ]
	    };

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = "<div>\n        <v-modal v-ref=\"output\" options=\"{{ options }}\">\n\n            <div class=\"uk-modal-header uk-flex uk-flex-middle\">\n                <h2>{{ 'Removing %title% %version%' | trans {title:pkg.title,version:pkg.version} }}</h2>\n            </div>\n\n            <pre class=\"pk-pre uk-text-break\" v-html=\"output\"></pre>\n\n            <v-loader v-show=\"status == 'loading'\"></v-loader>\n\n            <div class=\"uk-alert uk-alert-success\" v-show=\"status == 'success'\">{{ 'Successfully removed.' | trans }}</div>\n            <div class=\"uk-alert uk-alert-danger\" v-show=\"status == 'error'\">{{ 'Error' | trans}}</div>\n\n            <div class=\"uk-modal-footer uk-text-right\" v-show=\"status != 'loading'\">\n                <a class=\"uk-button uk-button-link\" v-on=\"click: close\">{{ 'Close' | trans }}</a>\n            </div>\n\n        </v-modal>\n    </div>";

/***/ },
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(23)
	module.exports.template = __webpack_require__(24)


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {

	        mixins: [
	            __webpack_require__(10)
	        ],

	        props: ['api', 'search', 'type', 'installed'],

	        data: function () {
	            return {
	                api: '',
	                search: '',
	                type: 'pagekit-extension',
	                pkg: null,
	                packages: null,
	                updates: null,
	                installed: [],
	                page: 0,
	                pages: 0,
	                iframe: '',
	                status: ''
	            };
	        },

	        created: function () {
	            this.query();
	            this.queryUpdates(this.installed, function (data) {
	                this.$set('updates', data.packages.length ? data.packages : null);
	            });
	        },

	        watch: {

	            search: function () {
	                this.query();
	            },

	            type: function () {
	                this.query();
	            },

	            page: function () {
	                this.query(this.page);
	            }

	        },

	        methods: {

	            query: function (page) {

	                var url = this.api + '/api/package/search', options = {emulateJSON: true};

	                this.$http.post(url, {q: this.search, type: this.type, page: page || 0}, function (data) {
	                    this.$set('packages', data.packages);
	                    this.$set('pages', data.pages);
	                }, options).error(function () {
	                    this.$set('packages', null);
	                    this.$set('status', 'error');
	                });
	            },

	            details: function (pkg) {

	                if (!this.modal) {
	                    this.modal = UIkit.modal(this.$$.modal);
	                }

	                this.$set('pkg', pkg);
	                this.$set('status', '');

	                this.modal.show();
	            },

	            doInstall: function (pkg) {

	                this.modal.hide();
	                this.install(pkg, this.installed);

	            },

	            isInstalled: function (pkg) {
	                return _.isObject(pkg) ? _.find(this.installed, 'name', pkg.name) : undefined;
	            }
	        }

	    };

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = "<div data-uk-observe>\n\n        <div class=\"uk-grid uk-grid-medium uk-grid-match uk-grid-width-small-1-2 uk-grid-width-xlarge-1-3\" data-uk-grid-margin>\n            <div v-repeat=\"pkg: packages\">\n                <div class=\"uk-panel uk-panel-box uk-overlay-hover\">\n\n                    <div class=\"uk-panel-teaser\">\n                        <div class=\"uk-overlay uk-display-block\">\n                            <div class=\"uk-cover-background uk-position-cover\" v-style=\"background-image: 'url('+pkg.extra.image+')'\"></div>\n                            <canvas class=\"uk-responsive-width uk-display-block\" width=\"800\" height=\"550\"></canvas>\n                            <div class=\"uk-overlay-panel uk-overlay-background pk-overlay-background uk-overlay-fade\"></div>\n                        </div>\n                    </div>\n\n                    <h2 class=\"uk-panel-title uk-margin-remove\">{{ pkg.title }}</h2>\n\n                    <p class=\"uk-text-muted uk-margin-remove\">{{ pkg.author.name }}</p>\n                    <a class=\"uk-position-cover\" v-on=\"click: details(pkg)\"></a>\n\n                </div>\n            </div>\n        </div>\n\n        <v-pagination page=\"{{@ page }}\" pages=\"{{ pages }}\" v-show=\"pages > 1\"></v-pagination>\n\n        <div class=\"uk-modal\" v-el=\"modal\">\n            <div class=\"uk-modal-dialog uk-modal-dialog-large\">\n\n                <div class=\"pk-modal-dialog-badge\">\n                    <button class=\"uk-button\" disabled v-show=\"isInstalled(pkg)\">{{ 'Installed' | trans }}</button>\n                    <button class=\"uk-button uk-button-primary\" v-on=\"click: doInstall(pkg)\" v-show=\"!isInstalled(pkg)\">{{ 'Install' | trans }}</button>\n                </div>\n\n                <div class=\"uk-modal-header\">\n                    <h2 class=\"uk-margin-small-bottom\">{{ pkg.title }}</h2>\n                    <ul class=\"uk-subnav uk-subnav-line uk-margin-bottom-remove\">\n                        <li class=\"uk-text-muted\">{{ pkg.author.name }}</li>\n                        <li class=\"uk-text-muted\">{{ 'Version %version%' | trans {version:pkg.version} }}</li>\n                    </ul>\n                </div>\n\n                <div class=\"uk-grid\">\n                    <div class=\"uk-width-medium-1-2\">\n                        <img width=\"800\" height=\"600\" alt=\"{{ pkg.title }}\" v-attr=\"src: pkg.extra.image\">\n                    </div>\n                    <div class=\"uk-width-medium-1-2\">\n                        <div>{{ pkg.description }}</div>\n\n\n                        <ul class=\"uk-list\">\n                            <li v-if=\"pkg.license\"><strong>{{ 'License:' | trans }}</strong> {{ pkg.license }}</li>\n                            <li v-if=\"pkg.author.homepage\"><strong>{{ 'Homepage:' | trans }}</strong> <a href=\"{{ pkg.author.homepage }}\" target=\"_blank\">{{ pkg.author.homepage }}</a></li>\n                            <li v-if=\"pkg.author.email\"><strong>{{ 'Email:' | trans }}</strong> <a href=\"mailto:{{ pkg.author.email }}\">{{ pkg.author.email }}</a></li>\n                        </ul>\n\n                    </div>\n                </div>\n\n            </div>\n        </div>\n\n        <h3 class=\"uk-h1 uk-text-muted uk-text-center\" v-show=\"!packages.length\">{{ 'Nothing found.' | trans }}</h3>\n\n        <p class=\"uk-alert uk-alert-warning\" v-show=\"status == 'error'\">{{ 'Cannot connect to the marketplace. Please try again later.' | trans }}</p>\n\n    </div>";

/***/ }
/******/ ]);