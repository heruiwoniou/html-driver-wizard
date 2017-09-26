"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var base_1 = require("./../base");
var const_1 = require("../const");
var merge = require("merge");
var PSDBase = /** @class */ (function (_super) {
    tslib_1.__extends(PSDBase, _super);
    function PSDBase(obj, children) {
        var _this = _super.call(this, 'ts-psd-base', children) || this;
        _this._x = obj.left;
        _this._y = obj.top;
        _this.width = obj.width;
        _this.height = obj.height;
        return _this;
    }
    Object.defineProperty(PSDBase.prototype, "staticX", {
        get: function () {
            return this._x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PSDBase.prototype, "staticY", {
        get: function () {
            return this._y;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PSDBase.prototype, "x", {
        get: function () {
            var parent = this.parent;
            return parent ? this._x - parent.x : this._x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PSDBase.prototype, "y", {
        get: function () {
            var parent = this.parent;
            return parent ? this._y - parent.y : this._y;
        },
        enumerable: true,
        configurable: true
    });
    PSDBase.prototype.render = function (vproperties) {
        if (vproperties === void 0) { vproperties = {}; }
        vproperties = merge.recursive(true, vproperties, {
            style: {
                left: this.x + 'px',
                top: this.y + 'px',
                width: this.width === const_1.BaseDisplay.FULL ? '100%' : this.width + 'px',
                height: this.height === const_1.BaseDisplay.FULL ? '100%' : this.height + 'px',
            }
        });
        return _super.prototype.render.call(this, vproperties);
    };
    return PSDBase;
}(base_1.default));
exports.default = PSDBase;
//# sourceMappingURL=psd-base.js.map