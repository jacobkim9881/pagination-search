(function(f) {
    if (typeof exports === "object" && typeof module !== "undefined") { module.exports = f() } else if (typeof define === "function" && define.amd) { define([], f) } else {
        var g;
        if (typeof window !== "undefined") { g = window } else if (typeof global !== "undefined") { g = global } else if (typeof self !== "undefined") { g = self } else { g = this }
        g.Pjax = f()
    }
})(function() {
    var define, module, exports;
    return (function e(t, n, r) {
        function s(o, u) {
            if (!n[o]) {
                if (!t[o]) { var a = typeof require == "function" && require; if (!u && a) return a(o, !0); if (i) return i(o, !0); var f = new Error("Cannot find module '" + o + "'"); throw f.code = "MODULE_NOT_FOUND", f }
                var l = n[o] = { exports: {} };
                t[o][0].call(l.exports, function(e) { var n = t[o][1][e]; return s(n ? n : e) }, l, l.exports, e, t, n, r)
            }
            return n[o].exports
        }
        var i = typeof require == "function" && require;
        for (var o = 0; o < r.length; o++) s(r[o]);
        return s
    })({
        1: [function(require, module, exports) {
            var clone = require('./lib/clone.js')
            var executeScripts = require('./lib/execute-scripts.js')

            var forEachEls = require("./lib/foreach-els.js")

            var newUid = require("./lib/uniqueid.js")

            var on = require("./lib/events/on.js")
                // var off = require("./lib/events/on.js")
            var trigger = require("./lib/events/trigger.js")
            function fire(type, options, data) {
                let props = {}
                props.relatedTarget = options.target
                props.relatedData = data;
                var event = $.Event(type, props)
                $(document).trigger(event, [])
                return !event.isDefaultPrevented()
            }

            var Pjax = function(options) {
                this.firstrun = true

                var parseOptions = require("./lib/proto/parse-options.js");
                parseOptions.apply(this, [options])
                this.log("Pjax options", this.options)

                this.maxUid = this.lastUid = newUid()

                this.parseDOM(document)

                on(window, "popstate", function(st) {
                    if (st.state) {
                        var opt = clone(this.options)
                        opt.url = st.state.url
                        opt.title = st.state.title
                        opt.history = false
                        opt.requestOptions = {};
                        if (st.state.uid < this.lastUid) {
                            opt.backward = true
                        } else {
                            opt.forward = true
                        }
                        this.lastUid = st.state.uid

                        // @todo implement history cache here, based on uid
                        this.loadUrl(st.state.url, opt)
                    }
                }.bind(this))
            }

            Pjax.prototype = {
                log: require("./lib/proto/log.js"),

                getElements: require("./lib/proto/get-elements.js"),

                parseDOM: require("./lib/proto/parse-dom.js"),

                refresh: require("./lib/proto/refresh.js"),

                reload: require("./lib/reload.js"),

                attachLink: require("./lib/proto/attach-link.js"),

                attachForm: require("./lib/proto/attach-form.js"),

                switches: require("./lib/switches.js"),

                forEachSelectors: function(cb, context, DOMcontext) {
                    return require("./lib/foreach-selectors.js").bind(this)(this.options.selectors, cb, context, DOMcontext)
                },

                switchSelectors: function(selectors, fromEl, toEl, options) {
                    return require("./lib/switches-selectors.js").bind(this)(this.options.switches, this.options.switchesOptions, selectors, fromEl, toEl, options)
                },

                // too much problem with the code below
                // + it???s too dangerous
                //   switchFallback: function(fromEl, toEl) {
                //     this.switchSelectors(["head", "body"], fromEl, toEl)
                //     // execute script when DOM is like it should be
                //     Pjax.executeScripts(document.querySelector("head"))
                //     Pjax.executeScripts(document.querySelector("body"))
                //   }

                latestChance: function(href) {
                    window.location = href
                },

                onSwitch: function() {
                    trigger(window, "resize scroll")
                },

                loadContent: function(html, options) {
                    var tmpEl = document.implementation.createHTMLDocument("pjax")

                    // parse HTML attributes to copy them
                    // since we are forced to use documentElement.innerHTML (outerHTML can't be used for <html>)
                    var htmlRegex = /<html[^>]+>/gi
                    var htmlAttribsRegex = /\s?[a-z:]+(?:\=(?:\'|\")[^\'\">]+(?:\'|\"))*/gi
                    var matches = html.match(htmlRegex)
                    if (matches && matches.length) {
                        matches = matches[0].match(htmlAttribsRegex)
                        if (matches.length) {
                            matches.shift()
                            matches.forEach(function(htmlAttrib) {
                                var attr = htmlAttrib.trim().split("=")
                                if (attr.length === 1) {
                                    tmpEl.documentElement.setAttribute(attr[0], true)
                                } else {
                                    tmpEl.documentElement.setAttribute(attr[0], attr[1].slice(1, -1))
                                }
                            })
                        }
                    }

                    tmpEl.documentElement.innerHTML = html
                    this.log("load content", tmpEl.documentElement.attributes, tmpEl.documentElement.innerHTML.length)

                    // Clear out any focused controls before inserting new page contents.
                    // we clear focus on non form elements
                    if (document.activeElement && !document.activeElement.value) {
                        try {
                            document.activeElement.blur()
                        } catch (e) {}
                    }

                    // try {
                    this.switchSelectors(this.options.selectors, tmpEl, document, options)

                    // FF bug: Won???t autofocus fields that are inserted via JS.
                    // This behavior is incorrect. So if theres no current focus, autofocus
                    // the last field.
                    //
                    // http://www.w3.org/html/wg/drafts/html/master/forms.html
                    var autofocusEl = Array.prototype.slice.call(document.querySelectorAll("[autofocus]")).pop()
                    if (autofocusEl && document.activeElement !== autofocusEl) {
                        autofocusEl.focus();
                    }

                    // execute scripts when DOM have been completely updated
                    this.options.selectors.forEach(function(selector) {
                            forEachEls(document.querySelectorAll(selector), function(el) {
                                executeScripts(el)
                            })
                        })
                        // }
                        // catch(e) {
                        //   if (this.options.debug) {
                        //     this.log("Pjax switch fail: ", e)
                        //   }
                        //   this.switchFallback(tmpEl, document)
                        // }
                },

                doRequest: require("./lib/request.js"),

                loadUrl: function(href, options) {
                    if (!fire('pjax:beforeSend', options, href))
                        return false

                    this.log("load href", href, options)

                    trigger(document, "pjax:send", options);

                    // Do the request
                    this.doRequest(href, options.requestOptions, function(html) {
                        // Fail if unable to load HTML via AJAX
                        if (html === false) {
                            trigger(document, "pjax:complete pjax:error", options)

                            return
                        }

                        // Clear out any focused controls before inserting new page contents.
                        document.activeElement.blur()

                        try {
                            this.loadContent(html, options)
                        } catch (e) {
                            if (!this.options.debug) {
                                if (console && console.error) {
                                    console.error("Pjax switch fail: ", e)
                                }
                                this.latestChance(href)
                                return
                            } else {
                                throw e
                            }
                        }

                        if (options.history) {
                            if (this.firstrun) {
                                this.lastUid = this.maxUid = newUid()
                                this.firstrun = false
                                window.history.replaceState({
                                        url: window.location.href,
                                        title: document.title,
                                        uid: this.maxUid
                                    },
                                    document.title)
                            }

                            // Update browser history
                            this.lastUid = this.maxUid = newUid()
                            window.history.pushState({
                                    url: href,
                                    title: options.title,
                                    uid: this.maxUid
                                },
                                options.title,
                                href)
                        }

                        this.forEachSelectors(function(el) {
                            this.parseDOM(el)
                        }, this)

                        // Fire Events
                        trigger(document, "pjax:complete pjax:success", options)

                        options.analytics()

                        // Scroll page to top on new page load
                        if (options.scrollTo !== false) {
                            if (options.scrollTo.length > 1) {
                                window.scrollTo(options.scrollTo[0], options.scrollTo[1])
                            } else {
                                window.scrollTo(0, options.scrollTo)
                            }
                        }
                    }.bind(this))
                }
            }

            Pjax.isSupported = require("./lib/is-supported.js");

            //arguably could do `if( require("./lib/is-supported.js")()) {` but that might be a little to simple
            if (Pjax.isSupported()) {
                module.exports = Pjax
            }
            // if there isn???t required browser functions, returning stupid api
            else {
                var stupidPjax = function() {}
                for (var key in Pjax.prototype) {
                    if (Pjax.prototype.hasOwnProperty(key) && typeof Pjax.prototype[key] === "function") {
                        stupidPjax[key] = stupidPjax
                    }
                }

                module.exports = stupidPjax
            }

        }, { "./lib/clone.js": 2, "./lib/events/on.js": 4, "./lib/events/trigger.js": 5, "./lib/execute-scripts.js": 6, "./lib/foreach-els.js": 7, "./lib/foreach-selectors.js": 8, "./lib/is-supported.js": 9, "./lib/proto/attach-form.js": 11, "./lib/proto/attach-link.js": 12, "./lib/proto/get-elements.js": 13, "./lib/proto/log.js": 14, "./lib/proto/parse-dom.js": 15, "./lib/proto/parse-options.js": 17, "./lib/proto/refresh.js": 18, "./lib/reload.js": 19, "./lib/request.js": 20, "./lib/switches-selectors.js": 21, "./lib/switches.js": 22, "./lib/uniqueid.js": 23 }],
        2: [function(require, module, exports) {
            module.exports = function(obj) {
                if (null === obj || "object" != typeof obj) {
                    return obj
                }
                var copy = obj.constructor()
                for (var attr in obj) {
                    if (obj.hasOwnProperty(attr)) {
                        copy[attr] = obj[attr]
                    }
                }
                return copy
            }

        }, {}],
        3: [function(require, module, exports) {
            module.exports = function(el) {
                // console.log("going to execute script", el)

                var code = (el.text || el.textContent || el.innerHTML || "")
                var src = (el.src || "");
                var parent = el.parentNode || document.querySelector("head") || document.documentElement
                var script = document.createElement("script")

                if (code.match("document.write")) {
                    if (console && console.log) {
                        console.log("Script contains document.write. Can???t be executed correctly. Code skipped ", el)
                    }
                    return false
                }

                script.type = "text/javascript"

                if (src != "") {
                    script.src = src;
                    script.onload = function() { document.dispatchEvent((new Event("pjax:complete"))); }
                    script.async = false; // force asynchronous loading of peripheral js
                }

                if (code != "") {
                    try {
                        script.appendChild(document.createTextNode(code))
                    } catch (e) {
                        // old IEs have funky script nodes
                        script.text = code
                    }
                }

                // execute
                parent.appendChild(script);
                // avoid pollution only in head or body tags
                if (["head", "body"].indexOf(parent.tagName.toLowerCase()) > 0) {
                    parent.removeChild(script)
                }

                return true;
            }

        }, {}],
        4: [function(require, module, exports) {
            var forEachEls = require("../foreach-els")

            module.exports = function(els, events, listener, useCapture) {
                events = (typeof events === "string" ? events.split(" ") : events)

                events.forEach(function(e) {
                    forEachEls(els, function(el) {
                        el.addEventListener(e, listener, useCapture)
                    })
                })
            }

        }, { "../foreach-els": 7 }],
        5: [function(require, module, exports) {
            var forEachEls = require("../foreach-els")

            module.exports = function(els, events, opts) {
                events = (typeof events === "string" ? events.split(" ") : events)

                events.forEach(function(e) {
                    var event // = new CustomEvent(e) // doesn't everywhere yet
                    event = document.createEvent("HTMLEvents")
                    event.initEvent(e, true, true)
                    event.eventName = e
                    if (opts) {
                        Object.keys(opts).forEach(function(key) {
                            event[key] = opts[key]
                        })
                    }

                    forEachEls(els, function(el) {
                        var domFix = false
                        if (!el.parentNode && el !== document && el !== window) {
                            // THANKS YOU IE (9/10//11 concerned)
                            // dispatchEvent doesn't work if element is not in the dom
                            domFix = true
                            document.body.appendChild(el)
                        }
                        el.dispatchEvent(event)
                        if (domFix) {
                            el.parentNode.removeChild(el)
                        }
                    })
                })
            }

        }, { "../foreach-els": 7 }],
        6: [function(require, module, exports) {
            var forEachEls = require("./foreach-els")
            var evalScript = require("./eval-script")
                // Finds and executes scripts (used for newly added elements)
                // Needed since innerHTML does not run scripts
            module.exports = function(el) {
                // console.log("going to execute scripts for ", el)

                if (el.tagName.toLowerCase() === "script") {
                    evalScript(el);
                }

                forEachEls(el.querySelectorAll("script"), function(script) {
                    if (!script.type || script.type.toLowerCase() === "text/javascript") {
                        if (script.parentNode) {
                            script.parentNode.removeChild(script)
                        }
                        evalScript(script);
                    }
                });
            }

        }, { "./eval-script": 3, "./foreach-els": 7 }],
        7: [function(require, module, exports) {
            /* global HTMLCollection: true */

            module.exports = function(els, fn, context) {
                if (els instanceof HTMLCollection || els instanceof NodeList || els instanceof Array) {
                    return Array.prototype.forEach.call(els, fn, context)
                }
                // assume simple dom element
                return fn.call(context, els)
            }

        }, {}],
        8: [function(require, module, exports) {
            var forEachEls = require("./foreach-els")

            module.exports = function(selectors, cb, context, DOMcontext) {
                DOMcontext = DOMcontext || document
                selectors.forEach(function(selector) {
                    forEachEls(DOMcontext.querySelectorAll(selector), cb, context)
                })
            }

        }, { "./foreach-els": 7 }],
        9: [function(require, module, exports) {
            module.exports = function() {
                // Borrowed wholesale from https://github.com/defunkt/jquery-pjax
                return window.history &&
                    window.history.pushState &&
                    window.history.replaceState &&
                    // pushState isn???t reliable on iOS until 5.
                    !navigator.userAgent.match(/((iPod|iPhone|iPad).+\bOS\s+[1-4]\D|WebApps\/.+CFNetwork)/)
            }

        }, {}],
        10: [function(require, module, exports) {
            if (!Function.prototype.bind) {
                Function.prototype.bind = function(oThis) {
                    if (typeof this !== "function") {
                        // closest thing possible to the ECMAScript 5 internal IsCallable function
                        throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable")
                    }

                    var aArgs = Array.prototype.slice.call(arguments, 1)
                    var that = this
                    var Fnoop = function() {}
                    var fBound = function() {
                        return that.apply(this instanceof Fnoop && oThis ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)))
                    }

                    Fnoop.prototype = this.prototype
                    fBound.prototype = new Fnoop()

                    return fBound
                }
            }

        }, {}],
        11: [function(require, module, exports) {
            require("../polyfills/Function.prototype.bind")

            var on = require("../events/on")
            var clone = require("../clone")

            var attrClick = "data-pjax-click-state"

            var formAction = function(el, event) {

                this.options.requestOptions = {
                    requestUrl: el.getAttribute('action') || window.location.href,
                    requestMethod: el.getAttribute('method') || 'GET',
                }

                //create a testable virtual link of the form action
                var virtLinkElement = document.createElement('a');
                virtLinkElement.setAttribute('href', this.options.requestOptions.requestUrl);

                // Ignore external links.
                if (virtLinkElement.protocol !== window.location.protocol || virtLinkElement.host !== window.location.host) {
                    el.setAttribute(attrClick, "external");
                    return
                }

                // Ignore click if we are on an anchor on the same page
                if (virtLinkElement.pathname === window.location.pathname && virtLinkElement.hash.length > 0) {
                    el.setAttribute(attrClick, "anchor-present");
                    return
                }

                // Ignore empty anchor "foo.html#"
                if (virtLinkElement.href === window.location.href.split("#")[0] + "#") {
                    el.setAttribute(attrClick, "anchor-empty")
                    return
                }

                // if declared as a full reload, just normally submit the form
                if (this.options.currentUrlFullReload) {
                    el.setAttribute(attrClick, "reload");
                    return;
                }

                event.preventDefault()

                var paramObject = [];
                for (var elementKey in el.elements) {
                    var element = el.elements[elementKey];
                    if (!!element.name && element.attributes !== undefined && element.tagName.toLowerCase() !== 'button') {
                        if ((element.attributes.type !== 'checkbox' && element.attributes.type !== 'radio') || element.checked) {
                            paramObject.push({ name: encodeURIComponent(element.name), value: encodeURIComponent(element.value) });
                        }
                    }
                }

                //Creating a getString
                var paramsString = (paramObject.map(function(value) { return value.name + "=" + value.value; })).join('&');

                this.options.requestOptions.requestPayload = paramObject;
                this.options.requestOptions.requestPayloadString = paramsString;

                el.setAttribute(attrClick, "submit");

                this.loadUrl(virtLinkElement.href, clone(this.options))

            };

            var isDefaultPrevented = function(event) {
                return event.defaultPrevented || event.returnValue === false;
            };


            module.exports = function(el) {
                var that = this

                on(el, "submit", function(event) {
                    if (isDefaultPrevented(event)) {
                        return
                    }

                    formAction.call(that, el, event)
                })

                on(el, "keyup", function(event) {
                    if (isDefaultPrevented(event)) {
                        return
                    }


                    if (event.keyCode == 13) {
                        formAction.call(that, el, event)
                    }
                }.bind(this))
            }

        }, { "../clone": 2, "../events/on": 4, "../polyfills/Function.prototype.bind": 10 }],
        12: [function(require, module, exports) {
            require("../polyfills/Function.prototype.bind")

            var on = require("../events/on")
            var clone = require("../clone")

            var attrClick = "data-pjax-click-state"
            var attrKey = "data-pjax-keyup-state"

            var linkAction = function(el, event) {
                // Don???t break browser special behavior on links (like page in new window)
                if (event.which > 1 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
                    el.setAttribute(attrClick, "modifier")
                    return
                }

                // we do test on href now to prevent unexpected behavior if for some reason
                // user have href that can be dynamically updated

                // Ignore external links.
                if (el.protocol !== window.location.protocol || el.host !== window.location.host) {
                    el.setAttribute(attrClick, "external")
                    return
                }

                // Ignore click if we are on an anchor on the same page
                if (el.pathname === window.location.pathname && el.hash.length > 0) {
                    el.setAttribute(attrClick, "anchor-present")
                    return
                }

                // Ignore anchors on the same page (keep native behavior)
                if (el.hash && el.href.replace(el.hash, "") === window.location.href.replace(location.hash, "")) {
                    el.setAttribute(attrClick, "anchor")
                    return
                }

                // Ignore empty anchor "foo.html#"
                if (el.href === window.location.href.split("#")[0] + "#") {
                    el.setAttribute(attrClick, "anchor-empty")
                    return
                }

                event.preventDefault()

                // don???t do "nothing" if user try to reload the page by clicking the same link twice
                if (
                    this.options.currentUrlFullReload &&
                    el.href === window.location.href.split("#")[0]
                ) {
                    el.setAttribute(attrClick, "reload")
                    this.reload()
                    return
                }
                this.options.requestOptions = this.options.requestOptions || {};
                el.setAttribute(attrClick, "load")
                this.loadUrl(el.href, clone(this.options))
            }

            var isDefaultPrevented = function(event) {
                return event.defaultPrevented || event.returnValue === false;
            }

            module.exports = function(el) {
                var that = this

                on(el, "click", function(event) {
                    if (isDefaultPrevented(event)) {
                        return
                    }

                    linkAction.call(that, el, event)
                })

                on(el, "keyup", function(event) {
                    if (isDefaultPrevented(event)) {
                        return
                    }

                    // Don???t break browser special behavior on links (like page in new window)
                    if (event.which > 1 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
                        el.setAttribute(attrKey, "modifier")
                        return
                    }

                    if (event.keyCode == 13) {
                        linkAction.call(that, el, event)
                    }
                }.bind(this))
            }

        }, { "../clone": 2, "../events/on": 4, "../polyfills/Function.prototype.bind": 10 }],
        13: [function(require, module, exports) {
            module.exports = function(el) {
                return el.querySelectorAll(this.options.elements)
            }

        }, {}],
        14: [function(require, module, exports) {
            module.exports = function() {
                if (this.options.debug && console) {
                    if (typeof console.log === "function") {
                        console.log.apply(console, arguments);
                    }
                    // ie is weird
                    else if (console.log) {
                        console.log(arguments);
                    }
                }
            }

        }, {}],
        15: [function(require, module, exports) {
            var forEachEls = require("../foreach-els")

            var parseElement = require("./parse-element")

            module.exports = function(el) {
                forEachEls(this.getElements(el), parseElement, this)
            }

        }, { "../foreach-els": 7, "./parse-element": 16 }],
        16: [function(require, module, exports) {
            module.exports = function(el) {
                switch (el.tagName.toLowerCase()) {
                    case "a":
                        // only attach link if el does not already have link attached
                        if (!el.hasAttribute('data-pjax-click-state')) {
                            this.attachLink(el)
                        }
                        break

                    case "form":
                        // only attach link if el does not already have link attached
                        if (!el.hasAttribute('data-pjax-click-state')) {
                            this.attachForm(el)
                        }
                        break

                    default:
                        throw "Pjax can only be applied on <a> or <form> submit"
                }
            }

        }, {}],
        17: [function(require, module, exports) {
            /* global _gaq: true, ga: true */

            module.exports = function(options) {
                this.options = options
                this.options.elements = this.options.elements || "a[href], form[action]"
                this.options.selectors = this.options.selectors || ["title", ".js-Pjax"]
                this.options.switches = this.options.switches || {}
                this.options.switchesOptions = this.options.switchesOptions || {}
                this.options.history = this.options.history || true
                this.options.analytics = this.options.analytics || function() {
                    // options.backward or options.foward can be true or undefined
                    // by default, we do track back/foward hit
                    // https://productforums.google.com/forum/#!topic/analytics/WVwMDjLhXYk
                    if (window._gaq) {
                        _gaq.push(["_trackPageview"])
                    }
                    if (window.ga) {
                        ga("send", "pageview", { page: location.pathname, title: document.title })
                    }
                }
                this.options.scrollTo = (typeof this.options.scrollTo === 'undefined') ? 0 : this.options.scrollTo;
                this.options.cacheBust = (typeof this.options.cacheBust === 'undefined') ? true : this.options.cacheBust
                this.options.debug = this.options.debug || false

                // we can???t replace body.outerHTML or head.outerHTML
                // it create a bug where new body or new head are created in the dom
                // if you set head.outerHTML, a new body tag is appended, so the dom get 2 body
                // & it break the switchFallback which replace head & body
                if (!this.options.switches.head) {
                    this.options.switches.head = this.switchElementsAlt
                }
                if (!this.options.switches.body) {
                    this.options.switches.body = this.switchElementsAlt
                }
                if (typeof options.analytics !== "function") {
                    options.analytics = function() {}
                }
            }
        }, {}],
        18: [function(require, module, exports) {
            module.exports = function(el) {
                this.parseDOM(el || document)
            }

        }, {}],
        19: [function(require, module, exports) {
            module.exports = function() {
                window.location.reload()
            }

        }, {}],
        20: [function(require, module, exports) {
            module.exports = function(location, options, callback) {
                options = options || {};
                var requestMethod = options.requestMethod || "GET";
                var requestPayload = options.requestPayloadString || null;
                var request = new XMLHttpRequest()

                request.onreadystatechange = function() {
                    if (request.readyState === 4) {
                        if (request.status === 200) {
                            callback(request.responseText, request)
                        } else {
                            callback(null, request)
                        }
                    }
                }

                // Add a timestamp as part of the query string if cache busting is enabled
                if (this.options.cacheBust) {
                    location += (!/[?&]/.test(location) ? "?" : "&") + new Date().getTime()
                }

                request.open(requestMethod.toUpperCase(), location, true)
                request.setRequestHeader("X-Requested-With", "XMLHttpRequest")

                // Add the request payload if available
                if (options.requestPayloadString != undefined && options.requestPayloadString != "") {
                    // Send the proper header information along with the request
                    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                }

                request.send(requestPayload)

                return request
            }

        }, {}],
        21: [function(require, module, exports) {
            var forEachEls = require("./foreach-els")

            var defaultSwitches = require("./switches")

            module.exports = function(switches, switchesOptions, selectors, fromEl, toEl, options) {
                selectors.forEach(function(selector) {
                    var newEls = fromEl.querySelectorAll(selector)
                    var oldEls = toEl.querySelectorAll(selector)
                    if (this.log) {
                        this.log("Pjax switch", selector, newEls, oldEls)
                    }
                    if (newEls.length !== oldEls.length) {
                        // forEachEls(newEls, function(el) {
                        //   this.log("newEl", el, el.outerHTML)
                        // }, this)
                        // forEachEls(oldEls, function(el) {
                        //   this.log("oldEl", el, el.outerHTML)
                        // }, this)
                        throw "DOM doesn???t look the same on new loaded page: ???" + selector + "??? - new " + newEls.length + ", old " + oldEls.length
                    }

                    forEachEls(newEls, function(newEl, i) {
                        var oldEl = oldEls[i]
                        if (this.log) {
                            this.log("newEl", newEl, "oldEl", oldEl)
                        }
                        if (switches[selector]) {
                            switches[selector].bind(this)(oldEl, newEl, options, switchesOptions[selector])
                        } else {
                            defaultSwitches.outerHTML.bind(this)(oldEl, newEl, options)
                        }
                    }, this)
                }, this)
            }

        }, { "./foreach-els": 7, "./switches": 22 }],
        22: [function(require, module, exports) {
            var on = require("./events/on.js")
                // var off = require("./lib/events/on.js")
                // var trigger = require("./lib/events/trigger.js")


            module.exports = {
                outerHTML: function(oldEl, newEl) {
                    oldEl.outerHTML = newEl.outerHTML
                    this.onSwitch()
                },

                innerHTML: function(oldEl, newEl) {
                    oldEl.innerHTML = newEl.innerHTML
                    oldEl.className = newEl.className
                    this.onSwitch()
                },

                sideBySide: function(oldEl, newEl, options, switchOptions) {
                    var forEach = Array.prototype.forEach
                    var elsToRemove = []
                    var elsToAdd = []
                    var fragToAppend = document.createDocumentFragment()
                        // height transition are shitty on safari
                        // so commented for now (until I found something ?)
                        // var relevantHeight = 0
                    var animationEventNames = "animationend webkitAnimationEnd MSAnimationEnd oanimationend"
                    var animatedElsNumber = 0
                    var sexyAnimationEnd = function(e) {
                        if (e.target != e.currentTarget) {
                            // end triggered by an animation on a child
                            return
                        }

                        animatedElsNumber--
                        if (animatedElsNumber <= 0 && elsToRemove) {
                            elsToRemove.forEach(function(el) {
                                // browsing quickly can make the el
                                // already removed by last page update ?
                                if (el.parentNode) {
                                    el.parentNode.removeChild(el)
                                }
                            })

                            elsToAdd.forEach(function(el) {
                                el.className = el.className.replace(el.getAttribute("data-pjax-classes"), "")
                                el.removeAttribute("data-pjax-classes")
                                    // Pjax.off(el, animationEventNames, sexyAnimationEnd, true)
                            })

                            elsToAdd = null // free memory
                            elsToRemove = null // free memory

                            // assume the height is now useless (avoid bug since there is overflow hidden on the parent)
                            // oldEl.style.height = "auto"

                            // this is to trigger some repaint (example: picturefill)
                            this.onSwitch()
                                // Pjax.trigger(window, "scroll")
                        }
                    }.bind(this)

                    // Force height to be able to trigger css animation
                    // here we get the relevant height
                    // oldEl.parentNode.appendChild(newEl)
                    // relevantHeight = newEl.getBoundingClientRect().height
                    // oldEl.parentNode.removeChild(newEl)
                    // oldEl.style.height = oldEl.getBoundingClientRect().height + "px"

                    switchOptions = switchOptions || {}

                    forEach.call(oldEl.childNodes, function(el) {
                        elsToRemove.push(el)
                        if (el.classList && !el.classList.contains("js-Pjax-remove")) {
                            // for fast switch, clean element that just have been added, & not cleaned yet.
                            if (el.hasAttribute("data-pjax-classes")) {
                                el.className = el.className.replace(el.getAttribute("data-pjax-classes"), "")
                                el.removeAttribute("data-pjax-classes")
                            }
                            el.classList.add("js-Pjax-remove")
                            if (switchOptions.callbacks && switchOptions.callbacks.removeElement) {
                                switchOptions.callbacks.removeElement(el)
                            }
                            if (switchOptions.classNames) {
                                el.className += " " + switchOptions.classNames.remove + " " + (options.backward ? switchOptions.classNames.backward : switchOptions.classNames.forward)
                            }
                            animatedElsNumber++
                            on(el, animationEventNames, sexyAnimationEnd, true)
                        }
                    })

                    forEach.call(newEl.childNodes, function(el) {
                        if (el.classList) {
                            var addClasses = ""
                            if (switchOptions.classNames) {
                                addClasses = " js-Pjax-add " + switchOptions.classNames.add + " " + (options.backward ? switchOptions.classNames.forward : switchOptions.classNames.backward)
                            }
                            if (switchOptions.callbacks && switchOptions.callbacks.addElement) {
                                switchOptions.callbacks.addElement(el)
                            }
                            el.className += addClasses
                            el.setAttribute("data-pjax-classes", addClasses)
                            elsToAdd.push(el)
                            fragToAppend.appendChild(el)
                            animatedElsNumber++
                            on(el, animationEventNames, sexyAnimationEnd, true)
                        }
                    })

                    // pass all className of the parent
                    oldEl.className = newEl.className
                    oldEl.appendChild(fragToAppend)

                    // oldEl.style.height = relevantHeight + "px"
                }
            }

        }, { "./events/on.js": 4 }],
        23: [function(require, module, exports) {
            module.exports = (function() {
                var counter = 0
                return function() {
                    var id = ("pjax" + (new Date().getTime())) + "_" + counter
                    counter++
                    return id
                }
            })()

        }, {}]
    }, {}, [1])(1)
});
