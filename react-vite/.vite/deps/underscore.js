import {
  __export
} from "./chunk-5WWUZCGV.js";

// ../node_modules/underscore/modules/index.js
var modules_exports = {};
__export(modules_exports, {
  VERSION: () => VERSION,
  after: () => after,
  all: () => every,
  allKeys: () => allKeys,
  any: () => some,
  assign: () => extendOwn_default,
  before: () => before,
  bind: () => bind_default,
  bindAll: () => bindAll_default,
  chain: () => chain,
  chunk: () => chunk,
  clone: () => clone,
  collect: () => map,
  compact: () => compact,
  compose: () => compose,
  constant: () => constant,
  contains: () => contains,
  countBy: () => countBy_default,
  create: () => create,
  debounce: () => debounce,
  default: () => underscore_array_methods_default,
  defaults: () => defaults_default,
  defer: () => defer_default,
  delay: () => delay_default,
  detect: () => find,
  difference: () => difference_default,
  drop: () => rest,
  each: () => each,
  escape: () => escape_default,
  every: () => every,
  extend: () => extend_default,
  extendOwn: () => extendOwn_default,
  filter: () => filter,
  find: () => find,
  findIndex: () => findIndex_default,
  findKey: () => findKey,
  findLastIndex: () => findLastIndex_default,
  findWhere: () => findWhere,
  first: () => first,
  flatten: () => flatten2,
  foldl: () => reduce_default,
  foldr: () => reduceRight_default,
  forEach: () => each,
  functions: () => functions,
  get: () => get,
  groupBy: () => groupBy_default,
  has: () => has2,
  head: () => first,
  identity: () => identity,
  include: () => contains,
  includes: () => contains,
  indexBy: () => indexBy_default,
  indexOf: () => indexOf_default,
  initial: () => initial,
  inject: () => reduce_default,
  intersection: () => intersection,
  invert: () => invert,
  invoke: () => invoke_default,
  isArguments: () => isArguments_default,
  isArray: () => isArray_default,
  isArrayBuffer: () => isArrayBuffer_default,
  isBoolean: () => isBoolean,
  isDataView: () => isDataView_default,
  isDate: () => isDate_default,
  isElement: () => isElement,
  isEmpty: () => isEmpty,
  isEqual: () => isEqual,
  isError: () => isError_default,
  isFinite: () => isFinite2,
  isFunction: () => isFunction_default,
  isMap: () => isMap_default,
  isMatch: () => isMatch,
  isNaN: () => isNaN2,
  isNull: () => isNull,
  isNumber: () => isNumber_default,
  isObject: () => isObject,
  isRegExp: () => isRegExp_default,
  isSet: () => isSet_default,
  isString: () => isString_default,
  isSymbol: () => isSymbol_default,
  isTypedArray: () => isTypedArray_default,
  isUndefined: () => isUndefined,
  isWeakMap: () => isWeakMap_default,
  isWeakSet: () => isWeakSet_default,
  iteratee: () => iteratee,
  keys: () => keys,
  last: () => last,
  lastIndexOf: () => lastIndexOf_default,
  map: () => map,
  mapObject: () => mapObject,
  matcher: () => matcher,
  matches: () => matcher,
  max: () => max,
  memoize: () => memoize,
  methods: () => functions,
  min: () => min,
  mixin: () => mixin,
  negate: () => negate,
  noop: () => noop,
  now: () => now_default,
  object: () => object,
  omit: () => omit_default,
  once: () => once_default,
  pairs: () => pairs,
  partial: () => partial_default,
  partition: () => partition_default,
  pick: () => pick_default,
  pluck: () => pluck,
  property: () => property,
  propertyOf: () => propertyOf,
  random: () => random,
  range: () => range,
  reduce: () => reduce_default,
  reduceRight: () => reduceRight_default,
  reject: () => reject,
  rest: () => rest,
  restArguments: () => restArguments,
  result: () => result,
  sample: () => sample,
  select: () => filter,
  shuffle: () => shuffle,
  size: () => size,
  some: () => some,
  sortBy: () => sortBy,
  sortedIndex: () => sortedIndex,
  tail: () => rest,
  take: () => first,
  tap: () => tap,
  template: () => template,
  templateSettings: () => templateSettings_default,
  throttle: () => throttle,
  times: () => times,
  toArray: () => toArray,
  toPath: () => toPath,
  transpose: () => unzip,
  unescape: () => unescape_default,
  union: () => union_default,
  uniq: () => uniq,
  unique: () => uniq,
  uniqueId: () => uniqueId,
  unzip: () => unzip,
  values: () => values,
  where: () => where,
  without: () => without_default,
  wrap: () => wrap,
  zip: () => zip_default
});

// ../node_modules/underscore/modules/_setup.js
var VERSION = "1.13.6";
var root = typeof self == "object" && self.self === self && self || typeof global == "object" && global.global === global && global || Function("return this")() || {};
var ArrayProto = Array.prototype;
var ObjProto = Object.prototype;
var SymbolProto = typeof Symbol !== "undefined" ? Symbol.prototype : null;
var push = ArrayProto.push;
var slice = ArrayProto.slice;
var toString = ObjProto.toString;
var hasOwnProperty = ObjProto.hasOwnProperty;
var supportsArrayBuffer = typeof ArrayBuffer !== "undefined";
var supportsDataView = typeof DataView !== "undefined";
var nativeIsArray = Array.isArray;
var nativeKeys = Object.keys;
var nativeCreate = Object.create;
var nativeIsView = supportsArrayBuffer && ArrayBuffer.isView;
var _isNaN = isNaN;
var _isFinite = isFinite;
var hasEnumBug = !{ toString: null }.propertyIsEnumerable("toString");
var nonEnumerableProps = [
  "valueOf",
  "isPrototypeOf",
  "toString",
  "propertyIsEnumerable",
  "hasOwnProperty",
  "toLocaleString"
];
var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;

// ../node_modules/underscore/modules/restArguments.js
function restArguments(func, startIndex) {
  startIndex = startIndex == null ? func.length - 1 : +startIndex;
  return function() {
    var length = Math.max(arguments.length - startIndex, 0), rest2 = Array(length), index = 0;
    for (; index < length; index++) {
      rest2[index] = arguments[index + startIndex];
    }
    switch (startIndex) {
      case 0:
        return func.call(this, rest2);
      case 1:
        return func.call(this, arguments[0], rest2);
      case 2:
        return func.call(this, arguments[0], arguments[1], rest2);
    }
    var args = Array(startIndex + 1);
    for (index = 0; index < startIndex; index++) {
      args[index] = arguments[index];
    }
    args[startIndex] = rest2;
    return func.apply(this, args);
  };
}

// ../node_modules/underscore/modules/isObject.js
function isObject(obj) {
  var type = typeof obj;
  return type === "function" || type === "object" && !!obj;
}

// ../node_modules/underscore/modules/isNull.js
function isNull(obj) {
  return obj === null;
}

// ../node_modules/underscore/modules/isUndefined.js
function isUndefined(obj) {
  return obj === void 0;
}

// ../node_modules/underscore/modules/isBoolean.js
function isBoolean(obj) {
  return obj === true || obj === false || toString.call(obj) === "[object Boolean]";
}

