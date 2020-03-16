(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Geolookup = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg) && arg.length) {
				var inner = classNames.apply(null, arg);
				if (inner) {
					classes.push(inner);
				}
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if (typeof module !== 'undefined' && module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
		// register as 'classnames', consistent with npm package name
		define('classnames', [], function () {
			return classNames;
		});
	} else {
		window.classNames = classNames;
	}
}());

},{}],2:[function(require,module,exports){
(function (global){
/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = debounce;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],3:[function(require,module,exports){
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

'use strict';
/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

},{}],4:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],5:[function(require,module,exports){
(function (process){
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

var printWarning = function() {};

if (process.env.NODE_ENV !== 'production') {
  var ReactPropTypesSecret = require('./lib/ReactPropTypesSecret');
  var loggedTypeFailures = {};
  var has = Function.call.bind(Object.prototype.hasOwnProperty);

  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (has(typeSpecs, typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error(
              (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
              'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.'
            );
            err.name = 'Invariant Violation';
            throw err;
          }
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        if (error && !(error instanceof Error)) {
          printWarning(
            (componentName || 'React class') + ': type specification of ' +
            location + ' `' + typeSpecName + '` is invalid; the type checker ' +
            'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
            'You may have forgotten to pass an argument to the type checker ' +
            'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
            'shape all require an argument).'
          );
        }
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          printWarning(
            'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
          );
        }
      }
    }
  }
}

/**
 * Resets warning cache when testing.
 *
 * @private
 */
checkPropTypes.resetWarningCache = function() {
  if (process.env.NODE_ENV !== 'production') {
    loggedTypeFailures = {};
  }
}

module.exports = checkPropTypes;

}).call(this,require('_process'))
},{"./lib/ReactPropTypesSecret":9,"_process":4}],6:[function(require,module,exports){
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

var ReactPropTypesSecret = require('./lib/ReactPropTypesSecret');

function emptyFunction() {}
function emptyFunctionWithReset() {}
emptyFunctionWithReset.resetWarningCache = emptyFunction;

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    var err = new Error(
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
    err.name = 'Invariant Violation';
    throw err;
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    elementType: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,

    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction
  };

  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

},{"./lib/ReactPropTypesSecret":9}],7:[function(require,module,exports){
(function (process){
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

var ReactIs = require('react-is');
var assign = require('object-assign');

var ReactPropTypesSecret = require('./lib/ReactPropTypesSecret');
var checkPropTypes = require('./checkPropTypes');

var has = Function.call.bind(Object.prototype.hasOwnProperty);
var printWarning = function() {};

if (process.env.NODE_ENV !== 'production') {
  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

function emptyFunctionThatReturnsNull() {
  return null;
}

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    elementType: createElementTypeTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (process.env.NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          var err = new Error(
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
          err.name = 'Invariant Violation';
          throw err;
        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            printWarning(
              'You are manually calling a React.PropTypes validation ' +
              'function for the `' + propFullName + '` prop on `' + componentName  + '`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.'
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!ReactIs.isValidElementType(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      if (process.env.NODE_ENV !== 'production') {
        if (arguments.length > 1) {
          printWarning(
            'Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' +
            'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).'
          );
        } else {
          printWarning('Invalid argument supplied to oneOf, expected an array.');
        }
      }
      return emptyFunctionThatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
        var type = getPreciseType(value);
        if (type === 'symbol') {
          return String(value);
        }
        return value;
      });
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (has(propValue, key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      process.env.NODE_ENV !== 'production' ? printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunctionThatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        printWarning(
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'
        );
        return emptyFunctionThatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from
      // props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // falsy value can't be a Symbol
    if (!propValue) {
      return false;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

}).call(this,require('_process'))
},{"./checkPropTypes":5,"./lib/ReactPropTypesSecret":9,"_process":4,"object-assign":3,"react-is":12}],8:[function(require,module,exports){
(function (process){
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (process.env.NODE_ENV !== 'production') {
  var ReactIs = require('react-is');

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = require('./factoryWithTypeCheckers')(ReactIs.isElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = require('./factoryWithThrowingShims')();
}

}).call(this,require('_process'))
},{"./factoryWithThrowingShims":6,"./factoryWithTypeCheckers":7,"_process":4,"react-is":12}],9:[function(require,module,exports){
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;

},{}],10:[function(require,module,exports){
(function (process){
/** @license React v16.13.0
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';



if (process.env.NODE_ENV !== "production") {
  (function() {
'use strict';

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
// (unstable) APIs that have been removed. Can we remove the symbols?

var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

function isValidElementType(type) {
  return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
}

function typeOf(object) {
  if (typeof object === 'object' && object !== null) {
    var $$typeof = object.$$typeof;

    switch ($$typeof) {
      case REACT_ELEMENT_TYPE:
        var type = object.type;

        switch (type) {
          case REACT_ASYNC_MODE_TYPE:
          case REACT_CONCURRENT_MODE_TYPE:
          case REACT_FRAGMENT_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_STRICT_MODE_TYPE:
          case REACT_SUSPENSE_TYPE:
            return type;

          default:
            var $$typeofType = type && type.$$typeof;

            switch ($$typeofType) {
              case REACT_CONTEXT_TYPE:
              case REACT_FORWARD_REF_TYPE:
              case REACT_LAZY_TYPE:
              case REACT_MEMO_TYPE:
              case REACT_PROVIDER_TYPE:
                return $$typeofType;

              default:
                return $$typeof;
            }

        }

      case REACT_PORTAL_TYPE:
        return $$typeof;
    }
  }

  return undefined;
} // AsyncMode is deprecated along with isAsyncMode

var AsyncMode = REACT_ASYNC_MODE_TYPE;
var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
var ContextConsumer = REACT_CONTEXT_TYPE;
var ContextProvider = REACT_PROVIDER_TYPE;
var Element = REACT_ELEMENT_TYPE;
var ForwardRef = REACT_FORWARD_REF_TYPE;
var Fragment = REACT_FRAGMENT_TYPE;
var Lazy = REACT_LAZY_TYPE;
var Memo = REACT_MEMO_TYPE;
var Portal = REACT_PORTAL_TYPE;
var Profiler = REACT_PROFILER_TYPE;
var StrictMode = REACT_STRICT_MODE_TYPE;
var Suspense = REACT_SUSPENSE_TYPE;
var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

function isAsyncMode(object) {
  {
    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
      hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

      console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
    }
  }

  return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
}
function isConcurrentMode(object) {
  return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
}
function isContextConsumer(object) {
  return typeOf(object) === REACT_CONTEXT_TYPE;
}
function isContextProvider(object) {
  return typeOf(object) === REACT_PROVIDER_TYPE;
}
function isElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}
function isForwardRef(object) {
  return typeOf(object) === REACT_FORWARD_REF_TYPE;
}
function isFragment(object) {
  return typeOf(object) === REACT_FRAGMENT_TYPE;
}
function isLazy(object) {
  return typeOf(object) === REACT_LAZY_TYPE;
}
function isMemo(object) {
  return typeOf(object) === REACT_MEMO_TYPE;
}
function isPortal(object) {
  return typeOf(object) === REACT_PORTAL_TYPE;
}
function isProfiler(object) {
  return typeOf(object) === REACT_PROFILER_TYPE;
}
function isStrictMode(object) {
  return typeOf(object) === REACT_STRICT_MODE_TYPE;
}
function isSuspense(object) {
  return typeOf(object) === REACT_SUSPENSE_TYPE;
}

exports.AsyncMode = AsyncMode;
exports.ConcurrentMode = ConcurrentMode;
exports.ContextConsumer = ContextConsumer;
exports.ContextProvider = ContextProvider;
exports.Element = Element;
exports.ForwardRef = ForwardRef;
exports.Fragment = Fragment;
exports.Lazy = Lazy;
exports.Memo = Memo;
exports.Portal = Portal;
exports.Profiler = Profiler;
exports.StrictMode = StrictMode;
exports.Suspense = Suspense;
exports.isAsyncMode = isAsyncMode;
exports.isConcurrentMode = isConcurrentMode;
exports.isContextConsumer = isContextConsumer;
exports.isContextProvider = isContextProvider;
exports.isElement = isElement;
exports.isForwardRef = isForwardRef;
exports.isFragment = isFragment;
exports.isLazy = isLazy;
exports.isMemo = isMemo;
exports.isPortal = isPortal;
exports.isProfiler = isProfiler;
exports.isStrictMode = isStrictMode;
exports.isSuspense = isSuspense;
exports.isValidElementType = isValidElementType;
exports.typeOf = typeOf;
  })();
}

}).call(this,require('_process'))
},{"_process":4}],11:[function(require,module,exports){
/** @license React v16.13.0
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';var b="function"===typeof Symbol&&Symbol.for,c=b?Symbol.for("react.element"):60103,d=b?Symbol.for("react.portal"):60106,e=b?Symbol.for("react.fragment"):60107,f=b?Symbol.for("react.strict_mode"):60108,g=b?Symbol.for("react.profiler"):60114,h=b?Symbol.for("react.provider"):60109,k=b?Symbol.for("react.context"):60110,l=b?Symbol.for("react.async_mode"):60111,m=b?Symbol.for("react.concurrent_mode"):60111,n=b?Symbol.for("react.forward_ref"):60112,p=b?Symbol.for("react.suspense"):60113,q=b?
Symbol.for("react.suspense_list"):60120,r=b?Symbol.for("react.memo"):60115,t=b?Symbol.for("react.lazy"):60116,v=b?Symbol.for("react.block"):60121,w=b?Symbol.for("react.fundamental"):60117,x=b?Symbol.for("react.responder"):60118,y=b?Symbol.for("react.scope"):60119;
function z(a){if("object"===typeof a&&null!==a){var u=a.$$typeof;switch(u){case c:switch(a=a.type,a){case l:case m:case e:case g:case f:case p:return a;default:switch(a=a&&a.$$typeof,a){case k:case n:case t:case r:case h:return a;default:return u}}case d:return u}}}function A(a){return z(a)===m}exports.AsyncMode=l;exports.ConcurrentMode=m;exports.ContextConsumer=k;exports.ContextProvider=h;exports.Element=c;exports.ForwardRef=n;exports.Fragment=e;exports.Lazy=t;exports.Memo=r;exports.Portal=d;
exports.Profiler=g;exports.StrictMode=f;exports.Suspense=p;exports.isAsyncMode=function(a){return A(a)||z(a)===l};exports.isConcurrentMode=A;exports.isContextConsumer=function(a){return z(a)===k};exports.isContextProvider=function(a){return z(a)===h};exports.isElement=function(a){return"object"===typeof a&&null!==a&&a.$$typeof===c};exports.isForwardRef=function(a){return z(a)===n};exports.isFragment=function(a){return z(a)===e};exports.isLazy=function(a){return z(a)===t};
exports.isMemo=function(a){return z(a)===r};exports.isPortal=function(a){return z(a)===d};exports.isProfiler=function(a){return z(a)===g};exports.isStrictMode=function(a){return z(a)===f};exports.isSuspense=function(a){return z(a)===p};
exports.isValidElementType=function(a){return"string"===typeof a||"function"===typeof a||a===e||a===m||a===g||a===f||a===p||a===q||"object"===typeof a&&null!==a&&(a.$$typeof===t||a.$$typeof===r||a.$$typeof===h||a.$$typeof===k||a.$$typeof===n||a.$$typeof===w||a.$$typeof===x||a.$$typeof===y||a.$$typeof===v)};exports.typeOf=z;

},{}],12:[function(require,module,exports){
(function (process){
'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/react-is.production.min.js');
} else {
  module.exports = require('./cjs/react-is.development.js');
}

}).call(this,require('_process'))
},{"./cjs/react-is.development.js":10,"./cjs/react-is.production.min.js":11,"_process":4}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require('lodash.debounce');

var _lodash2 = _interopRequireDefault(_lodash);

var _defaults = require('./defaults');

var _defaults2 = _interopRequireDefault(_defaults);

var _propTypes = require('./prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _filterInputAttributes = require('./filter-input-attributes');

var _filterInputAttributes2 = _interopRequireDefault(_filterInputAttributes);

var _input = require('./input');

var _input2 = _interopRequireDefault(_input);

var _suggestList = require('./suggest-list');

var _suggestList2 = _interopRequireDefault(_suggestList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global window */

// Escapes special characters in user input for regex
function escapeRegExp(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}

/**
 * Entry point for the Geolookup component
 */

var Geolookup = function (_React$Component) {
    _inherits(Geolookup, _React$Component);

    /**
    * The constructor. Sets the initial state.
    * @param  {Object} props The properties object.
    */
    function Geolookup(props) {
        _classCallCheck(this, Geolookup);

        var _this = _possibleConstructorReturn(this, (Geolookup.__proto__ || Object.getPrototypeOf(Geolookup)).call(this, props));

        _this.state = {
            isSuggestsHidden: true,
            isLoading: false,
            userInput: props.initialValue,
            activeSuggest: null,
            suggests: []
        };

        _this.onInputChange = _this.onInputChange.bind(_this);
        _this.onAfterInputChange = _this.onAfterInputChange.bind(_this);
        _this.onInputFocus = _this.onInputFocus.bind(_this);
        _this.onInputBlur = _this.onInputBlur.bind(_this);
        _this.onButtonClick = _this.onButtonClick.bind(_this);
        _this.onNext = _this.onNext.bind(_this);
        _this.onPrev = _this.onPrev.bind(_this);
        _this.onSelect = _this.onSelect.bind(_this);
        _this.onSuggestMouseDown = _this.onSuggestMouseDown.bind(_this);
        _this.onSuggestMouseOut = _this.onSuggestMouseOut.bind(_this);
        _this.onSuggestNoResults = _this.onSuggestNoResults.bind(_this);
        _this.blur = _this.blur.bind(_this);
        _this.focus = _this.focus.bind(_this);
        _this.update = _this.update.bind(_this);
        _this.clear = _this.clear.bind(_this);
        _this.searchSuggests = _this.searchSuggests.bind(_this);
        _this.updateSuggests = _this.updateSuggests.bind(_this);
        _this.updateActiveSuggest = _this.updateActiveSuggest.bind(_this);
        _this.showSuggests = _this.showSuggests.bind(_this);
        _this.hideSuggests = _this.hideSuggests.bind(_this);
        _this.activateSuggest = _this.activateSuggest.bind(_this);
        _this.selectSuggest = _this.selectSuggest.bind(_this);
        _this.geocodeSuggest = _this.geocodeSuggest.bind(_this);

        if (props.queryDelay) {
            _this.onAfterInputChange = (0, _lodash2.default)(_this.onAfterInputChange, props.queryDelay);
        }

        _this.geocodeProvider = props.geocodeProvider;
        _this.disableAutoLookup = props.disableAutoLookup;
        _this.dom = { input: null };
        return _this;
    }

    /**
    * Change inputValue if prop changes
    * @param {Object} props The new props
    */


    _createClass(Geolookup, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(props) {
            if (this.props.initialValue !== props.initialValue) {
                this.setState({ userInput: props.initialValue });
            }
        }

        /**
        * Called on the client side after component is mounted.
        * Google api sdk object will be obtained and cached as a instance property.
        * Necessary objects of google api will also be determined and saved.
        */

    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            if (typeof window === 'undefined') {
                return;
            }

            // if no geocodeProvider and no onGeocodeSugegst function is
            // set, use google apis
            if (!this.geocodeProvider && typeof this.props.onGeocodeSuggest() === 'undefined') {
                // use google apis
                var googleMaps = this.props.googleMaps || window.google && // eslint-disable-line no-extra-parens
                window.google.maps || this.googleMaps;

                this.googleMaps = googleMaps;
                /* istanbul ignore next */
                if (!googleMaps) {
                    return;
                }
                this.autocompleteService = new googleMaps.places.AutocompleteService();
                this.geocoder = new googleMaps.Geocoder();
            }
        }

        /**
        * When the component will unmount
        */

    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            clearTimeout(this.timer);
        }

        /**
        * When the input changed
        * @param {String} userInput The input value of the user
        */

    }, {
        key: 'onInputChange',
        value: function onInputChange(userInput) {
            this.setState({ userInput: userInput }, this.onAfterInputChange);
        }

        /**
        * On After the input got changed
        */

    }, {
        key: 'onAfterInputChange',
        value: function onAfterInputChange() {
            if (!this.state.isSuggestsHidden && !this.disableAutoLookup) {
                this.showSuggests();
            }
            this.props.onChange(this.state.userInput);
        }

        /**
        * When the input gets focused
        */

    }, {
        key: 'onInputFocus',
        value: function onInputFocus() {
            this.props.onFocus();
            if (!this.disableAutoLookup) {
                this.showSuggests();
            }
        }

        /**
        * When the input gets blurred
        */

    }, {
        key: 'onInputBlur',
        value: function onInputBlur() {
            if (!this.state.ignoreBlur && !this.disableAutoLookup) {
                this.hideSuggests();
            }
        }

        /**
        * When the search button gets clicked
        */

    }, {
        key: 'onButtonClick',
        value: function onButtonClick() {
            if (this.state.isSuggestsHidden && this.disableAutoLookup) {
                this.showSuggests();
            } else {
                this.hideSuggests();
            }
        }
    }, {
        key: 'onNext',
        value: function onNext() {
            this.activateSuggest('next');
        }
    }, {
        key: 'onPrev',
        value: function onPrev() {
            this.activateSuggest('prev');
        }
    }, {
        key: 'onSelect',
        value: function onSelect() {
            this.selectSuggest(this.state.activeSuggest);
        }
    }, {
        key: 'onSuggestMouseDown',
        value: function onSuggestMouseDown() {
            this.setState({ ignoreBlur: true });
        }
    }, {
        key: 'onSuggestMouseOut',
        value: function onSuggestMouseOut() {
            this.setState({ ignoreBlur: false });
        }
    }, {
        key: 'onSuggestNoResults',
        value: function onSuggestNoResults() {
            this.props.onSuggestNoResults(this.state.userInput);
        }

        /**
        * Focus the input
        */

    }, {
        key: 'focus',
        value: function focus() {
            this.dom.input.focus();
        }

        /**
        * Blur the input
        */

    }, {
        key: 'blur',
        value: function blur() {
            this.dom.input.blur();
        }

        /**
        * Update the value of the user input
        * @param {String} userInput the new value of the user input
        */

    }, {
        key: 'update',
        value: function update(userInput) {
            this.setState({ userInput: userInput });
            this.props.onChange(userInput);
        }

        /*
        * Clear the input and close the suggestion pane
        */

    }, {
        key: 'clear',
        value: function clear() {
            this.setState({ userInput: '' }, this.hideSuggests);
        }

        /**
        * Search for new suggests
        */

    }, {
        key: 'searchSuggests',
        value: function searchSuggests() {
            var _this2 = this;

            if (!this.state.userInput) {
                this.updateSuggests();
                return;
            }

            this.setState({ isLoading: true }, function () {
                if (typeof _this2.props.onSuggestsLookup() === 'undefined') {
                    if (_this2.props.geocodeProvider) {
                        // Use props defined geocodeProvider.lookup
                        _this2.props.geocodeProvider.lookup(_this2.state.userInput).then(function (suggestsResults) {
                            _this2.setState({ isLoading: false });
                            _this2.updateSuggests(suggestsResults || [], // can be null
                            function () {
                                if (_this2.props.autoActivateFirstSuggest && !_this2.state.activeSuggest) {
                                    _this2.activateSuggest('next');
                                }
                            });
                        }).catch(function (error) {
                            console.error('geocodeProvider lookup Error: ', error);
                        });
                    } else {
                        // Use Google Places lookup
                        var options = {
                            input: _this2.state.userInput
                        };

                        ['location', 'radius', 'bounds', 'types'].forEach(function (option) {
                            if (_this2.props[option]) {
                                options[option] = _this2.props[option];
                            }
                        });

                        if (_this2.props.country) {
                            options.componentRestrictions = {
                                country: _this2.props.country
                            };
                        }
                        _this2.autocompleteService.getPlacePredictions(options, function (suggestsResults) {
                            _this2.setState({ isLoading: false });
                            _this2.updateSuggests(suggestsResults || [], // can be null
                            function () {
                                if (_this2.props.autoActivateFirstSuggest && !_this2.state.activeSuggest) {
                                    _this2.activateSuggest('next');
                                }
                            });
                        });
                    }
                } else {
                    // Use props defined onSuggestLookup
                    _this2.props.onSuggestsLookup(_this2.state.userInput).then(function (suggestsResults) {
                        _this2.setState({ isLoading: false });
                        _this2.updateSuggests(suggestsResults || [], // can be null
                        function () {
                            if (_this2.props.autoActivateFirstSuggest && !_this2.state.activeSuggest) {
                                _this2.activateSuggest('next');
                            }
                        });
                    }).catch(function (error) {
                        console.error('onSuggestsLookup Search Error: ', error);
                    });
                }
            });
        }

        /**
        * Update the suggests
        * @param {Array} suggestsResults The new google suggests
        * @param {Function} callback Called once the state has been updated
        */

    }, {
        key: 'updateSuggests',
        value: function updateSuggests() {
            var _this3 = this;

            var suggestsResults = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
            var callback = arguments[1];

            var suggests = [],
                regex = new RegExp(escapeRegExp(this.state.userInput), 'gim'),
                skipSuggest = this.props.skipSuggest,
                maxFixtures = 10,
                fixturesSearched = 0,
                activeSuggest = null;

            this.props.fixtures.forEach(function (suggest) {
                if (fixturesSearched >= maxFixtures) {
                    return;
                }

                if (!skipSuggest(suggest) && suggest.label.match(regex)) {
                    fixturesSearched++;

                    suggest.placeId = suggest.label;
                    suggest.isFixture = true;
                    suggests.push(suggest);
                }
            });

            suggestsResults.forEach(function (suggest) {
                if (!skipSuggest(suggest)) {
                    suggests.push({
                        label: _this3.props.getSuggestLabel(suggest),
                        placeId: suggest.place_id,
                        raw: suggest,
                        isFixture: false
                    });
                }
            });

            activeSuggest = this.updateActiveSuggest(suggests);
            this.props.onSuggestResults(suggests);
            this.setState({ suggests: suggests, activeSuggest: activeSuggest }, callback);
        }

        /**
        * Return the new activeSuggest object after suggests have been updated
        * @param {Array} suggests The new list of suggests
        * @return {Object} The new activeSuggest
        **/

    }, {
        key: 'updateActiveSuggest',
        value: function updateActiveSuggest() {
            var suggests = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

            var activeSuggest = this.state.activeSuggest;

            if (activeSuggest) {
                var newSuggest = suggests.find(function (listedSuggest) {
                    return activeSuggest.placeId === listedSuggest.placeId && activeSuggest.isFixture === listedSuggest.isFixture;
                });

                activeSuggest = newSuggest || null;
            }

            return activeSuggest;
        }

        /**
        * Show the suggestions
        */

    }, {
        key: 'showSuggests',
        value: function showSuggests() {
            this.searchSuggests();
            this.setState({ isSuggestsHidden: false });
        }

        /**
        * Hide the suggestions
        */

    }, {
        key: 'hideSuggests',
        value: function hideSuggests() {
            var _this4 = this;

            this.props.onBlur(this.state.userInput);
            this.timer = setTimeout(function () {
                _this4.setState({
                    isSuggestsHidden: true,
                    activeSuggest: null
                });
            }, 100);
        }

        /**
        * Activate a new suggest
        * @param {String} direction The direction in which to activate new suggest
        */

    }, {
        key: 'activateSuggest',
        value: function activateSuggest(direction) {
            // eslint-disable-line complexity
            if (this.state.isSuggestsHidden) {
                this.showSuggests();
                return;
            }

            var suggestsCount = this.state.suggests.length - 1,
                next = direction === 'next';
            var newActiveSuggest = null,
                newIndex = 0,
                i = 0;

            for (i; i <= suggestsCount; i++) {
                if (this.state.suggests[i] === this.state.activeSuggest) {
                    newIndex = next ? i + 1 : i - 1;
                }
            }

            if (!this.state.activeSuggest) {
                newIndex = next ? 0 : suggestsCount;
            }

            if (newIndex >= 0 && newIndex <= suggestsCount) {
                newActiveSuggest = this.state.suggests[newIndex];
            }

            this.props.onActivateSuggest(newActiveSuggest);

            this.setState({ activeSuggest: newActiveSuggest });
        }

        /**
        * When an item got selected
        * @param {GeolookupItem} suggest The selected suggest item
        */

    }, {
        key: 'selectSuggest',
        value: function selectSuggest(suggest) {
            if (!suggest) {
                // eslint-disable-next-line no-param-reassign
                suggest = {
                    label: this.state.userInput
                };
            }

            this.setState({
                isSuggestsHidden: true,
                userInput: suggest.label
            });

            if (suggest.location) {
                this.setState({ ignoreBlur: false });
                this.props.onSuggestSelect(suggest);
                return;
            }

            this.geocodeSuggest(suggest);
        }

        /**
        * Geocode a suggest
        * @param  {Object} suggest The suggest
        */

    }, {
        key: 'geocodeSuggest',
        value: function geocodeSuggest(suggest) {
            var _this5 = this;

            if (typeof this.props.onGeocodeSuggest() === 'undefined') {
                if (this.props.geocodeProvider) {
                    // use props defined geocodeProvider
                    this.props.geocodeProvider.geocode(suggest).then(function (geocodedResults) {
                        _this5.props.onSuggestSelect(geocodedResults);
                    });
                } else {
                    // use default google geocode lib
                    this.geocoder.geocode(suggest.placeId && !suggest.isFixture ? { placeId: suggest.placeId } : { address: suggest.label }, function (results, status) {
                        if (status === _this5.googleMaps.GeocoderStatus.OK) {
                            var gmaps = results[0],
                                location = gmaps.geometry.location;

                            suggest.gmaps = gmaps;
                            suggest.location = {
                                lat: location.lat(),
                                lng: location.lng()
                            };
                        }
                        _this5.props.onSuggestSelect(suggest);
                    });
                }
            } else {
                // use props defined geocode function
                var geocodedSuggest = this.props.onGeocodeSuggest(suggest);

                this.props.onSuggestSelect(geocodedSuggest);
            }
        }

        /**
        * Render the view
        * @return {Function} The React element to render
        */

    }, {
        key: 'render',
        value: function render() {
            var _this6 = this;

            var attributes = (0, _filterInputAttributes2.default)(this.props),
                classes = (0, _classnames2.default)('geolookup', this.props.className, { 'geolookup--loading': this.state.isLoading }),
                shouldRenderLabel = this.props.label && attributes.id,
                shouldRenderButton = this.props.disableAutoLookup,
                input = _react2.default.createElement(_input2.default, _extends({ className: this.props.inputClassName,
                ref: function ref(node) {
                    return _this6.dom.input = node;
                },
                value: this.state.userInput,
                ignoreEnter: !this.state.isSuggestsHidden,
                ignoreTab: this.props.ignoreTab,
                style: this.props.style.input,
                onChange: this.onInputChange,
                onFocus: this.onInputFocus,
                onBlur: this.onInputBlur,
                onKeyPress: this.props.onKeyPress,
                onNext: this.onNext,
                onPrev: this.onPrev,
                onSelect: this.onSelect,
                onEscape: this.hideSuggests }, attributes)),
                button = _react2.default.createElement(
                'button',
                { className: this.props.buttonClassName,
                    type: 'button',
                    onClick: this.onButtonClick },
                this.props.buttonText
            ),
                suggestionsList = _react2.default.createElement(_suggestList2.default, { isHidden: this.state.isSuggestsHidden,
                style: this.props.style.suggests,
                suggestItemStyle: this.props.style.suggestItem,
                suggests: this.state.suggests,
                hiddenClassName: this.props.suggestsHiddenClassName,
                suggestItemActiveClassName: this.props.suggestItemActiveClassName,
                activeSuggest: this.state.activeSuggest,
                onSuggestNoResults: this.onSuggestNoResults,
                onSuggestMouseDown: this.onSuggestMouseDown,
                onSuggestMouseOut: this.onSuggestMouseOut,
                onSuggestSelect: this.selectSuggest,
                suggestItemLabelRenderer: this.props.suggestItemLabelRenderer });

            return _react2.default.createElement(
                'div',
                { className: classes },
                _react2.default.createElement(
                    'span',
                    { className: 'geolookup__input-wrapper' },
                    shouldRenderLabel && _react2.default.createElement(
                        'label',
                        { className: 'geolookup__label',
                            htmlFor: attributes.id },
                        this.props.label
                    ),
                    input
                ),
                shouldRenderButton && _react2.default.createElement(
                    'span',
                    { className: 'geolookup__button-wrapper' },
                    button
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'geolookup__suggests-wrapper' },
                    suggestionsList
                )
            );
        }
    }]);

    return Geolookup;
}(_react2.default.Component);

/**
 * Types for the properties
 * @type {Object}
 */


Geolookup.propTypes = _propTypes2.default;

/**
 * Default values for the properties
 * @type {Object}
 */
Geolookup.defaultProps = _defaults2.default;

exports.default = Geolookup;

},{"./defaults":14,"./filter-input-attributes":15,"./input":16,"./prop-types":17,"./suggest-list":19,"classnames":1,"lodash.debounce":2}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/* istanbul ignore next */
/**
 * Default values
 */
exports.default = {
    fixtures: [],
    initialValue: '',
    placeholder: 'Search places',
    disabled: false,
    className: '',
    inputClassName: '',
    buttonClassName: 'geolookup__button',
    buttonText: 'Search',
    location: null,
    radius: null,
    bounds: null,
    country: null,
    types: null,
    queryDelay: 250,
    googleMaps: null,
    geocodeProvider: null,
    disableAutoLookup: false,
    onActivateSuggest: function onActivateSuggest() {/* no-op */},
    onGeocodeSuggest: function onGeocodeSuggest() {/* no-op */},
    onSuggestsLookup: function onSuggestsLookup() {/* no-op */},
    onSuggestSelect: function onSuggestSelect() {/* no-op */},
    onSuggestResults: function onSuggestResults() {/* no-op */},
    onSuggestNoResults: function onSuggestNoResults() {/* no-op */},
    onFocus: function onFocus() {/* no-op */},
    onBlur: function onBlur() {/* no-op */},
    onChange: function onChange() {/* no-op */},
    skipSuggest: function skipSuggest() {/* no-op */},
    showSuggests: function showSuggests() {/* no-op */},
    getSuggestLabel: function getSuggestLabel(suggest) {
        return suggest.description;
    },
    autoActivateFirstSuggest: false,
    style: {
        input: {},
        suggests: {},
        suggestItem: {}
    },
    ignoreTab: false,
    suggestItemLabelRenderer: function suggestItemLabelRenderer(suggest) {
        return suggest.label;
    }
};

},{}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (props) {
    var attributes = {};

    allowedAttributes.forEach(function (allowedAttribute) {
        if (props[allowedAttribute]) {
            attributes[allowedAttribute] = props[allowedAttribute];
        }
    });

    return attributes;
};

/**
 * Attributes allowed on input elements
 */
var allowedAttributes = ['autoFocus', 'disabled', 'form', 'formAction', 'formEncType', 'formMethod', 'formNoValidate', 'formTarget', 'height', 'id', 'inputMode', 'maxLength', 'name', 'onClick', 'onContextMenu', 'onCopy', 'onCut', 'onDoubleClick', 'onMouseDown', 'onMouseEnter', 'onMouseLeave', 'onMouseMove', 'onMouseOut', 'onMouseOver', 'onMouseUp', 'onPaste', 'pattern', 'placeholder', 'readOnly', 'required', 'size', 'spellCheck', 'tabIndex', 'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details', 'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup', 'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live', 'aria-owns', 'aria-relevant', 'aria-roledescription', 'aria-activedescendant', 'aria-autocomplete', 'aria-multiline', 'aria-placeholder', 'aria-readonly', 'aria-required'];

/**
 * Filter the properties for only allowed input properties
 * @param  {Object} props The properties to filter
 * @return {Object} The filtered, allowed properties
 */

},{}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _filterInputAttributes = require('./filter-input-attributes');

var _filterInputAttributes2 = _interopRequireDefault(_filterInputAttributes);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // eslint-disable-line no-unused-vars


/**
 * The input field
 * @param {Object} props The component's props
 * @return {JSX} The icon component.
 */
var Input = function (_React$PureComponent) {
    _inherits(Input, _React$PureComponent);

    function Input(props) {
        _classCallCheck(this, Input);

        var _this = _possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).call(this, props));

        _this.dom = { input: null };
        _this.onFocus = _this.onFocus.bind(_this);
        _this.onChange = _this.onChange.bind(_this);
        _this.onBlur = _this.onBlur.bind(_this);
        _this.onKeyPress = _this.onKeyPress.bind(_this);
        _this.onInputKeyDown = _this.onInputKeyDown.bind(_this);
        _this.focus = _this.focus.bind(_this);
        _this.blur = _this.blur.bind(_this);
        return _this;
    }
    /**
    * When the input got changed
    */


    _createClass(Input, [{
        key: 'onChange',
        value: function onChange() {
            this.props.onChange(this.dom.input.value);
        }

        /**
        * When the input got focused
        */

    }, {
        key: 'onFocus',
        value: function onFocus() {
            this.props.onFocus();
        }

        /**
        * When the input loses focus
        */

    }, {
        key: 'onBlur',
        value: function onBlur() {
            this.props.onBlur();
        }

        /**
        * When a key gets pressed in the input
        * @param  {Event} event The keypress event
        */

    }, {
        key: 'onKeyPress',
        value: function onKeyPress(event) {
            this.props.onKeyPress(event);
        }

        /**
        * When a key gets pressed in the input
        * @param  {Event} event The keydown event
        */

    }, {
        key: 'onInputKeyDown',
        value: function onInputKeyDown(event) {
            // eslint-disable-line complexity
            switch (event.which) {
                case 40:
                    // DOWN
                    event.preventDefault();
                    this.props.onNext();
                    break;
                case 38:
                    // UP
                    event.preventDefault();
                    this.props.onPrev();
                    break;
                case 13:
                    // ENTER
                    if (this.props.ignoreEnter) {
                        event.preventDefault();
                    }

                    this.props.onSelect();
                    break;
                case 9:
                    // TAB
                    if (!this.props.ignoreTab) {
                        this.props.onSelect();
                    }
                    break;
                case 27:
                    // ESC
                    this.props.onEscape();
                    break;
                /* istanbul ignore next */
                default:
                    break;
            }
        }

        /**
        * Focus the input
        */

    }, {
        key: 'focus',
        value: function focus() {
            this.dom.input.focus();
        }

        /**
        * Blur the input
        */

    }, {
        key: 'blur',
        value: function blur() {
            this.dom.input.blur();
        }

        /**
        * Render the view
        * @return {Function} The React element to render
        */

    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var attributes = (0, _filterInputAttributes2.default)(this.props),
                classes = (0, _classnames2.default)('geolookup__input', this.props.className);

            return _react2.default.createElement('input', _extends({
                className: classes,
                ref: function ref(node) {
                    return _this2.dom.input = node;
                },
                type: 'text',
                autoComplete: 'off'
            }, attributes, {
                value: this.props.value,
                style: this.props.style,
                onKeyDown: this.onInputKeyDown,
                onChange: this.onChange,
                onKeyPress: this.onKeyPress,
                onFocus: this.onFocus,
                onBlur: this.onBlur
            }));
        }
    }]);

    return Input;
}(_react2.default.PureComponent);

