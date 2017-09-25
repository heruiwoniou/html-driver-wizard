"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var position_1 = require("../decorators/position");
var container_1 = require("./container");
var const_1 = require("../const");
var Background = /** @class */ (function (_super) {
    tslib_1.__extends(Background, _super);
    function Background(children) {
        var _this = _super.call(this, {
            x: 0,
            y: 0,
            width: const_1.BaseDisplay.FULL,
            height: const_1.BaseDisplay.FULL
        }, children) || this;
        _this.type = "ts-background";
        return _this;
    }
    Background = tslib_1.__decorate([
        position_1.relative
    ], Background);
    return Background;
}(container_1.default));
exports.default = Background;