// ../node_modules/underscore/modules/isElement.js
function isElement(obj) {
  return !!(obj && obj.nodeType === 1);
}

// ../node_modules/underscore/modules/_tagTester.js
function tagTester(name) {
  var tag = "[object " + name + "]";
  return function(obj) {
    return toString.call(obj) === tag;
  };
}

// ../node_modules/underscore/modules/isString.js
var isString_default = tagTester("String");

// ../node_modules/underscore/modules/isNumber.js
var isNumber_default = tagTester("Number");

// ../node_modules/underscore/modules/isDate.js
var isDate_default = tagTester("Date");

// ../node_modules/underscore/modules/isRegExp.js
var isRegExp_default = tagTester("RegExp");

// ../node_modules/underscore/modules/isError.js
var isError_default = tagTester("Error");

// ../node_modules/underscore/modules/isSymbol.js
var isSymbol_default = tagTester("Symbol");

// ../node_modules/underscore/modules/isArrayBuffer.js
var isArrayBuffer_default = tagTester("ArrayBuffer");

// ../node_modules/underscore/modules/isFunction.js
var isFunction = tagTester("Function");
var nodelist = root.document && root.document.childNodes;
if (typeof /./ != "function" && typeof Int8Array != "object" && typeof nodelist != "function") {
  isFunction = function(obj) {
    return typeof obj == "function" || false;
  };
}
var isFunction_default = isFunction;

// ../node_modules/underscore/modules/_hasObjectTag.js
var hasObjectTag_default = tagTester("Object");

// ../node_modules/underscore/modules/_stringTagBug.js
var hasStringTagBug = supportsDataView && hasObjectTag_default(new DataView(new ArrayBuffer(8)));
var isIE11 = typeof Map !== "undefined" && hasObjectTag_default(/* @__PURE__ */ new Map());

// ../node_modules/underscore/modules/isDataView.js
var isDataView = tagTester("DataView");
function ie10IsDataView(obj) {
  return obj != null && isFunction_default(obj.getInt8) && isArrayBuffer_default(obj.buffer);
}
var isDataView_default = hasStringTagBug ? ie10IsDataView : isDataView;

// ../node_modules/underscore/modules/isArray.js
var isArray_default = nativeIsArray || tagTester("Array");

// ../node_modules/underscore/modules/_has.js
function has(obj, key) {
  return obj != null && hasOwnProperty.call(obj, key);
}

// ../node_modules/underscore/modules/isArguments.js
var isArguments = tagTester("Arguments");
(function() {
  if (!isArguments(arguments)) {
    isArguments = function(obj) {
      return has(obj, "callee");
    };
  }
})();
var isArguments_default = isArguments;

// ../node_modules/underscore/modules/isFinite.js
function isFinite2(obj) {
  return !isSymbol_default(obj) && _isFinite(obj) && !isNaN(parseFloat(obj));
}

// ../node_modules/underscore/modules/isNaN.js
function isNaN2(obj) {
  return isNumber_default(obj) && _isNaN(obj);
}

// ../node_modules/underscore/modules/constant.js
function constant(value) {
  return function() {
    return value;
  };
}

// ../node_modules/underscore/modules/_createSizePropertyCheck.js
function createSizePropertyCheck(getSizeProperty) {
  return function(collection) {
    var sizeProperty = getSizeProperty(collection);
    return typeof sizeProperty == "number" && sizeProperty >= 0 && sizeProperty <= MAX_ARRAY_INDEX;
  };
}

// ../node_modules/underscore/modules/_shallowProperty.js
function shallowProperty(key) {
  return function(obj) {
    return obj == null ? void 0 : obj[key];
  };
}

// ../node_modules/underscore/modules/_getByteLength.js
var getByteLength_default = shallowProperty("byteLength");

// ../node_modules/underscore/modules/_isBufferLike.js
var isBufferLike_default = createSizePropertyCheck(getByteLength_default);

// ../node_modules/underscore/modules/isTypedArray.js
var typedArrayPattern = /\[object ((I|Ui)nt(8|16|32)|Float(32|64)|Uint8Clamped|Big(I|Ui)nt64)Array\]/;
function isTypedArray(obj) {
  return nativeIsView ? nativeIsView(obj) && !isDataView_default(obj) : isBufferLike_default(obj) && typedArrayPattern.test(toString.call(obj));
}
var isTypedArray_default = supportsArrayBuffer ? isTypedArray : constant(false);

// ../node_modules/underscore/modules/_getLength.js
var getLength_default = shallowProperty("length");

// ../node_modules/underscore/modules/_collectNonEnumProps.js
function emulatedSet(keys2) {
  var hash = {};
  for (var l = keys2.length, i = 0; i < l; ++i)
    hash[keys2[i]] = true;
  return {
    contains: function(key) {
      return hash[key] === true;
    },
    push: function(key) {
      hash[key] = true;
      return keys2.push(key);
    }
  };
}
function collectNonEnumProps(obj, keys2) {
  keys2 = emulatedSet(keys2);
  var nonEnumIdx = nonEnumerableProps.length;
  var constructor = obj.constructor;
  var proto = isFunction_default(constructor) && constructor.prototype || ObjProto;
  var prop = "constructor";
  if (has(obj, prop) && !keys2.contains(prop))
    keys2.push(prop);
  while (nonEnumIdx--) {
    prop = nonEnumerableProps[nonEnumIdx];
    if (prop in obj && obj[prop] !== proto[prop] && !keys2.contains(prop)) {
      keys2.push(prop);
    }
  }
}

// ../node_modules/underscore/modules/keys.js
function keys(obj) {
  if (!isObject(obj))
    return [];
  if (nativeKeys)
    return nativeKeys(obj);
  var keys2 = [];
  for (var key in obj)
    if (has(obj, key))
      keys2.push(key);
  if (hasEnumBug)
    collectNonEnumProps(obj, keys2);
  return keys2;
}

// ../node_modules/underscore/modules/isEmpty.js
function isEmpty(obj) {
  if (obj == null)
    return true;
  var length = getLength_default(obj);
  if (typeof length == "number" && (isArray_default(obj) || isString_default(obj) || isArguments_default(obj)))
    return length === 0;
  return getLength_default(keys(obj)) === 0;
}

// ../node_modules/underscore/modules/isMatch.js
function isMatch(object2, attrs) {
  var _keys = keys(attrs), length = _keys.length;
  if (object2 == null)
    return !length;
  var obj = Object(object2);
  for (var i = 0; i < length; i++) {
    var key = _keys[i];
    if (attrs[key] !== obj[key] || !(key in obj))
      return false;
  }
  return true;
}

// ../node_modules/underscore/modules/underscore.js
function _(obj) {
  if (obj instanceof _)
    return obj;
  if (!(this instanceof _))
    return new _(obj);
  this._wrapped = obj;
}
_.VERSION = VERSION;
_.prototype.value = function() {
  return this._wrapped;
};
_.prototype.valueOf = _.prototype.toJSON = _.prototype.value;
_.prototype.toString = function() {
  return String(this._wrapped);
};

// ../node_modules/underscore/modules/_toBufferView.js
function toBufferView(bufferSource) {
  return new Uint8Array(
    bufferSource.buffer || bufferSource,
    bufferSource.byteOffset || 0,
    getByteLength_default(bufferSource)
  );
}

