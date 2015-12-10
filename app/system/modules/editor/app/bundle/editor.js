var Editor =
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

	module.exports = __webpack_require__(8)
	module.exports.template = __webpack_require__(33)


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

	module.exports = {

	        props: ['type', 'value', 'options'],

	        compiled: function() {

	            this.$set('height', this.options && this.options.height ? this.options.height : 500);

	            if (this.$el.hasAttributes()) {

	                var attrs = this.$el.attributes;

	                for (var i = attrs.length - 1; i >= 0; i--) {
	                    this.$$.editor.setAttribute(attrs[i].name, attrs[i].value);
	                    this.$el.removeAttribute(attrs[i].name);
	                }

	            }

	            var components = this.$options.components, type = 'editor-'+this.type, self = this;

	            this
	                .$addChild({ el: this.$$.editor, inherit: true }, components[type] || components['editor-'+window.$pagekit.editor] || components['editor-textarea'])
	                .$on('ready', function() {

	                    _.forIn(self.$options.components, function (component) {

	                        if (component.options && component.options.plugin) {
	                            this.$addChild({ inherit: true }, component);
	                        }

	                    }, this);

	                });
	        },

	        components: {

	            'editor-textarea': {

	                ready: function() {
	                    this.$emit('ready');
	                    this.$parent.$set('show', true);
	                }

	            },
	            'editor-html': __webpack_require__(9),
	            'editor-code': __webpack_require__(10),
	            'plugin-link': __webpack_require__(11),
	            'plugin-image': __webpack_require__(18),
	            'plugin-video': __webpack_require__(25),
	            'plugin-url': __webpack_require__(32)

	        }

	    };

	    Vue.component('v-editor', function (resolve) {
	        resolve(module.exports);
	    });

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = {

	    ready: function () {

	        this.$parent.$set('height', this.$parent.height + 47);

	        this.$asset({

	            css: [
	                'app/assets/codemirror/hint.css',
	                'app/assets/codemirror/codemirror.css'
	            ],
	            js: [
	                'app/assets/codemirror/codemirror.js',
	                'app/assets/marked/marked.js',
	                'app/assets/uikit/js/components/htmleditor.min.js'
	            ]

	        }, function () {

	            this.editor = UIkit.htmleditor(this.$el, _.extend({ marked: window.marked, CodeMirror: window.CodeMirror }, this.options));

	            this.editor.element
	                .on('htmleditor-save', function (e, editor) {
	                    if (editor.element[0].form) {
	                        var event = document.createEvent('HTMLEvents');
	                        event.initEvent('submit', true, false);
	                        editor.element[0].form.dispatchEvent(event);
	                    }
	                });

	            this.$watch('value', function (value) {
	                if (value != this.editor.editor.getValue()) {
	                    this.editor.editor.setValue(value);
	                }
	            });

	            this.$watch('options.markdown', function (markdown) {
	                this.editor.trigger(markdown ? 'enableMarkdown' : 'disableMarkdown');
	            });

	            this.$emit('ready');
	        });

	    }

	};


