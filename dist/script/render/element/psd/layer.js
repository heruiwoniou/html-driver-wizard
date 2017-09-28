"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var position_1 = require("../decorators/position");
var psd_base_1 = require("./psd-base");
var Layer = /** @class */ (function (_super) {
    tslib_1.__extends(Layer, _super);
    function Layer(tree, children) {
        var _this = _super.call(this, {
            left: 0,
            top: 0,
            width: tree.width,
            height: tree.height
        }, children) || this;
        _this.type = "ts-psd-tree";
        return _this;
    }
    Layer = tslib_1.__decorate([
        position_1.relative
    ], Layer);
    return Layer;
}(psd_base_1.default));
exports.default = Layer;
//# sourceMappingURL=layer.js.map