// ../node_modules/underscore/modules/isEqual.js
var tagDataView = "[object DataView]";
function eq(a, b, aStack, bStack) {
  if (a === b)
    return a !== 0 || 1 / a === 1 / b;
  if (a == null || b == null)
    return false;
  if (a !== a)
    return b !== b;
  var type = typeof a;
  if (type !== "function" && type !== "object" && typeof b != "object")
    return false;
  return deepEq(a, b, aStack, bStack);
}
function deepEq(a, b, aStack, bStack) {
  if (a instanceof _)
    a = a._wrapped;
  if (b instanceof _)
    b = b._wrapped;
  var className = toString.call(a);
  if (className !== toString.call(b))
    return false;
  if (hasStringTagBug && className == "[object Object]" && isDataView_default(a)) {
    if (!isDataView_default(b))
      return false;
    className = tagDataView;
  }
  switch (className) {
    case "[object RegExp]":
    case "[object String]":
      return "" + a === "" + b;
    case "[object Number]":
      if (+a !== +a)
        return +b !== +b;
      return +a === 0 ? 1 / +a === 1 / b : +a === +b;
    case "[object Date]":
    case "[object Boolean]":
      return +a === +b;
    case "[object Symbol]":
      return SymbolProto.valueOf.call(a) === SymbolProto.valueOf.call(b);
    case "[object ArrayBuffer]":
    case tagDataView:
      return deepEq(toBufferView(a), toBufferView(b), aStack, bStack);
  }
  var areArrays = className === "[object Array]";
  if (!areArrays && isTypedArray_default(a)) {
    var byteLength = getByteLength_default(a);
    if (byteLength !== getByteLength_default(b))
      return false;
    if (a.buffer === b.buffer && a.byteOffset === b.byteOffset)
      return true;
    areArrays = true;
  }
  if (!areArrays) {
    if (typeof a != "object" || typeof b != "object")
      return false;
    var aCtor = a.constructor, bCtor = b.constructor;
    if (aCtor !== bCtor && !(isFunction_default(aCtor) && aCtor instanceof aCtor && isFunction_default(bCtor) && bCtor instanceof bCtor) && ("constructor" in a && "constructor" in b)) {
      return false;
    }
  }
  aStack = aStack || [];
  bStack = bStack || [];
  var length = aStack.length;
  while (length--) {
    if (aStack[length] === a)
      return bStack[length] === b;
  }
  aStack.push(a);
  bStack.push(b);
  if (areArrays) {
    length = a.length;
    if (length !== b.length)
      return false;
    while (length--) {
      if (!eq(a[length], b[length], aStack, bStack))
        return false;
    }
  } else {
    var _keys = keys(a), key;
    length = _keys.length;
    if (keys(b).length !== length)
      return false;
    while (length--) {
      key = _keys[length];
      if (!(has(b, key) && eq(a[key], b[key], aStack, bStack)))
        return false;
    }
  }
  aStack.pop();
  bStack.pop();
  return true;
}
function isEqual(a, b) {
  return eq(a, b);
}

// ../node_modules/underscore/modules/allKeys.js
function allKeys(obj) {
  if (!isObject(obj))
    return [];
  var keys2 = [];
  for (var key in obj)
    keys2.push(key);
  if (hasEnumBug)
    collectNonEnumProps(obj, keys2);
  return keys2;
}

// ../node_modules/underscore/modules/_methodFingerprint.js
function ie11fingerprint(methods) {
  var length = getLength_default(methods);
  return function(obj) {
    if (obj == null)
      return false;
    var keys2 = allKeys(obj);
    if (getLength_default(keys2))
      return false;
    for (var i = 0; i < length; i++) {
      if (!isFunction_default(obj[methods[i]]))
        return false;
    }
    return methods !== weakMapMethods || !isFunction_default(obj[forEachName]);
  };
}
var forEachName = "forEach";
var hasName = "has";
var commonInit = ["clear", "delete"];
var mapTail = ["get", hasName, "set"];
var mapMethods = commonInit.concat(forEachName, mapTail);
var weakMapMethods = commonInit.concat(mapTail);
var setMethods = ["add"].concat(commonInit, forEachName, hasName);

// ../node_modules/underscore/modules/isMap.js
var isMap_default = isIE11 ? ie11fingerprint(mapMethods) : tagTester("Map");

// ../node_modules/underscore/modules/isWeakMap.js
var isWeakMap_default = isIE11 ? ie11fingerprint(weakMapMethods) : tagTester("WeakMap");

// ../node_modules/underscore/modules/isSet.js
var isSet_default = isIE11 ? ie11fingerprint(setMethods) : tagTester("Set");

// ../node_modules/underscore/modules/isWeakSet.js
var isWeakSet_default = tagTester("WeakSet");

// ../node_modules/underscore/modules/values.js
function values(obj) {
  var _keys = keys(obj);
  var length = _keys.length;
  var values2 = Array(length);
  for (var i = 0; i < length; i++) {
    values2[i] = obj[_keys[i]];
  }
  return values2;
}

// ../node_modules/underscore/modules/pairs.js
function pairs(obj) {
  var _keys = keys(obj);
  var length = _keys.length;
  var pairs2 = Array(length);
  for (var i = 0; i < length; i++) {
    pairs2[i] = [_keys[i], obj[_keys[i]]];
  }
  return pairs2;
}

// ../node_modules/underscore/modules/invert.js
function invert(obj) {
  var result2 = {};
  var _keys = keys(obj);
  for (var i = 0, length = _keys.length; i < length; i++) {
    result2[obj[_keys[i]]] = _keys[i];
  }
  return result2;
}

// ../node_modules/underscore/modules/functions.js
function functions(obj) {
  var names = [];
  for (var key in obj) {
    if (isFunction_default(obj[key]))
      names.push(key);
  }
  return names.sort();
}

// ../node_modules/underscore/modules/_createAssigner.js
function createAssigner(keysFunc, defaults) {
  return function(obj) {
    var length = arguments.length;
    if (defaults)
      obj = Object(obj);
    if (length < 2 || obj == null)
      return obj;
    for (var index = 1; index < length; index++) {
      var source = arguments[index], keys2 = keysFunc(source), l = keys2.length;
      for (var i = 0; i < l; i++) {
        var key = keys2[i];
        if (!defaults || obj[key] === void 0)
          obj[key] = source[key];
      }
    }
    return obj;
  };
}

// ../node_modules/underscore/modules/extend.js
var extend_default = createAssigner(allKeys);

// ../node_modules/underscore/modules/extendOwn.js
var extendOwn_default = createAssigner(keys);

// ../node_modules/underscore/modules/defaults.js
var defaults_default = createAssigner(allKeys, true);

// ../node_modules/underscore/modules/_baseCreate.js
function ctor() {
  return function() {
  };
}
function baseCreate(prototype) {
  if (!isObject(prototype))
    return {};
  if (nativeCreate)
    return nativeCreate(prototype);
  var Ctor = ctor();
  Ctor.prototype = prototype;
  var result2 = new Ctor();
  Ctor.prototype = null;
  return result2;
}