/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = {

	    ready: function () {

	        var self = this, $el = $(this.$el), $parent = $el.parent();

	        $parent.addClass('pk-editor');

	        this.$asset({
	            css: [
	                'app/assets/codemirror/hint.css',
	                'app/assets/codemirror/codemirror.css'
	            ],
	            js: [
	                'app/assets/codemirror/codemirror.js'
	            ]

	        }, function () {

	            this.editor = CodeMirror.fromTextArea(this.$el, _.extend({
	                mode: 'htmlmixed',
	                dragDrop: false,
	                autoCloseTags: true,
	                matchTags: true,
	                autoCloseBrackets: true,
	                matchBrackets: true,
	                indentUnit: 4,
	                indentWithTabs: false,
	                tabSize: 4
	            }, this.options));

	            $parent.attr('data-uk-check-display', 'true').on('display.uk.check', function (e) {
	                self.editor.refresh();
	            });

	            this.editor.on('change', function () {
	                self.editor.save();
	                $el.trigger('input');
	            });

	            this.$watch('value', function (value) {
	                if (value != this.editor.getValue()) {
	                    this.editor.setValue(value);
	                }
	            });

	            this.$emit('ready');

	        });
	    }

	};


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Editor Link plugin.
	 */

	var Picker = Vue.extend(__webpack_require__(12));

	module.exports = {

	    plugin: true,

	    created: function () {

	        var vm = this, editor = this.editor;

	        if (!editor || !editor.htmleditor) {
	            return;
	        }

	        this.links = [];

	        editor
	            .off('action.link')
	            .on('action.link', function (e, editor) {
	                vm.openModal(_.find(vm.links, function (link) {
	                    return link.inRange(editor.getCursor());
	                }));
	            })
	            .on('render', function () {
	                var regexp = editor.getMode() != 'gfm' ? /<a(?:.+?)>(?:[^<]*)<\/a>/gi : /<a(?:.+?)>(?:[^<]*)<\/a>|(?:\[([^\n\]]*)\])(?:\(([^\n\]]*)\))?/gi;
	                vm.links = editor.replaceInPreview(regexp, vm.replaceInPreview);
	            })
	            .on('renderLate', function () {

	                while (vm.$children.length) {
	                    vm.$children[0].$destroy();
	                }

	                Vue.nextTick(function() {
	                    vm.$compile(editor.preview[0]);
	                });

	            });

	    },

	    methods: {

	        openModal: function (link) {

	            var editor = this.editor, cursor = editor.editor.getCursor();

	            if (!link) {
	                link = {
	                    replace: function (value) {
	                        editor.editor.replaceRange(value, cursor);
	                    }
	                };
	            }

	            this.$addChild({
	                    data: {
	                        link: link
	                    }
	                }, Picker)
	                .$mount()
	                .$appendTo('body')
	                .$on('select', function (link) {

	                    link.replace(this.$interpolate(
	                        (link.tag || editor.getCursorMode()) == 'html' ?
	                            (link.outerHTML ? link.outerHTML : '<a href="{{ link.link }}">{{ link.txt }}</a>')
	                            : '[{{ link.txt }}]({{ link.link }})'
	                        )
	                    );
	                });
	        },

	        replaceInPreview: function (data, index) {

	            if (data.matches[0][0] == '<') {

	                var anchor = $(data.matches[0]);

	                data.link      = anchor.attr('href');
	                data.txt       = anchor.html();
	                data.class     = anchor.attr('class') || '';

	                data.outerHTML = anchor.attr('href', '{{ link.link }}').text('{{ link.txt }}')[0].outerHTML;

	            } else {

	                if (data.matches[data.matches.length - 1][data.matches[data.matches.length - 2] - 1] == '!') return false;

	                data.link    = data.matches[2];
	                data.txt     = data.matches[1];
	                data.class   = '';

	            }

	            return '<link-preview index="'+index+'"></link-preview>';
	        }

	    },

	    components: {

	        'link-preview': __webpack_require__(15)

	    }

	};


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(13)
	module.exports.template = __webpack_require__(14)


/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = {

	        data: function () {
	            return {
	                link: {link: '', txt: '', class: ''}
	            }
	        },

	        ready: function () {
	            this.$.modal.open();
	        },

	        methods: {

	            close: function() {
	                this.$destroy(true);
	            },

	            update: function (e) {
	                e.preventDefault();
	                this.$.modal.close();
	                this.$emit('select', this.link);
	            }

	        }

	    };

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = "<div>\n        <v-modal v-ref=\"modal\" closed=\"{{ close }}\">\n            <form class=\"uk-form uk-form-stacked\" v-on=\"submit: update\">\n\n                <div class=\"uk-modal-header\">\n                    <h2>{{ 'Add Link' | trans }}</h2>\n                </div>\n\n                <div class=\"uk-form-row\">\n                    <label for=\"form-link-title\" class=\"uk-form-label\">{{ 'Title' | trans }}</label>\n                    <div class=\"uk-form-controls\">\n                        <input id=\"form-link-title\" class=\"uk-width-1-1\" type=\"text\" v-model=\"link.txt\">\n                    </div>\n                </div>\n\n                <div class=\"uk-form-row\">\n                    <label for=\"form-link-url\" class=\"uk-form-label\">{{ 'Url' | trans }}</label>\n                    <div class=\"uk-form-controls\">\n                        <input-link id=\"form-link-url\" class=\"uk-width-1-1\" link=\"{{@ link.link}}\"></input-link>\n                    </div>\n                </div>\n\n                <div class=\"uk-modal-footer uk-text-right\">\n                    <button class=\"uk-button uk-button-link uk-modal-close\" type=\"button\">{{ 'Cancel' | trans }}</button>\n                    <button class=\"uk-button uk-button-link\" type=\"submit\">{{ 'Update' | trans }}</button>\n                </div>\n\n            </form>\n        </v-modal>\n    </div>";

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(16)
	module.exports.template = __webpack_require__(17)