/**
 * Types for the properties
 * @type {Object}
 */


Input.propTypes = {
    ignoreTab: _propTypes2.default.bool,
    ignoreEnter: _propTypes2.default.bool,
    className: _propTypes2.default.string,
    style: _propTypes2.default.object,
    value: _propTypes2.default.string,
    suggest: _propTypes2.default.object,
    onKeyDown: _propTypes2.default.func,
    onKeyPress: _propTypes2.default.func,
    onChange: _propTypes2.default.func,
    onFocus: _propTypes2.default.func,
    onBlur: _propTypes2.default.func,
    onNext: _propTypes2.default.func,
    onPrev: _propTypes2.default.func,
    onSelect: _propTypes2.default.func,
    onEscape: _propTypes2.default.func
};

/**
 * Default values for the properties
 * @type {Object}
 */
Input.defaultProps = {
    className: '',
    value: '',
    ignoreTab: false,
    onKeyDown: function onKeyDown() {/* no-op */},
    onKeyPress: function onKeyPress() {/* no-op */},
    onChange: function onChange() {/* no-op */},
    onFocus: function onFocus() {/* no-op */},
    onBlur: function onBlur() {/* no-op */},
    onNext: function onNext() {/* no-op */},
    onPrev: function onPrev() {/* no-op */},
    onSelect: function onSelect() {/* no-op */},
    onEscape: function onEscape() {/* no-op */}
};