// ../node_modules/underscore/modules/create.js
function create(prototype, props) {
  var result2 = baseCreate(prototype);
  if (props)
    extendOwn_default(result2, props);
  return result2;
}

// ../node_modules/underscore/modules/clone.js
function clone(obj) {
  if (!isObject(obj))
    return obj;
  return isArray_default(obj) ? obj.slice() : extend_default({}, obj);
}

// ../node_modules/underscore/modules/tap.js
function tap(obj, interceptor) {
  interceptor(obj);
  return obj;
}

// ../node_modules/underscore/modules/toPath.js
function toPath(path) {
  return isArray_default(path) ? path : [path];
}
_.toPath = toPath;

// ../node_modules/underscore/modules/_toPath.js
function toPath2(path) {
  return _.toPath(path);
}

// ../node_modules/underscore/modules/_deepGet.js
function deepGet(obj, path) {
  var length = path.length;
  for (var i = 0; i < length; i++) {
    if (obj == null)
      return void 0;
    obj = obj[path[i]];
  }
  return length ? obj : void 0;
}

// ../node_modules/underscore/modules/get.js
function get(object2, path, defaultValue) {
  var value = deepGet(object2, toPath2(path));
  return isUndefined(value) ? defaultValue : value;
}

// ../node_modules/underscore/modules/has.js
function has2(obj, path) {
  path = toPath2(path);
  var length = path.length;
  for (var i = 0; i < length; i++) {
    var key = path[i];
    if (!has(obj, key))
      return false;
    obj = obj[key];
  }
  return !!length;
}

// ../node_modules/underscore/modules/identity.js
function identity(value) {
  return value;
}

// ../node_modules/underscore/modules/matcher.js
function matcher(attrs) {
  attrs = extendOwn_default({}, attrs);
  return function(obj) {
    return isMatch(obj, attrs);
  };
}

// ../node_modules/underscore/modules/property.js
function property(path) {
  path = toPath2(path);
  return function(obj) {
    return deepGet(obj, path);
  };
}

// ../node_modules/underscore/modules/_optimizeCb.js
function optimizeCb(func, context, argCount) {
  if (context === void 0)
    return func;
  switch (argCount == null ? 3 : argCount) {
    case 1:
      return function(value) {
        return func.call(context, value);
      };
    case 3:
      return function(value, index, collection) {
        return func.call(context, value, index, collection);
      };
    case 4:
      return function(accumulator, value, index, collection) {
        return func.call(context, accumulator, value, index, collection);
      };
  }
  return function() {
    return func.apply(context, arguments);
  };
}

// ../node_modules/underscore/modules/_baseIteratee.js
function baseIteratee(value, context, argCount) {
  if (value == null)
    return identity;
  if (isFunction_default(value))
    return optimizeCb(value, context, argCount);
  if (isObject(value) && !isArray_default(value))
    return matcher(value);
  return property(value);
}

// ../node_modules/underscore/modules/iteratee.js
function iteratee(value, context) {
  return baseIteratee(value, context, Infinity);
}
_.iteratee = iteratee;

// ../node_modules/underscore/modules/_cb.js
function cb(value, context, argCount) {
  if (_.iteratee !== iteratee)
    return _.iteratee(value, context);
  return baseIteratee(value, context, argCount);
}

// ../node_modules/underscore/modules/mapObject.js
function mapObject(obj, iteratee2, context) {
  iteratee2 = cb(iteratee2, context);
  var _keys = keys(obj), length = _keys.length, results = {};
  for (var index = 0; index < length; index++) {
    var currentKey = _keys[index];
    results[currentKey] = iteratee2(obj[currentKey], currentKey, obj);
  }
  return results;
}

// ../node_modules/underscore/modules/noop.js
function noop() {
}

// ../node_modules/underscore/modules/propertyOf.js
function propertyOf(obj) {
  if (obj == null)
    return noop;
  return function(path) {
    return get(obj, path);
  };
}

// ../node_modules/underscore/modules/times.js
function times(n, iteratee2, context) {
  var accum = Array(Math.max(0, n));
  iteratee2 = optimizeCb(iteratee2, context, 1);
  for (var i = 0; i < n; i++)
    accum[i] = iteratee2(i);
  return accum;
}

// ../node_modules/underscore/modules/random.js
function random(min2, max2) {
  if (max2 == null) {
    max2 = min2;
    min2 = 0;
  }
  return min2 + Math.floor(Math.random() * (max2 - min2 + 1));
}

// ../node_modules/underscore/modules/now.js
var now_default = Date.now || function() {
  return (/* @__PURE__ */ new Date()).getTime();
};

// ../node_modules/underscore/modules/_createEscaper.js
function createEscaper(map2) {
  var escaper = function(match) {
    return map2[match];
  };
  var source = "(?:" + keys(map2).join("|") + ")";
  var testRegexp = RegExp(source);
  var replaceRegexp = RegExp(source, "g");
  return function(string) {
    string = string == null ? "" : "" + string;
    return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
  };
}

// ../node_modules/underscore/modules/_escapeMap.js
var escapeMap_default = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#x27;",
  "`": "&#x60;"
};

// ../node_modules/underscore/modules/escape.js
var escape_default = createEscaper(escapeMap_default);

// ../node_modules/underscore/modules/_unescapeMap.js
var unescapeMap_default = invert(escapeMap_default);

// ../node_modules/underscore/modules/unescape.js
var unescape_default = createEscaper(unescapeMap_default);

// ../node_modules/underscore/modules/templateSettings.js
var templateSettings_default = _.templateSettings = {
  evaluate: /<%([\s\S]+?)%>/g,
  interpolate: /<%=([\s\S]+?)%>/g,
  escape: /<%-([\s\S]+?)%>/g
};

// ../node_modules/underscore/modules/template.js
var noMatch = /(.)^/;
var escapes = {
  "'": "'",
  "\\": "\\",
  "\r": "r",
  "\n": "n",
  "\u2028": "u2028",
  "\u2029": "u2029"
};
var escapeRegExp = /\\|'|\r|\n|\u2028|\u2029/g;
function escapeChar(match) {
  return "\\" + escapes[match];
}
var bareIdentifier = /^\s*(\w|\$)+\s*$/;
function template(text, settings, oldSettings) {
  if (!settings && oldSettings)
    settings = oldSettings;
  settings = defaults_default({}, settings, _.templateSettings);
  var matcher2 = RegExp([
    (settings.escape || noMatch).source,
    (settings.interpolate || noMatch).source,
    (settings.evaluate || noMatch).source
  ].join("|") + "|$", "g");
  var index = 0;
  var source = "__p+='";
  text.replace(matcher2, function(match, escape, interpolate, evaluate, offset) {
    source += text.slice(index, offset).replace(escapeRegExp, escapeChar);
    index = offset + match.length;
    if (escape) {
      source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
    } else if (interpolate) {
      source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
    } else if (evaluate) {
      source += "';\n" + evaluate + "\n__p+='";
    }
    return match;
  });
  source += "';\n";
  var argument = settings.variable;
  if (argument) {
    if (!bareIdentifier.test(argument))
      throw new Error(
        "variable is not a bare identifier: " + argument
      );
  } else {
    source = "with(obj||{}){\n" + source + "}\n";
    argument = "obj";
  }
  source = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + source + "return __p;\n";
  var render;
  try {
    render = new Function(argument, "_", source);
  } catch (e) {
    e.source = source;
    throw e;
  }
  var template2 = function(data) {
    return render.call(this, data, _);
  };
  template2.source = "function(" + argument + "){\n" + source + "}";
  return template2;
}