/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = {

	        props: ['index'],

	        computed: {

	            link: function() {
	                return this.$parent.links[this.index] || {};
	            }

	        },

	        methods: {

	            config: function(e) {
	                e.preventDefault();
	                this.$parent.openModal(this.link);
	            }

	        }

	    };

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = "<a class=\"{{ link.class }}\" href=\"{{ link.link }}\" v-on=\"click: config\">{{{ link.txt ? link.txt : 'Select Link' | trans }}} <span class=\"pk-icon-link pk-icon-hover\"></span></a>";

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Editor Image plugin.
	 */

	var Picker = Vue.extend(__webpack_require__(19));

	module.exports = {

	    plugin: true,

	    created: function () {

	        var vm = this, editor = this.editor;

	        if (!editor || !editor.htmleditor) {
	            return;
	        }

	        this.images = [];

	        editor
	            .off('action.image')
	            .on('action.image', function (e, editor) {
	                vm.openModal(_.find(vm.images, function (img) {
	                    return img.inRange(editor.getCursor());
	                }));
	            })
	            .on('render', function () {
	                var regexp = editor.getMode() != 'gfm' ? /<img(.+?)>/gi : /(?:<img(.+?)>|!(?:\[([^\n\]]*)])(?:\(([^\n\]]*?)\))?)/gi;
	                vm.images = editor.replaceInPreview(regexp, vm.replaceInPreview);
	            })
	            .on('renderLate', function () {

	                while (vm.$children.length) {
	                    vm.$children[0].$destroy();
	                }

	                Vue.nextTick(function() {
	                    vm.$compile(editor.preview[0]);
	                });
	            });

	    },

	    methods: {

	        openModal: function (image) {

	            var editor = this.editor, cursor = editor.editor.getCursor();

	            if (!image) {
	                image = {
	                    replace: function (value) {
	                        editor.editor.replaceRange(value, cursor);
	                    }
	                };
	            }

	            this.$addChild({
	                    data: {
	                        image: image
	                    }
	                }, Picker)
	                .$mount()
	                .$appendTo('body')
	                .$on('select', function (image) {
	                    image.replace(this.$interpolate(
	                        (image.tag || editor.getCursorMode()) == 'html' ?
	                            '<img src="{{ image.src }}" alt="{{ image.alt }}">'
	                            : '![{{ image.alt }}]({{ image.src }})'
	                        )
	                    );
	                });
	        },

	        replaceInPreview: function (data, index) {

	            if (data.matches[0][0] == '<') {
	                data.src = data.matches[0].match(/src="(.*?)"/)[1];
	                data.alt = data.matches[0].match(/alt="(.*?)"/)[1];
	                data.tag = 'html';
	            } else {
	                data.src = data.matches[3];
	                data.alt = data.matches[2];
	                data.tag = 'gfm';
	            }

	            return '<image-preview index="'+index+'"></image-preview>';
	        }

	    },

	    components: {

	        'image-preview': __webpack_require__(22)

	    }

	};


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(20)
	module.exports.template = __webpack_require__(21)