exports.default = Input;

},{"./filter-input-attributes":15,"classnames":1,"prop-types":8}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Default values
 */
exports.default = {
    fixtures: _propTypes2.default.array,
    initialValue: _propTypes2.default.string,
    placeholder: _propTypes2.default.string,
    disabled: _propTypes2.default.bool,
    className: _propTypes2.default.string,
    inputClassName: _propTypes2.default.string,
    suggestsHiddenClassName: _propTypes2.default.string,
    suggestItemActiveClassName: _propTypes2.default.string,
    buttonClassName: _propTypes2.default.string,
    buttonText: _propTypes2.default.string,
    location: _propTypes2.default.object,
    radius: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
    bounds: _propTypes2.default.object,
    country: _propTypes2.default.string,
    types: _propTypes2.default.array,
    queryDelay: _propTypes2.default.number,
    googleMaps: _propTypes2.default.object,
    geocodeProvider: _propTypes2.default.object,
    onGeocodeSuggest: _propTypes2.default.func,
    onSuggestsLookup: _propTypes2.default.func,
    onSuggestSelect: _propTypes2.default.func,
    onSuggestResults: _propTypes2.default.func,
    onFocus: _propTypes2.default.func,
    onBlur: _propTypes2.default.func,
    onChange: _propTypes2.default.func,
    onKeyPress: _propTypes2.default.func,
    skipSuggest: _propTypes2.default.func,
    showSuggests: _propTypes2.default.func,
    disableAutoLookup: _propTypes2.default.bool,
    getSuggestLabel: _propTypes2.default.func,
    autoActivateFirstSuggest: _propTypes2.default.bool,
    style: _propTypes2.default.shape({
        input: _propTypes2.default.object,
        suggests: _propTypes2.default.object,
        suggestItem: _propTypes2.default.object
    }),
    ignoreTab: _propTypes2.default.bool,
    label: _propTypes2.default.string,
    suggestItemLabelRenderer: _propTypes2.default.func
};

},{"prop-types":8}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A single Geolookup item in the list
 * @param {Object} props The component's props
 * @return {JSX} The icon component.
 */