// ../node_modules/underscore/modules/result.js
function result(obj, path, fallback) {
  path = toPath2(path);
  var length = path.length;
  if (!length) {
    return isFunction_default(fallback) ? fallback.call(obj) : fallback;
  }
  for (var i = 0; i < length; i++) {
    var prop = obj == null ? void 0 : obj[path[i]];
    if (prop === void 0) {
      prop = fallback;
      i = length;
    }
    obj = isFunction_default(prop) ? prop.call(obj) : prop;
  }
  return obj;
}

// ../node_modules/underscore/modules/uniqueId.js
var idCounter = 0;
function uniqueId(prefix) {
  var id = ++idCounter + "";
  return prefix ? prefix + id : id;
}

// ../node_modules/underscore/modules/chain.js
function chain(obj) {
  var instance = _(obj);
  instance._chain = true;
  return instance;
}

// ../node_modules/underscore/modules/_executeBound.js
function executeBound(sourceFunc, boundFunc, context, callingContext, args) {
  if (!(callingContext instanceof boundFunc))
    return sourceFunc.apply(context, args);
  var self2 = baseCreate(sourceFunc.prototype);
  var result2 = sourceFunc.apply(self2, args);
  if (isObject(result2))
    return result2;
  return self2;
}

// ../node_modules/underscore/modules/partial.js
var partial = restArguments(function(func, boundArgs) {
  var placeholder = partial.placeholder;
  var bound = function() {
    var position = 0, length = boundArgs.length;
    var args = Array(length);
    for (var i = 0; i < length; i++) {
      args[i] = boundArgs[i] === placeholder ? arguments[position++] : boundArgs[i];
    }
    while (position < arguments.length)
      args.push(arguments[position++]);
    return executeBound(func, bound, this, this, args);
  };
  return bound;
});
partial.placeholder = _;
var partial_default = partial;

// ../node_modules/underscore/modules/bind.js
var bind_default = restArguments(function(func, context, args) {
  if (!isFunction_default(func))
    throw new TypeError("Bind must be called on a function");
  var bound = restArguments(function(callArgs) {
    return executeBound(func, bound, context, this, args.concat(callArgs));
  });
  return bound;
});

// ../node_modules/underscore/modules/_isArrayLike.js
var isArrayLike_default = createSizePropertyCheck(getLength_default);

// ../node_modules/underscore/modules/_flatten.js
function flatten(input, depth, strict, output) {
  output = output || [];
  if (!depth && depth !== 0) {
    depth = Infinity;
  } else if (depth <= 0) {
    return output.concat(input);
  }
  var idx = output.length;
  for (var i = 0, length = getLength_default(input); i < length; i++) {
    var value = input[i];
    if (isArrayLike_default(value) && (isArray_default(value) || isArguments_default(value))) {
      if (depth > 1) {
        flatten(value, depth - 1, strict, output);
        idx = output.length;
      } else {
        var j = 0, len = value.length;
        while (j < len)
          output[idx++] = value[j++];
      }
    } else if (!strict) {
      output[idx++] = value;
    }
  }
  return output;
}

// ../node_modules/underscore/modules/bindAll.js
var bindAll_default = restArguments(function(obj, keys2) {
  keys2 = flatten(keys2, false, false);
  var index = keys2.length;
  if (index < 1)
    throw new Error("bindAll must be passed function names");
  while (index--) {
    var key = keys2[index];
    obj[key] = bind_default(obj[key], obj);
  }
  return obj;
});

// ../node_modules/underscore/modules/memoize.js
function memoize(func, hasher) {
  var memoize2 = function(key) {
    var cache = memoize2.cache;
    var address = "" + (hasher ? hasher.apply(this, arguments) : key);
    if (!has(cache, address))
      cache[address] = func.apply(this, arguments);
    return cache[address];
  };
  memoize2.cache = {};
  return memoize2;
}

// ../node_modules/underscore/modules/delay.js
var delay_default = restArguments(function(func, wait, args) {
  return setTimeout(function() {
    return func.apply(null, args);
  }, wait);
});

// ../node_modules/underscore/modules/defer.js
var defer_default = partial_default(delay_default, _, 1);

// ../node_modules/underscore/modules/throttle.js
function throttle(func, wait, options) {
  var timeout, context, args, result2;
  var previous = 0;
  if (!options)
    options = {};
  var later = function() {
    previous = options.leading === false ? 0 : now_default();
    timeout = null;
    result2 = func.apply(context, args);
    if (!timeout)
      context = args = null;
  };
  var throttled = function() {
    var _now = now_default();
    if (!previous && options.leading === false)
      previous = _now;
    var remaining = wait - (_now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = _now;
      result2 = func.apply(context, args);
      if (!timeout)
        context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result2;
  };
  throttled.cancel = function() {
    clearTimeout(timeout);
    previous = 0;
    timeout = context = args = null;
  };
  return throttled;
}

// ../node_modules/underscore/modules/debounce.js
function debounce(func, wait, immediate) {
  var timeout, previous, args, result2, context;
  var later = function() {
    var passed = now_default() - previous;
    if (wait > passed) {
      timeout = setTimeout(later, wait - passed);
    } else {
      timeout = null;
      if (!immediate)
        result2 = func.apply(context, args);
      if (!timeout)
        args = context = null;
    }
  };
  var debounced = restArguments(function(_args) {
    context = this;
    args = _args;
    previous = now_default();
    if (!timeout) {
      timeout = setTimeout(later, wait);
      if (immediate)
        result2 = func.apply(context, args);
    }
    return result2;
  });
  debounced.cancel = function() {
    clearTimeout(timeout);
    timeout = args = context = null;
  };
  return debounced;
}

// ../node_modules/underscore/modules/wrap.js
function wrap(func, wrapper) {
  return partial_default(wrapper, func);
}

// ../node_modules/underscore/modules/negate.js
function negate(predicate) {
  return function() {
    return !predicate.apply(this, arguments);
  };
}

// ../node_modules/underscore/modules/compose.js
function compose() {
  var args = arguments;
  var start = args.length - 1;
  return function() {
    var i = start;
    var result2 = args[start].apply(this, arguments);
    while (i--)
      result2 = args[i].call(this, result2);
    return result2;
  };
}

// ../node_modules/underscore/modules/after.js
function after(times2, func) {
  return function() {
    if (--times2 < 1) {
      return func.apply(this, arguments);
    }
  };
}

// ../node_modules/underscore/modules/before.js
function before(times2, func) {
  var memo;
  return function() {
    if (--times2 > 0) {
      memo = func.apply(this, arguments);
    }
    if (times2 <= 1)
      func = null;
    return memo;
  };
}

// ../node_modules/underscore/modules/once.js
var once_default = partial_default(before, 2);

// ../node_modules/underscore/modules/findKey.js
function findKey(obj, predicate, context) {
  predicate = cb(predicate, context);
  var _keys = keys(obj), key;
  for (var i = 0, length = _keys.length; i < length; i++) {
    key = _keys[i];
    if (predicate(obj[key], key, obj))
      return key;
  }
}

// ../node_modules/underscore/modules/_createPredicateIndexFinder.js
function createPredicateIndexFinder(dir) {
  return function(array, predicate, context) {
    predicate = cb(predicate, context);
    var length = getLength_default(array);
    var index = dir > 0 ? 0 : length - 1;
    for (; index >= 0 && index < length; index += dir) {
      if (predicate(array[index], index, array))
        return index;
    }
    return -1;
  };
}

// ../node_modules/underscore/modules/findIndex.js
var findIndex_default = createPredicateIndexFinder(1);

// ../node_modules/underscore/modules/findLastIndex.js
var findLastIndex_default = createPredicateIndexFinder(-1);

// ../node_modules/underscore/modules/sortedIndex.js
function sortedIndex(array, obj, iteratee2, context) {
  iteratee2 = cb(iteratee2, context, 1);
  var value = iteratee2(obj);
  var low = 0, high = getLength_default(array);
  while (low < high) {
    var mid = Math.floor((low + high) / 2);
    if (iteratee2(array[mid]) < value)
      low = mid + 1;
    else
      high = mid;
  }
  return low;
}

// ../node_modules/underscore/modules/_createIndexFinder.js
function createIndexFinder(dir, predicateFind, sortedIndex2) {
  return function(array, item, idx) {
    var i = 0, length = getLength_default(array);
    if (typeof idx == "number") {
      if (dir > 0) {
        i = idx >= 0 ? idx : Math.max(idx + length, i);
      } else {
        length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
      }
    } else if (sortedIndex2 && idx && length) {
      idx = sortedIndex2(array, item);
      return array[idx] === item ? idx : -1;
    }
    if (item !== item) {
      idx = predicateFind(slice.call(array, i, length), isNaN2);
      return idx >= 0 ? idx + i : -1;
    }
    for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
      if (array[idx] === item)
        return idx;
    }
    return -1;
  };
}

