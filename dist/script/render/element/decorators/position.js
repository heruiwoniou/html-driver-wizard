"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
function absolute(constructor) {
    return /** @class */ (function (_super) {
        tslib_1.__extends(class_1, _super);
        function class_1() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.position = "absolute";
            return _this;
        }
        return class_1;
    }(constructor));
}
exports.absolute = absolute;
function relative(constructor) {
    return /** @class */ (function (_super) {
        tslib_1.__extends(class_2, _super);
        function class_2() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.position = "relative";
            return _this;
        }
        return class_2;
    }(constructor));
}
exports.relative = relative;
//# sourceMappingURL=position.js.map