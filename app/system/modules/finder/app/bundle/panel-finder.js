var Finder =
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

	module.exports = __webpack_require__(2)
	module.exports.template = __webpack_require__(5)


/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {

	        replace : true,

	        props: ['root', 'path', 'mode', 'view', 'modal'],

	        data: function () {
	            return {
	                root: '/',
	                path: '/',
	                mode: 'write',
	                view: 'table',
	                upload: {},
	                selected: [],
	                items: false
	            };
	        },

	        ready: function () {

	            this.resource = this.$resource('system/finder/:cmd');

	            this.load().success(function () {
	                this.$dispatch('ready.finder', this);
	            });

	            UIkit.init(this.$el);
	        },

	        watch: {

	            path: function () {
	                this.load();
	            },

	            selected: function () {
	                this.$dispatch('select.finder', this.getSelected(), this)
	            }

	        },

	        filters: {

	            searched: function (files) {
	                return files.filter(function (file) {
	                    return !this.search || file.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1;
	                }, this);
	            }

	        },

	        computed: {

	            breadcrumbs: function () {

	                var path = '',
	                    crumbs = [{path: '/', title: this.$trans('Home')}]
	                        .concat(this.path.substr(1).split('/')
	                            .filter(function (str) {
	                                return str.length;
	                            })
	                            .map(function (part) {
	                                return { path: path += '/' + part, title: part };
	                            })
	                    );

	                crumbs[crumbs.length - 1].current = true;

	                return crumbs;
	            },

	            hasItems: function() {
	                return this.$options.filters.searched(this.items || []).length;
	            },

	            count: function() {
	                return this.items ? this.items.length : 0;
	            },

	            folders: function () {
	                return _.filter(this.items, 'mime', 'application/folder');
	            },

	            files: function () {
	                return _.filter(this.items, 'mime', 'application/file');
	            }

	        },

	        methods: {

	            /**
	             * API
	             */

	            setPath: function (path) {
	                this.$set('path', path);
	            },

	            getPath: function () {
	                return this.path;
	            },

	            getFullPath: function () {
	                return this.getRoot()+'/'+this.path.replace(/^\/+|\/+$/g, '')+'/';
	            },

	            getRoot: function() {
	                return this.root.replace(/^\/+|\/+$/g, '')
	            },

	            getSelected: function () {
	                return this.selected.map(function (name) {
	                    return _.find(this.items, 'name', name).url;
	                }, this);
	            },

	            removeSelection: function() {
	                this.selected = [];
	            },

	            toggleSelect: function (name) {

	                if (name.targetVM) {
	                    if (name.target.tagName == 'INPUT' || name.target.tagName == 'A') {
	                        return;
	                    }
	                    name = name.targetVM.$data.name;
	                }

	                var index = this.selected.indexOf(name);

	                -1 === index ? this.selected.push(name) : this.selected.splice(index, 1);
	            },

	            isSelected: function (name) {
	                return this.selected.indexOf(name.toString()) != -1;
	            },

	            createFolder: function () {

	                UIkit.modal.prompt(this.$trans('Folder Name'), '', function(name){

	                    if (!name) return;

	                    this.command('createfolder', { name: name });

	                }.bind(this));
	            },

	            rename: function (oldname) {

	                if (oldname.target) {
	                    oldname = this.selected[0];
	                }

	                if (!oldname) return;

	                UIkit.modal.prompt(this.$trans('Name'), oldname, function(newname){

	                    if (!newname) return;

	                    this.command('rename', { oldname: oldname, newname: newname });

	                }.bind(this), {title: this.$trans('Rename')});
	            },

	            remove: function (names) {

	                if (names.target) {
	                    names = this.selected;
	                }

	                if (names) {
	                    this.command('removefiles', { names: names });
	                }
	            },

	            /**
	             * Helper functions
	             */

	            encodeURI: function (url) {
	                return encodeURI(url).replace(/'/g, '%27');
	            },

	            isWritable: function () {
	                return this.mode === 'w' || this.mode === 'write';
	            },

	            isImage: function (url) {
	                return url.match(/\.(?:gif|jpe?g|png|svg|ico)$/i);
	            },

	            isVideo: function (url) {
	                return url.match(/\.(mpeg|ogv|mp4|webm|wmv)$/i);
	            },

	            command: function (cmd, params) {

	                return this.resource.save({cmd: cmd}, $.extend({path: this.path, root: this.getRoot()}, params), function (data) {

	                    this.load();
	                    this.$notify(data.message, data.error ? 'danger' : '');

	                }).error(function (data, status) {

	                    this.$notify(status == 500 ? 'Unknown error.' : data, 'danger');
	                });
	            },

	            load: function () {

	                return this.resource.get({path: this.path, root: this.getRoot()}, function (data) {

	                    this.$set('items', data.items || []);
	                    this.$set('selected', []);
	                    this.$dispatch('path.finder', this.getFullPath(), this);

	                }).error(function() {

	                    this.$notify('Unable to access directory.', 'danger');

	                });
	            }

	        },

	        events: {

	            /**
	             * Init upload
	             */

	            'hook:ready': function () {

	                var finder = this,
	                    settings = {

	                        action: this.$url.route('system/finder/upload'),

	                        before: function (options) {
	                            $.extend(options.params, { path: finder.path, root: finder.getRoot(), _csrf: $pagekit.csrf });
	                        },

	                        loadstart: function () {
	                            finder.$set('upload.running', true);
	                            finder.$set('upload.progress', 0);
	                        },

	                        progress: function (percent) {
	                            finder.$set('upload.progress', Math.ceil(percent));
	                        },

	                        allcomplete: function (response) {

	                            var data = $.parseJSON(response);

	                            finder.load();

	                            finder.$notify(data.message, data.error ? 'danger' : '');

	                            finder.$set('upload.progress', 100);

	                            setTimeout(function () {
	                                finder.$set('upload.running', false);
	                            }, 1500);
	                        }

	                    };

	                UIkit.uploadSelect(this.$el.querySelector('.uk-form-file > input'), settings);
	                UIkit.uploadDrop($(this.$el).parents('.uk-modal').length ? this.$el: $('html'), settings);
	            }

	        },

	        partials: {

	            table: __webpack_require__(3),
	            thumbnail: __webpack_require__(4)

	        }

	    };

	    Vue.component('panel-finder', function (resolve) {
	        resolve(module.exports);
	    });

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = "<table class=\"uk-table uk-table-hover uk-table-middle\">\n    <thead>\n        <th class=\"pk-table-width-minimum\"><input type=\"checkbox\" v-check-all=\"selected: input[name=name]\"></th>\n        <th colspan=\"2\">{{ 'Name' | trans }}</th>\n        <th class=\"pk-table-width-minimum uk-text-center\">{{ 'Size' | trans }}</th>\n        <th class=\"pk-table-width-minimum\">{{ 'Modified' | trans }}</th>\n    </thead>\n    <tbody>\n\n        <tr v-repeat=\"folders | searched\" class=\"uk-visible-hover\" v-class=\"uk-active: isSelected(name)\" v-on=\"click: toggleSelect\">\n            <td><input type=\"checkbox\" name=\"name\" value=\"{{ name }}\" v-checkbox=\"selected\"></td>\n            <td class=\"pk-table-width-minimum\">\n                <i class=\"pk-icon-folder-circle\"></i>\n            </td>\n            <td class=\"pk-table-text-break pk-table-min-width-200\"><a v-on=\"click: setPath(path)\">{{ name }}</a></td>\n            <td></td>\n            <td></td>\n        </tr>\n\n        <tr v-repeat=\"files | searched\" class=\"uk-visible-hover\" v-class=\"uk-active: isSelected(name)\" v-on=\"click: toggleSelect\">\n            <td><input type=\"checkbox\" name=\"name\" value=\"{{ name }}\" v-checkbox=\"selected\"></td>\n            <td class=\"pk-table-width-minimum\">\n                <i v-if=\"isImage(url)\" class=\"pk-icon-contain\" v-lazy-background=\"$url(url)\"></i>\n                <i v-if=\"!isImage(url)\" class=\"pk-icon-file-circle\"></i>\n            </td>\n            <td class=\"pk-table-text-break pk-table-min-width-200\">{{ name }}</td>\n            <td class=\"uk-text-right uk-text-nowrap\">{{ size }}</td>\n            <td class=\"uk-text-nowrap\">{{ lastmodified | relativeDate }}</td>\n        </tr>\n\n    </tbody>\n</table>\n";

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = "<ul v-if=\"items.length\" class=\"uk-grid uk-grid-medium uk-grid-match uk-grid-width-small-1-2 uk-grid-width-large-1-3 uk-grid-width-xlarge-1-4\" data-uk-grid-margin>\n\n    <li v-repeat=\"folders | searched\">\n        <div class=\"uk-panel uk-panel-box uk-text-center\" v-on=\"click: toggleSelect\">\n            <div class=\"uk-panel-teaser uk-position-relative\">\n                <div class=\"uk-cover-background uk-position-cover pk-thumbnail-folder\"></div>\n                <canvas class=\"uk-responsive-width uk-display-block\" width=\"800\" height=\"550\"></canvas>\n            </div>\n            <div class=\"uk-text-truncate\">\n                <input type=\"checkbox\" value=\"{{ name }}\" v-checkbox=\"selected\">\n                <a v-on=\"click: setPath(path, $event)\">{{ name }}</a>\n            </div>\n        </div>\n    </li>\n\n    <li v-repeat=\"files | searched\">\n        <div class=\"uk-panel uk-panel-box uk-text-center\" v-on=\"click: toggleSelect\">\n            <div class=\"uk-panel-teaser uk-position-relative\">\n                <div class=\"pk-background-contain uk-position-cover\" v-if=\"isImage(path)\" v-lazy-background=\"$url(url)\"></div>\n                <div class=\"uk-cover-background uk-position-cover pk-thumbnail-file\" v-if=\"!isImage(path)\"></div>\n                <canvas class=\"uk-responsive-width uk-display-block\" width=\"800\" height=\"550\"></canvas>\n            </div>\n            <div class=\"uk-text-nowrap uk-text-truncate\">\n                <input type=\"checkbox\" value=\"{{ name }}\" v-checkbox=\"selected\">\n                {{ name }}\n            </div>\n        </div>\n    </li>\n\n</ul>\n";

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = "<div class=\"uk-form\" data-uk-observe v-show=\"items\">\n\n        <div class=\"uk-margin uk-flex uk-flex-space-between uk-flex-wrap\" data-uk-margin>\n            <div class=\"uk-flex uk-flex-middle uk-flex-wrap\" data-uk-margin>\n\n                <h2 class=\"uk-margin-remove\" v-show=\"!selected.length\">{{ '{0} %count% Files|{1} %count% File|]1,Inf[ %count% Files' | transChoice count {count:count} }}</h2>\n                <h2 class=\"uk-margin-remove\" v-show=\"selected.length\">{{ '{1} %count% File selected|]1,Inf[ %count% Files selected' | transChoice selected.length {count:selected.length} }}</h2>\n\n                <div class=\"uk-margin-left\" v-if=\"isWritable\" v-show=\"selected.length\">\n                    <ul class=\"uk-subnav pk-subnav-icon\">\n                        <li v-show=\"selected.length === 1\"><a class=\"pk-icon-edit pk-icon-hover\" title=\"{{ 'Rename' | trans 'domain' 'asdf' 'asdf2' }}\" data-uk-tooltip=\"{delay: 500}\" v-on=\"click: rename\"></a></li>\n                        <li><a class=\"pk-icon-delete pk-icon-hover\" title=\"{{ 'Delete' | trans }}\" data-uk-tooltip=\"{delay: 500}\" v-on=\"click: remove\" v-confirm=\"'Delete files?'\"></a></li>\n                    </ul>\n                </div>\n\n                <div class=\"pk-search\">\n                    <div class=\"uk-search\">\n                        <input class=\"uk-search-field\" type=\"text\" v-model=\"search\">\n                    </div>\n                </div>\n\n            </div>\n            <div class=\"uk-flex uk-flex-middle uk-flex-wrap\" data-uk-margin>\n\n                <div class=\"uk-margin-right\">\n                    <ul class=\"uk-subnav pk-subnav-icon\">\n                        <li v-class=\"'uk-active': view == 'table'\">\n                            <a class=\"pk-icon-table pk-icon-hover\" title=\"{{ 'Table View' | trans }}\" data-uk-tooltip=\"{delay: 500}\" v-on=\"click: view = 'table'\"></a>\n                        </li>\n                        <li v-class=\"'uk-active': view == 'thumbnail'\">\n                            <a class=\"pk-icon-thumbnails pk-icon-hover\" title=\"{{ 'Thumbnails View' | trans }}\" data-uk-tooltip=\"{delay: 500}\" v-on=\"click: view = 'thumbnail'\"></a>\n                        </li>\n                    </ul>\n                </div>\n\n                <div>\n                    <button class=\"uk-button uk-margin-small-right\" v-on=\"click: createFolder()\">{{ 'Add Folder' | trans }}</button>\n                    <span class=\"uk-button uk-form-file\" v-class=\"uk-button-primary: !modal\">\n                        {{ 'Upload' | trans }}\n                        <input type=\"file\" name=\"files[]\" multiple=\"multiple\">\n                    </span>\n                </div>\n\n            </div>\n        </div>\n\n        <ul class=\"uk-breadcrumb uk-margin-large-top\">\n            <li v-repeat=\"breadcrumbs\" v-class=\"'uk-active': current\">\n                <span v-show=\"current\">{{ title }}</span>\n                <a v-show=\"!current\" v-on=\"click: setPath(path)\">{{ title }}</a>\n            </li>\n        </ul>\n\n        <div class=\"uk-progress uk-progress-mini uk-margin-remove\" v-show=\"upload.running\">\n            <div class=\"uk-progress-bar\" v-style=\"width: upload.progress + '%'\"></div>\n        </div>\n\n        <div class=\"uk-overflow-container tm-overflow-container\">\n            <partial name=\"{{ view }}\"></partial>\n            <h3 class=\"uk-h1 uk-text-muted uk-text-center\" v-show=\"!hasItems\">{{ 'No files found.' | trans }}</h3>\n        </div>\n\n    </div>";

/***/ }
/******/ ]);