// ../node_modules/underscore/modules/indexOf.js
var indexOf_default = createIndexFinder(1, findIndex_default, sortedIndex);

// ../node_modules/underscore/modules/lastIndexOf.js
var lastIndexOf_default = createIndexFinder(-1, findLastIndex_default);

// ../node_modules/underscore/modules/find.js
function find(obj, predicate, context) {
  var keyFinder = isArrayLike_default(obj) ? findIndex_default : findKey;
  var key = keyFinder(obj, predicate, context);
  if (key !== void 0 && key !== -1)
    return obj[key];
}

// ../node_modules/underscore/modules/findWhere.js
function findWhere(obj, attrs) {
  return find(obj, matcher(attrs));
}

// ../node_modules/underscore/modules/each.js
function each(obj, iteratee2, context) {
  iteratee2 = optimizeCb(iteratee2, context);
  var i, length;
  if (isArrayLike_default(obj)) {
    for (i = 0, length = obj.length; i < length; i++) {
      iteratee2(obj[i], i, obj);
    }
  } else {
    var _keys = keys(obj);
    for (i = 0, length = _keys.length; i < length; i++) {
      iteratee2(obj[_keys[i]], _keys[i], obj);
    }
  }
  return obj;
}

// ../node_modules/underscore/modules/map.js
function map(obj, iteratee2, context) {
  iteratee2 = cb(iteratee2, context);
  var _keys = !isArrayLike_default(obj) && keys(obj), length = (_keys || obj).length, results = Array(length);
  for (var index = 0; index < length; index++) {
    var currentKey = _keys ? _keys[index] : index;
    results[index] = iteratee2(obj[currentKey], currentKey, obj);
  }
  return results;
}

// ../node_modules/underscore/modules/_createReduce.js
function createReduce(dir) {
  var reducer = function(obj, iteratee2, memo, initial2) {
    var _keys = !isArrayLike_default(obj) && keys(obj), length = (_keys || obj).length, index = dir > 0 ? 0 : length - 1;
    if (!initial2) {
      memo = obj[_keys ? _keys[index] : index];
      index += dir;
    }
    for (; index >= 0 && index < length; index += dir) {
      var currentKey = _keys ? _keys[index] : index;
      memo = iteratee2(memo, obj[currentKey], currentKey, obj);
    }
    return memo;
  };
  return function(obj, iteratee2, memo, context) {
    var initial2 = arguments.length >= 3;
    return reducer(obj, optimizeCb(iteratee2, context, 4), memo, initial2);
  };
}

// ../node_modules/underscore/modules/reduce.js
var reduce_default = createReduce(1);

// ../node_modules/underscore/modules/reduceRight.js
var reduceRight_default = createReduce(-1);

// ../node_modules/underscore/modules/filter.js
function filter(obj, predicate, context) {
  var results = [];
  predicate = cb(predicate, context);
  each(obj, function(value, index, list) {
    if (predicate(value, index, list))
      results.push(value);
  });
  return results;
}

// ../node_modules/underscore/modules/reject.js
function reject(obj, predicate, context) {
  return filter(obj, negate(cb(predicate)), context);
}

// ../node_modules/underscore/modules/every.js
function every(obj, predicate, context) {
  predicate = cb(predicate, context);
  var _keys = !isArrayLike_default(obj) && keys(obj), length = (_keys || obj).length;
  for (var index = 0; index < length; index++) {
    var currentKey = _keys ? _keys[index] : index;
    if (!predicate(obj[currentKey], currentKey, obj))
      return false;
  }
  return true;
}

// ../node_modules/underscore/modules/some.js
function some(obj, predicate, context) {
  predicate = cb(predicate, context);
  var _keys = !isArrayLike_default(obj) && keys(obj), length = (_keys || obj).length;
  for (var index = 0; index < length; index++) {
    var currentKey = _keys ? _keys[index] : index;
    if (predicate(obj[currentKey], currentKey, obj))
      return true;
  }
  return false;
}

// ../node_modules/underscore/modules/contains.js
function contains(obj, item, fromIndex, guard) {
  if (!isArrayLike_default(obj))
    obj = values(obj);
  if (typeof fromIndex != "number" || guard)
    fromIndex = 0;
  return indexOf_default(obj, item, fromIndex) >= 0;
}

// ../node_modules/underscore/modules/invoke.js
var invoke_default = restArguments(function(obj, path, args) {
  var contextPath, func;
  if (isFunction_default(path)) {
    func = path;
  } else {
    path = toPath2(path);
    contextPath = path.slice(0, -1);
    path = path[path.length - 1];
  }
  return map(obj, function(context) {
    var method = func;
    if (!method) {
      if (contextPath && contextPath.length) {
        context = deepGet(context, contextPath);
      }
      if (context == null)
        return void 0;
      method = context[path];
    }
    return method == null ? method : method.apply(context, args);
  });
});

// ../node_modules/underscore/modules/pluck.js
function pluck(obj, key) {
  return map(obj, property(key));
}

// ../node_modules/underscore/modules/where.js
function where(obj, attrs) {
  return filter(obj, matcher(attrs));
}

