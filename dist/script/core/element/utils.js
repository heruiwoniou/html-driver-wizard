"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var merge = require("merge");
var _push = Array.prototype.push;
var _splice = Array.prototype.splice;
var _forEach = Array.prototype.forEach;
var _slice = Array.prototype.slice;
exports.push = function (context) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return _push.apply(context, args.slice());
};
exports.splice = function (context) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return _splice.apply(context, args.slice());
};
exports.forEach = function (context) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return _forEach.apply(context, args.slice());
};
exports.slice = function (context) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return _slice.apply(context, args.slice());
};
function when(condition, setting) {
    if (setting === void 0) { setting = {}; }
    var privateSetting = {
        time: null,
        loops: 0,
        resolve: null,
        reject: null
    };
    setting = merge.recursive(true, setting, {
        count: 10,
        delay: 500
    }, setting);
    var clear = function () {
        clearTimeout(privateSetting.time);
        privateSetting.time = null;
    };
    var loop = function () {
        if (privateSetting.loops++ >= setting.count) {
            clear();
            privateSetting.reject(new Error('Failure to meet conditions'));
        }
        else if (condition()) {
            clear();
            privateSetting.resolve();
        }
        else
            privateSetting.time = setTimeout(loop, setting.delay);
    };
    return new Promise(function (resolve, reject) {
        privateSetting.resolve = resolve;
        privateSetting.reject = reject;
        privateSetting.time = loop();
    });
}
exports.when = when;