var SuggestItem = function (_React$PureComponent) {
    _inherits(SuggestItem, _React$PureComponent);

    function SuggestItem(props) {
        _classCallCheck(this, SuggestItem);

        var _this = _possibleConstructorReturn(this, (SuggestItem.__proto__ || Object.getPrototypeOf(SuggestItem)).call(this, props));

        _this.onClick = _this.onClick.bind(_this);
        return _this;
    }

    /**
    * When the suggest item got clicked
    * @param {Event} event The click event
    */


    _createClass(SuggestItem, [{
        key: 'onClick',
        value: function onClick(event) {
            event.preventDefault();
            this.props.onSelect(this.props.suggest);
        }

        /**
        * Render the view
        * @return {Function} The React element to render
        */

    }, {
        key: 'render',
        value: function render() {
            var classes = (0, _classnames3.default)('geolookup__item', this.props.className, { 'geolookup__item--active': this.props.isActive }, _defineProperty({}, this.props.activeClassname, this.props.activeClassname ? this.props.isActive : null));

            return _react2.default.createElement(
                'li',
                {
                    className: classes,
                    style: this.props.style,
                    onMouseDown: this.props.onMouseDown,
                    onMouseOut: this.props.onMouseOut,
                    onClick: this.onClick
                },
                this.props.suggestItemLabelRenderer(this.props.suggest)
            );
        }
    }]);

    return SuggestItem;
}(_react2.default.PureComponent);