// ../node_modules/underscore/modules/max.js
function max(obj, iteratee2, context) {
  var result2 = -Infinity, lastComputed = -Infinity, value, computed;
  if (iteratee2 == null || typeof iteratee2 == "number" && typeof obj[0] != "object" && obj != null) {
    obj = isArrayLike_default(obj) ? obj : values(obj);
    for (var i = 0, length = obj.length; i < length; i++) {
      value = obj[i];
      if (value != null && value > result2) {
        result2 = value;
      }
    }
  } else {
    iteratee2 = cb(iteratee2, context);
    each(obj, function(v, index, list) {
      computed = iteratee2(v, index, list);
      if (computed > lastComputed || computed === -Infinity && result2 === -Infinity) {
        result2 = v;
        lastComputed = computed;
      }
    });
  }
  return result2;
}

// ../node_modules/underscore/modules/min.js
function min(obj, iteratee2, context) {
  var result2 = Infinity, lastComputed = Infinity, value, computed;
  if (iteratee2 == null || typeof iteratee2 == "number" && typeof obj[0] != "object" && obj != null) {
    obj = isArrayLike_default(obj) ? obj : values(obj);
    for (var i = 0, length = obj.length; i < length; i++) {
      value = obj[i];
      if (value != null && value < result2) {
        result2 = value;
      }
    }
  } else {
    iteratee2 = cb(iteratee2, context);
    each(obj, function(v, index, list) {
      computed = iteratee2(v, index, list);
      if (computed < lastComputed || computed === Infinity && result2 === Infinity) {
        result2 = v;
        lastComputed = computed;
      }
    });
  }
  return result2;
}

