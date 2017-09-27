"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var position_1 = require("../decorators/position");
var container_1 = require("./container");
var const_1 = require("../const");
var DOMContainer = /** @class */ (function (_super) {
    tslib_1.__extends(DOMContainer, _super);
    function DOMContainer(children) {
        var _this = _super.call(this, {
            x: 0,
            y: 0,
            width: const_1.BaseDisplay.FULL,
            height: const_1.BaseDisplay.FULL
        }, children) || this;
        _this.type = "ts-dom-background";
        _this.isRoot = true;
        return _this;
    }
    DOMContainer.prototype.setTransform = function (value) {
        this.transform = value;
    };
    DOMContainer = tslib_1.__decorate([
        position_1.relative
    ], DOMContainer);
    return DOMContainer;
}(container_1.default));
exports.default = DOMContainer;
//# sourceMappingURL=dom-container.js.map