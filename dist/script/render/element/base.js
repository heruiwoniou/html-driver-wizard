"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var utils_1 = require("./utils");
var h = require("virtual-dom/h");
var position_1 = require("./decorators/position");
var merge = require("merge");
var hook_1 = require("./hook");
var events = require("events");
/**
 * 页面可选框的基本类
 *
 * @export
 * @class Base
 * @extends {events.EventEmitter}
 */
var Base = /** @class */ (function (_super) {
    tslib_1.__extends(Base, _super);
    function Base(type, children) {
        if (type === void 0) { type = 'base'; }
        var _this = _super.call(this) || this;
        _this.tagName = 'div';
        _this._uid = Math.round(Math.random() * 1e5);
        _this.type = type;
        children ?
            children.forEach(function (child) {
                _this.push(child);
            }) : null;
        return _this;
    }
    Object.defineProperty(Base.prototype, "rootTransform", {
        get: function () {
            var parent = this;
            do {
                if (parent.isRoot)
                    return parent.transform;
            } while ((parent = this.parent));
        },
        enumerable: true,
        configurable: true
    });
    Base.prototype.push = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        args.forEach(function (child) { return child.parent = _this; });
        return utils_1.push.apply(void 0, [this].concat(args));
    };
    Base.prototype.forEach = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return utils_1.forEach.apply(void 0, [this].concat(args));
    };
    Base.prototype.slice = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return utils_1.slice.apply(void 0, [this].concat(args));
    };
    Base.prototype.toArray = function () {
        return this.slice();
    };
    Base.prototype.map = function (dispose) {
        var result = [];
        this.forEach(function (child) { return result.push(dispose(child)); });
        return result;
    };
    Base.prototype.onselect = function (e) {
    };
    Base.prototype.onMounted = function (node) {
        this.el = node;
        this.emit('mounted', this);
    };
    Base.prototype.render = function (vproperties) {
        var _this = this;
        if (vproperties === void 0) { vproperties = {}; }
        var self = this;
        vproperties = merge.recursive(vproperties, {
            style: {
                position: this.position
            },
            onclick: function (e) { return _this.onselect(e); }
        });
        vproperties.mounted = hook_1.Mounted(function (node) {
            _this.onMounted(node);
        });
        return h(this.type ? this.tagName + "." + this.type : "" + this.tagName, vproperties, this.map(function (child) { return child.render(); }));
    };
    Base = tslib_1.__decorate([
        position_1.absolute
    ], Base);
    return Base;
}(events.EventEmitter));
exports.default = Base;
//# sourceMappingURL=base.js.map