/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = {

	        data: function () {
	            return {
	                image: {src: '', alt: ''}
	            }
	        },

	        ready: function () {

	            this.$.modal.open();

	            this.$on('image-selected', function(path) {

	                if (path && !this.image.alt) {

	                    var alt   = path.split('/').slice(-1)[0].replace(/\.(jpeg|jpg|png|svg|gif)$/i, '').replace(/(_|-)/g, ' ').trim(),
	                        first = alt.charAt(0).toUpperCase();

	                    this.image.alt = first + alt.substr(1);
	                }
	            })
	        },

	        methods: {

	            close: function() {
	                this.$destroy(true);
	            },

	            update: function (e) {

	                e.preventDefault();

	                this.$.modal.close();
	                this.$emit('select', this.image);
	            }

	        }

	    };

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = "<div>\n        <v-modal v-ref=\"modal\" closed=\"{{ close }}\">\n            <form class=\"uk-form uk-form-stacked\" v-on=\"submit: update\">\n\n                <div class=\"uk-modal-header\">\n                    <h2>{{ 'Add Image' | trans }}</h2>\n                </div>\n\n                <div class=\"uk-form-row\">\n                    <input-image source=\"{{@ image.src }}\"></input-image>\n                </div>\n\n                <div class=\"uk-form-row\">\n                    <label for=\"form-src\" class=\"uk-form-label\">{{ 'URL' | trans }}</label>\n                    <div class=\"uk-form-controls\">\n                        <input id=\"form-src\" class=\"uk-width-1-1\" type=\"text\" v-model=\"image.src\" lazy>\n                    </div>\n                </div>\n\n                <div class=\"uk-form-row\">\n                    <label for=\"form-alt\" class=\"uk-form-label\">{{ 'Alt' | trans }}</label>\n                    <div class=\"uk-form-controls\">\n                        <input id=\"form-alt\" class=\"uk-width-1-1\" type=\"text\" v-model=\"image.alt\">\n                    </div>\n                </div>\n\n                <div class=\"uk-modal-footer uk-text-right\">\n                    <button class=\"uk-button uk-button-link uk-modal-close\" type=\"button\">{{ 'Cancel' | trans }}</button>\n                    <button class=\"uk-button uk-button-link\" type=\"submit\">{{ 'Update' | trans }}</button>\n                </div>\n\n            </form>\n        </v-modal>\n    </div>";

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(23)
	module.exports.template = __webpack_require__(24)


/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = {

	        props: ['index'],

	        computed: {

	            image: function() {
	                return this.$parent.images[this.index] || {};
	            }

	        },

	        methods: {

	            config: function() {
	                this.$parent.openModal(this.image);
	            },

	            remove: function() {
	                this.image.replace('');
	            }

	        }

	    };

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = "<div class=\"uk-panel uk-placeholder uk-placeholder-large uk-text-center uk-visible-hover\" v-if=\"!image.src\">\n\n        <img width=\"60\" height=\"60\" alt=\"{{ 'Placeholder Image' | trans }}\" v-attr=\"src: $url('app/system/assets/images/placeholder-image.svg')\">\n        <p class=\"uk-text-muted uk-margin-small-top\">{{ 'Add Image' | trans }}</p>\n\n        <a class=\"uk-position-cover\" v-on=\"click: config()\"></a>\n\n        <div class=\"uk-panel-badge pk-panel-badge uk-hidden\">\n            <ul class=\"uk-subnav pk-subnav-icon\">\n                <li><a class=\"pk-icon-delete pk-icon-hover\" title=\"{{ 'Delete' | trans }}\" data-uk-tooltip=\"{delay: 500}\" v-on=\"click: remove()\"></a></li>\n            </ul>\n        </div>\n\n    </div>\n\n    <div class=\"uk-overlay uk-overlay-hover uk-visible-hover\" v-if=\"image.src\">\n\n        <img v-attr=\"src: $url(image.src), alt: image.alt\">\n\n        <div class=\"uk-overlay-panel uk-overlay-background uk-overlay-fade\"></div>\n\n        <a class=\"uk-position-cover\" v-on=\"click: config()\"></a>\n\n        <div class=\"uk-panel-badge pk-panel-badge uk-hidden\">\n            <ul class=\"uk-subnav pk-subnav-icon\">\n                <li><a class=\"pk-icon-delete pk-icon-hover\" title=\"{{ 'Delete' | trans }}\" data-uk-tooltip=\"{delay: 500}\" v-on=\"click: remove()\"></a></li>\n            </ul>\n        </div>\n\n    </div>";

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Editor Video plugin.
	 */

	var Picker = Vue.extend(__webpack_require__(26));

	module.exports = {

	    plugin: true,

	    created: function () {

	        var vm = this, editor = this.editor;

	        if (!editor || !editor.htmleditor) {
	            return;
	        }

	        this.videos = [];

	        editor.addButton('video', {
	            title: 'Video',
	            label: '<i class="uk-icon-video-camera"></i>'
	        });

	        editor.options.toolbar.push('video');

	        editor
	            .on('action.video', function(e, editor) {
	                vm.openModal(_.find(vm.videos, function(vid) {
	                    return vid.inRange(editor.getCursor());
	                }));
	            })
	            .on('render', function() {
	                vm.videos = editor.replaceInPreview(/\(video\)(\{.+?})/gi, vm.replaceInPreview);
	            })
	            .on('renderLate', function () {

	                while (vm.$children.length) {
	                    vm.$children[0].$destroy();
	                }

	                Vue.nextTick(function() {
	                    vm.$compile(editor.preview[0]);
	                });

	            });


	        editor.debouncedRedraw();
	    },

	    methods: {

	        openModal: function(video) {

	            var editor = this.editor, cursor = editor.editor.getCursor();

	            if (!video) {
	                video = {
	                    replace: function (value) {
	                        editor.editor.replaceRange(value, cursor);
	                    }
	                };
	            }

	            this
	                .$addChild({
	                    data: {
	                        video: video
	                    }
	                }, Picker)
	                .$mount()
	                .$appendTo('body')
	                .$on('select', function (video) {
	                    video.replace('(video)' + JSON.stringify({src: video.src}));
	                });
	        },

	        replaceInPreview: function(data, index) {

	            var settings;

	            try {

	                settings = JSON.parse(data.matches[1]);

	            } catch (e) {}

	            _.merge(data, settings || { src: '' });

	            return '<video-preview index="'+index+'"></video-preview>';
	        }

	    },

	    components: {

	        'video-preview': __webpack_require__(29)

	    }

	};


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(27)
	module.exports.template = __webpack_require__(28)