/**
 * Types for the properties
 * @type {Object}
 */


exports.default = SuggestItem;
SuggestItem.propTypes = {
    isActive: _propTypes2.default.bool,
    className: _propTypes2.default.string,
    activeClassname: _propTypes2.default.string,
    suggest: _propTypes2.default.object,
    onMouseDown: _propTypes2.default.func,
    onMouseOut: _propTypes2.default.func,
    onSelect: _propTypes2.default.func,
    suggestItemLabelRenderer: _propTypes2.default.func,
    style: _propTypes2.default.object
};

/**
 * Default values for the properties
 * @type {Object}
 */
SuggestItem.defaultProps = {
    isActive: false,
    className: '',
    suggest: {},
    onMouseDown: function onMouseDown() {/* no-op */},
    onMouseOut: function onMouseOut() {/* no-op */},
    onSelect: function onSelect() {/* no-op */},
    suggestItemLabelRenderer: function suggestItemLabelRenderer() {/* no-op */}
};

},{"classnames":1,"prop-types":8}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _suggestItem = require('./suggest-item');

var _suggestItem2 = _interopRequireDefault(_suggestItem);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // eslint-disable-line no-unused-vars


/**
 * The list with suggestions. Either from an API or provided as fixture
 * @param {Object} props The component's props
 * @return {JSX} The icon component.
 */