// ../node_modules/underscore/modules/toArray.js
var reStrSymbol = /[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;
function toArray(obj) {
  if (!obj)
    return [];
  if (isArray_default(obj))
    return slice.call(obj);
  if (isString_default(obj)) {
    return obj.match(reStrSymbol);
  }
  if (isArrayLike_default(obj))
    return map(obj, identity);
  return values(obj);
}

// ../node_modules/underscore/modules/sample.js
function sample(obj, n, guard) {
  if (n == null || guard) {
    if (!isArrayLike_default(obj))
      obj = values(obj);
    return obj[random(obj.length - 1)];
  }
  var sample2 = toArray(obj);
  var length = getLength_default(sample2);
  n = Math.max(Math.min(n, length), 0);
  var last2 = length - 1;
  for (var index = 0; index < n; index++) {
    var rand = random(index, last2);
    var temp = sample2[index];
    sample2[index] = sample2[rand];
    sample2[rand] = temp;
  }
  return sample2.slice(0, n);
}

// ../node_modules/underscore/modules/shuffle.js
function shuffle(obj) {
  return sample(obj, Infinity);
}

// ../node_modules/underscore/modules/sortBy.js
function sortBy(obj, iteratee2, context) {
  var index = 0;
  iteratee2 = cb(iteratee2, context);
  return pluck(map(obj, function(value, key, list) {
    return {
      value,
      index: index++,
      criteria: iteratee2(value, key, list)
    };
  }).sort(function(left, right) {
    var a = left.criteria;
    var b = right.criteria;
    if (a !== b) {
      if (a > b || a === void 0)
        return 1;
      if (a < b || b === void 0)
        return -1;
    }
    return left.index - right.index;
  }), "value");
}

// ../node_modules/underscore/modules/_group.js
function group(behavior, partition) {
  return function(obj, iteratee2, context) {
    var result2 = partition ? [[], []] : {};
    iteratee2 = cb(iteratee2, context);
    each(obj, function(value, index) {
      var key = iteratee2(value, index, obj);
      behavior(result2, value, key);
    });
    return result2;
  };
}

// ../node_modules/underscore/modules/groupBy.js
var groupBy_default = group(function(result2, value, key) {
  if (has(result2, key))
    result2[key].push(value);
  else
    result2[key] = [value];
});

// ../node_modules/underscore/modules/indexBy.js
var indexBy_default = group(function(result2, value, key) {
  result2[key] = value;
});

// ../node_modules/underscore/modules/countBy.js
var countBy_default = group(function(result2, value, key) {
  if (has(result2, key))
    result2[key]++;
  else
    result2[key] = 1;
});

// ../node_modules/underscore/modules/partition.js
var partition_default = group(function(result2, value, pass) {
  result2[pass ? 0 : 1].push(value);
}, true);

// ../node_modules/underscore/modules/size.js
function size(obj) {
  if (obj == null)
    return 0;
  return isArrayLike_default(obj) ? obj.length : keys(obj).length;
}

// ../node_modules/underscore/modules/_keyInObj.js
function keyInObj(value, key, obj) {
  return key in obj;
}

// ../node_modules/underscore/modules/pick.js
var pick_default = restArguments(function(obj, keys2) {
  var result2 = {}, iteratee2 = keys2[0];
  if (obj == null)
    return result2;
  if (isFunction_default(iteratee2)) {
    if (keys2.length > 1)
      iteratee2 = optimizeCb(iteratee2, keys2[1]);
    keys2 = allKeys(obj);
  } else {
    iteratee2 = keyInObj;
    keys2 = flatten(keys2, false, false);
    obj = Object(obj);
  }
  for (var i = 0, length = keys2.length; i < length; i++) {
    var key = keys2[i];
    var value = obj[key];
    if (iteratee2(value, key, obj))
      result2[key] = value;
  }
  return result2;
});

// ../node_modules/underscore/modules/omit.js
var omit_default = restArguments(function(obj, keys2) {
  var iteratee2 = keys2[0], context;
  if (isFunction_default(iteratee2)) {
    iteratee2 = negate(iteratee2);
    if (keys2.length > 1)
      context = keys2[1];
  } else {
    keys2 = map(flatten(keys2, false, false), String);
    iteratee2 = function(value, key) {
      return !contains(keys2, key);
    };
  }
  return pick_default(obj, iteratee2, context);
});

// ../node_modules/underscore/modules/initial.js
function initial(array, n, guard) {
  return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
}

// ../node_modules/underscore/modules/first.js
function first(array, n, guard) {
  if (array == null || array.length < 1)
    return n == null || guard ? void 0 : [];
  if (n == null || guard)
    return array[0];
  return initial(array, array.length - n);
}

// ../node_modules/underscore/modules/rest.js
function rest(array, n, guard) {
  return slice.call(array, n == null || guard ? 1 : n);
}

// ../node_modules/underscore/modules/last.js
function last(array, n, guard) {
  if (array == null || array.length < 1)
    return n == null || guard ? void 0 : [];
  if (n == null || guard)
    return array[array.length - 1];
  return rest(array, Math.max(0, array.length - n));
}

// ../node_modules/underscore/modules/compact.js
function compact(array) {
  return filter(array, Boolean);
}

// ../node_modules/underscore/modules/flatten.js
function flatten2(array, depth) {
  return flatten(array, depth, false);
}

// ../node_modules/underscore/modules/difference.js
var difference_default = restArguments(function(array, rest2) {
  rest2 = flatten(rest2, true, true);
  return filter(array, function(value) {
    return !contains(rest2, value);
  });
});

// ../node_modules/underscore/modules/without.js
var without_default = restArguments(function(array, otherArrays) {
  return difference_default(array, otherArrays);
});

// ../node_modules/underscore/modules/uniq.js
function uniq(array, isSorted, iteratee2, context) {
  if (!isBoolean(isSorted)) {
    context = iteratee2;
    iteratee2 = isSorted;
    isSorted = false;
  }
  if (iteratee2 != null)
    iteratee2 = cb(iteratee2, context);
  var result2 = [];
  var seen = [];
  for (var i = 0, length = getLength_default(array); i < length; i++) {
    var value = array[i], computed = iteratee2 ? iteratee2(value, i, array) : value;
    if (isSorted && !iteratee2) {
      if (!i || seen !== computed)
        result2.push(value);
      seen = computed;
    } else if (iteratee2) {
      if (!contains(seen, computed)) {
        seen.push(computed);
        result2.push(value);
      }
    } else if (!contains(result2, value)) {
      result2.push(value);
    }
  }
  return result2;
}

// ../node_modules/underscore/modules/union.js
var union_default = restArguments(function(arrays) {
  return uniq(flatten(arrays, true, true));
});

// ../node_modules/underscore/modules/intersection.js
function intersection(array) {
  var result2 = [];
  var argsLength = arguments.length;
  for (var i = 0, length = getLength_default(array); i < length; i++) {
    var item = array[i];
    if (contains(result2, item))
      continue;
    var j;
    for (j = 1; j < argsLength; j++) {
      if (!contains(arguments[j], item))
        break;
    }
    if (j === argsLength)
      result2.push(item);
  }
  return result2;
}

// ../node_modules/underscore/modules/unzip.js
function unzip(array) {
  var length = array && max(array, getLength_default).length || 0;
  var result2 = Array(length);
  for (var index = 0; index < length; index++) {
    result2[index] = pluck(array, index);
  }
  return result2;
}

// ../node_modules/underscore/modules/zip.js
var zip_default = restArguments(unzip);

// ../node_modules/underscore/modules/object.js
function object(list, values2) {
  var result2 = {};
  for (var i = 0, length = getLength_default(list); i < length; i++) {
    if (values2) {
      result2[list[i]] = values2[i];
    } else {
      result2[list[i][0]] = list[i][1];
    }
  }
  return result2;
}

// ../node_modules/underscore/modules/range.js
function range(start, stop, step) {
  if (stop == null) {
    stop = start || 0;
    start = 0;
  }
  if (!step) {
    step = stop < start ? -1 : 1;
  }
  var length = Math.max(Math.ceil((stop - start) / step), 0);
  var range2 = Array(length);
  for (var idx = 0; idx < length; idx++, start += step) {
    range2[idx] = start;
  }
  return range2;
}

// ../node_modules/underscore/modules/chunk.js
function chunk(array, count) {
  if (count == null || count < 1)
    return [];
  var result2 = [];
  var i = 0, length = array.length;
  while (i < length) {
    result2.push(slice.call(array, i, i += count));
  }
  return result2;
}

// ../node_modules/underscore/modules/_chainResult.js
function chainResult(instance, obj) {
  return instance._chain ? _(obj).chain() : obj;
}

// ../node_modules/underscore/modules/mixin.js
function mixin(obj) {
  each(functions(obj), function(name) {
    var func = _[name] = obj[name];
    _.prototype[name] = function() {
      var args = [this._wrapped];
      push.apply(args, arguments);
      return chainResult(this, func.apply(_, args));
    };
  });
  return _;
}

// ../node_modules/underscore/modules/underscore-array-methods.js
each(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(name) {
  var method = ArrayProto[name];
  _.prototype[name] = function() {
    var obj = this._wrapped;
    if (obj != null) {
      method.apply(obj, arguments);
      if ((name === "shift" || name === "splice") && obj.length === 0) {
        delete obj[0];
      }
    }
    return chainResult(this, obj);
  };
});
each(["concat", "join", "slice"], function(name) {
  var method = ArrayProto[name];
  _.prototype[name] = function() {
    var obj = this._wrapped;
    if (obj != null)
      obj = method.apply(obj, arguments);
    return chainResult(this, obj);
  };
});
var underscore_array_methods_default = _;

// ../node_modules/underscore/modules/index-default.js
var _2 = mixin(modules_exports);
_2._ = _2;
var index_default_default = _2;
export {
  VERSION,
  after,
  every as all,
  allKeys,
  some as any,
  extendOwn_default as assign,
  before,
  bind_default as bind,
  bindAll_default as bindAll,
  chain,
  chunk,
  clone,
  map as collect,
  compact,
  compose,
  constant,
  contains,
  countBy_default as countBy,
  create,
  debounce,
  index_default_default as default,
  defaults_default as defaults,
  defer_default as defer,
  delay_default as delay,
  find as detect,
  difference_default as difference,
  rest as drop,
  each,
  escape_default as escape,
  every,
  extend_default as extend,
  extendOwn_default as extendOwn,
  filter,
  find,
  findIndex_default as findIndex,
  findKey,
  findLastIndex_default as findLastIndex,
  findWhere,
  first,
  flatten2 as flatten,
  reduce_default as foldl,
  reduceRight_default as foldr,
  each as forEach,
  functions,
  get,
  groupBy_default as groupBy,
  has2 as has,
  first as head,
  identity,
  contains as include,
  contains as includes,
  indexBy_default as indexBy,
  indexOf_default as indexOf,
  initial,
  reduce_default as inject,
  intersection,
  invert,
  invoke_default as invoke,
  isArguments_default as isArguments,
  isArray_default as isArray,
  isArrayBuffer_default as isArrayBuffer,
  isBoolean,
  isDataView_default as isDataView,
  isDate_default as isDate,
  isElement,
  isEmpty,
  isEqual,
  isError_default as isError,
  isFinite2 as isFinite,
  isFunction_default as isFunction,
  isMap_default as isMap,
  isMatch,
  isNaN2 as isNaN,
  isNull,
  isNumber_default as isNumber,
  isObject,
  isRegExp_default as isRegExp,
  isSet_default as isSet,
  isString_default as isString,
  isSymbol_default as isSymbol,
  isTypedArray_default as isTypedArray,
  isUndefined,
  isWeakMap_default as isWeakMap,
  isWeakSet_default as isWeakSet,
  iteratee,
  keys,
  last,
  lastIndexOf_default as lastIndexOf,
  map,
  mapObject,
  matcher,
  matcher as matches,
  max,
  memoize,
  functions as methods,
  min,
  mixin,
  negate,
  noop,
  now_default as now,
  object,
  omit_default as omit,
  once_default as once,
  pairs,
  partial_default as partial,
  partition_default as partition,
  pick_default as pick,
  pluck,
  property,
  propertyOf,
  random,
  range,
  reduce_default as reduce,
  reduceRight_default as reduceRight,
  reject,
  rest,
  restArguments,
  result,
  sample,
  filter as select,
  shuffle,
  size,
  some,
  sortBy,
  sortedIndex,
  rest as tail,
  first as take,
  tap,
  template,
  templateSettings_default as templateSettings,
  throttle,
  times,
  toArray,
  toPath,
  unzip as transpose,
  unescape_default as unescape,
  union_default as union,
  uniq,
  uniq as unique,
  uniqueId,
  unzip,
  values,
  where,
  without_default as without,
  wrap,
  zip_default as zip
};
//# sourceMappingURL=underscore.js.map