/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = {

	        data: function () {
	            return {
	                video: {src: '', alt: ''}
	            }
	        },

	        ready: function () {
	            this.$.modal.open();
	        },

	        methods: {

	            close: function() {
	                this.$destroy(true);
	            },

	            update: function (e) {
	                e.preventDefault();
	                this.$.modal.close();
	                this.$emit('select', this.video);
	            }

	        }

	    };

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = "<div>\n        <v-modal v-ref=\"modal\" closed=\"{{ close }}\">\n            <form class=\"uk-form uk-form-stacked\" v-on=\"submit: update\">\n\n                <div class=\"uk-modal-header\">\n                    <h2>{{ 'Add Video' | trans }}</h2>\n                </div>\n\n                <div class=\"uk-form-row\">\n                    <input-video source=\"{{@ video.src }}\"></input-video>\n                </div>\n\n                <div class=\"uk-form-row\">\n                    <label for=\"form-src\" class=\"uk-form-label\">{{ 'URL' | trans }}</label>\n                    <div class=\"uk-form-controls\">\n                        <input class=\"uk-width-1-1\" type=\"text\" placeholder=\"{{ 'URL' | trans }}\" v-model=\"video.src\" lazy>\n                    </div>\n                </div>\n\n                <div class=\"uk-modal-footer uk-text-right\">\n                    <button class=\"uk-button uk-button-link uk-modal-close\" type=\"button\">{{ 'Cancel' | trans }}</button>\n                    <button class=\"uk-button uk-button-link\" type=\"submit\">{{ 'Update' | trans }}</button>\n                </div>\n\n            </form>\n\n        </v-modal>\n    </div>";

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(30)
	module.exports.template = __webpack_require__(31)