var SuggestList = function (_React$PureComponent) {
    _inherits(SuggestList, _React$PureComponent);

    function SuggestList(props) {
        _classCallCheck(this, SuggestList);

        var _this = _possibleConstructorReturn(this, (SuggestList.__proto__ || Object.getPrototypeOf(SuggestList)).call(this, props));

        _this.isHidden = _this.isHidden.bind(_this);
        return _this;
    }
    /**
    * Whether or not it is hidden
    * @return {Boolean} Hidden or not?
    */


    _createClass(SuggestList, [{
        key: 'isHidden',
        value: function isHidden() {
            return this.props.isHidden || this.props.suggests.length === 0;
        }

        /**
        * There are new properties available for the list
        * @param {Object} nextProps The new properties
        */

    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.suggests !== this.props.suggests) {
                if (nextProps.suggests.length === 0) {
                    this.props.onSuggestNoResults();
                }
            }
        }

        /**
        * Render the view
        * @return {Function} The React element to render
        */

    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var classes = (0, _classnames3.default)('geolookup__suggests', { 'geolookup__suggests--hidden': this.isHidden() }, _defineProperty({}, this.props.hiddenClassName, this.props.hiddenClassName ? this.isHidden() : null));

            return _react2.default.createElement(
                'ul',
                { className: classes, style: this.props.style },
                this.props.suggests.map(function (suggest) {
                    var isActive = _this2.props.activeSuggest && suggest.placeId === _this2.props.activeSuggest.placeId;

                    return _react2.default.createElement(_suggestItem2.default, {
                        key: suggest.placeId,
                        className: suggest.className,
                        suggest: suggest,
                        style: _this2.props.suggestItemStyle,
                        isActive: isActive,
                        activeClassname: _this2.props.suggestItemActiveClassName,
                        onMouseDown: _this2.props.onSuggestMouseDown,
                        onMouseOut: _this2.props.onSuggestMouseOut,
                        onSelect: _this2.props.onSuggestSelect,
                        suggestItemLabelRenderer: _this2.props.suggestItemLabelRenderer
                    });
                })
            );
        }
    }]);

    return SuggestList;
}(_react2.default.PureComponent);

