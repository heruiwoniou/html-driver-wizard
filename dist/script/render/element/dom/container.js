"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var base_1 = require("./../base");
var const_1 = require("../const");
var merge = require("merge");
/**
 * DOM 基本的框体
 *
 * @export
 * @class Container
 * @extends {Base}
 */
var Container = /** @class */ (function (_super) {
    tslib_1.__extends(Container, _super);
    function Container(_a, children) {
        var x = _a.x, y = _a.y, width = _a.width, height = _a.height;
        var _this = _super.call(this, 'ts-dom-container', children) || this;
        _this._x = x;
        _this._y = y;
        _this.width = width;
        _this.height = height;
        _this.on('onselecthandler', function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return _this.onselecthandler.apply(_this, args);
        });
        return _this;
    }
    Object.defineProperty(Container.prototype, "staticX", {
        get: function () {
            return this._x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "staticY", {
        get: function () {
            return this._y;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "x", {
        get: function () {
            var parent = this.parent;
            return parent ? this._x - parent.x : this._x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "y", {
        get: function () {
            var parent = this.parent;
            return parent ? this._y - parent.y : this._y;
        },
        enumerable: true,
        configurable: true
    });
    Container.prototype.onselecthandler = function (container) {
        if (this.parent) {
            this.parent.emit('onselecthandler', container || this);
        }
    };
    Container.prototype.onselect = function (e) {
        this.emit('onselecthandler', this);
        e.stopPropagation();
    };
    Container.prototype.render = function (vproperties) {
        if (vproperties === void 0) { vproperties = {}; }
        vproperties = merge.recursive(true, vproperties, {
            style: {
                left: this.rootTransform.convertUnit(this.x),
                top: this.rootTransform.convertUnit(this.y),
                width: this.width === const_1.BaseDisplay.FULL ? '100%' : this.rootTransform.convertUnit(this.width),
                height: this.height === const_1.BaseDisplay.FULL ? '100%' : this.rootTransform.convertUnit(this.height)
            }
        });
        return _super.prototype.render.call(this, vproperties);
    };
    return Container;
}(base_1.default));
exports.default = Container;
//# sourceMappingURL=container.js.map