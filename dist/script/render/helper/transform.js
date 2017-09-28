"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var events = require("events");
var Transform = /** @class */ (function (_super) {
    tslib_1.__extends(Transform, _super);
    function Transform(original, map, unit) {
        var _this = _super.call(this) || this;
        _this.original = original;
        _this.map = map;
        _this.unit = unit ? unit : 'px';
        return _this;
    }
    Transform.prototype.setOrignal = function (orignialNumber) {
        this.original = orignialNumber;
    };
    Transform.prototype.setMap = function (mapNumber) {
        this.map = mapNumber;
    };
    Transform.prototype.setUnit = function (unitString) {
        this.unit = unitString;
    };
    Transform.prototype.convert = function (realNumber) {
        return realNumber * this.map / this.original;
    };
    Transform.prototype.convertUnit = function (realNumber) {
        return this.convert(realNumber) + this.unit;
    };
    return Transform;
}(events.EventEmitter));
exports.default = Transform;
//# sourceMappingURL=transform.js.map