/**
 * Types for the properties
 * @type {Object}
 */


exports.default = SuggestList;
SuggestList.propTypes = {
    isHidden: _propTypes2.default.bool,
    suggests: _propTypes2.default.array,
    suggestItemStyle: _propTypes2.default.object,
    style: _propTypes2.default.object,
    activeSuggest: _propTypes2.default.object,
    hiddenClassName: _propTypes2.default.string,
    suggestItemActiveClassName: _propTypes2.default.string,
    onSuggestNoResults: _propTypes2.default.func,
    suggestItemLabelRenderer: _propTypes2.default.func,
    onSuggestMouseDown: _propTypes2.default.func,
    onSuggestMouseOut: _propTypes2.default.func,
    onSuggestSelect: _propTypes2.default.func
};

/**
 * Default values for the properties
 * @type {Object}
 */
SuggestList.defaultProps = {
    isHidden: true,
    suggests: [],
    onSuggestNoResults: function onSuggestNoResults() {/* no-op */},
    suggestItemLabelRenderer: function suggestItemLabelRenderer() {/* no-op */},
    onSuggestMouseDown: function onSuggestMouseDown() {/* no-op */},
    onSuggestMouseOut: function onSuggestMouseOut() {/* no-op */},
    onSuggestSelect: function onSuggestSelect() {/* no-op */}
};

},{"./suggest-item":18,"classnames":1,"prop-types":8}]},{},[13])(13)
});