/***/ },
/* 30 */
/***/ function(module, exports) {

	module.exports = {

	        props: ['index'],

	        data: function() {
	            return {imageSrc: undefined, videoSrc: undefined};
	        },

	        watch: {
	            'video.src': {
	                handler: 'update',
	                immediate: true
	            }
	        },

	        computed: {

	            video: function() {
	                return this.$parent.videos[this.index] || {};
	            }

	        },

	        methods: {

	            config: function() {
	                this.$parent.openModal(this.video);
	            },

	            remove: function() {
	                this.video.replace('');
	            },

	            update: function (src) {

	                var matches;

	                this.$set('imageSrc', undefined);
	                this.$set('videoSrc', undefined);

	                if (matches = (src.match(/(?:\/\/.*?youtube\.[a-z]+)\/watch\?v=([^&]+)&?(.*)/) || src.match(/youtu\.be\/(.*)/))) {

	                    this.imageSrc = '//img.youtube.com/vi/' + matches[1] + '/hqdefault.jpg';

	                } else if (src.match(/(\/\/.*?)vimeo\.[a-z]+\/([0-9]+).*?/)) {

	                    var id = btoa(src);

	                    if (this.$session[id]) {

	                        this.imageSrc = this.$session[id];

	                    } else {

	                        this.$http.get('http://vimeo.com/api/oembed.json', {url: src}, function (data) {

	                            this.imageSrc = this.$session[id] = data.thumbnail_url;

	                        });

	                    }

	                } else {

	                    this.videoSrc = this.$url(src);

	                }

	            }

	        }

	    };

/***/ },
/* 31 */
/***/ function(module, exports) {

	module.exports = "<div class=\"uk-panel uk-placeholder uk-placeholder-large uk-text-center uk-visible-hover\" v-if=\"!video.src\">\n\n        <img width=\"60\" height=\"60\" alt=\"{{ 'Placeholder Video' | trans }}\" v-attr=\"src: $url('app/system/assets/images/placeholder-video.svg')\">\n        <p class=\"uk-text-muted uk-margin-small-top\">{{ 'Add Video' | trans }}</p>\n\n        <a class=\"uk-position-cover\" v-on=\"click: config()\"></a>\n\n        <div class=\"uk-panel-badge pk-panel-badge uk-hidden\">\n            <ul class=\"uk-subnav pk-subnav-icon\">\n                <li><a class=\"pk-icon-delete pk-icon-hover\" title=\"{{ 'Delete' | trans }}\" data-uk-tooltip=\"{delay: 500}\" v-on=\"click: remove()\"></a></li>\n            </ul>\n        </div>\n\n    </div>\n\n    <div class=\"uk-overlay uk-overlay-hover uk-visible-hover\" v-if=\"video.src\">\n\n        <img class=\"uk-width-1-1\" v-attr=\"src: imageSrc\" v-if=\"imageSrc\">\n        <video class=\"uk-width-1-1\" v-attr=\"src: videoSrc\" v-if=\"videoSrc\"></video>\n\n        <div class=\"uk-overlay-panel uk-overlay-background uk-overlay-fade\"></div>\n\n        <a class=\"uk-position-cover\" v-on=\"click: config()\"></a>\n\n        <div class=\"uk-panel-badge pk-panel-badge uk-hidden\">\n            <ul class=\"uk-subnav pk-subnav-icon\">\n                <li><a class=\"pk-icon-delete pk-icon-hover\" title=\"{{ 'Delete' | trans }}\" data-uk-tooltip=\"{delay: 500}\" v-on=\"click: remove()\"></a></li>\n            </ul>\n        </div>\n\n    </div>";

/***/ },
/* 32 */
/***/ function(module, exports) {

	/**
	 * URL resolver plugin
	 */

	module.exports = {

	    plugin: true,

	    created: function () {

	        var editor = this.editor;

	        if (!editor || !editor.htmleditor) {
	            return;
	        }

	        editor.element.on('renderLate', function () {

	            editor.replaceInPreview(/src=["'](.+?)["']/gi, function (data) {

	                var replacement = data.matches[0];

	                if (!data.matches[1].match(/^(\/|http:|https:|ftp:)/i)) {
	                    replacement = replacement.replace(data.matches[1], Vue.url(data.matches[1], true));
	                }

	                return replacement;
	            });

	        });

	    }

	};


/***/ },
/* 33 */
/***/ function(module, exports) {

	module.exports = "<div>\n        <textarea autocomplete=\"off\" v-style=\"height: height + 'px'\" v-class=\"uk-invisible: !show\" v-el=\"editor\" v-model=\"value\"></textarea>\n    </div>";

/***/ }
/******/ ]);