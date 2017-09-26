"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var utils_1 = require("./utils");
function Mounted(value) {
    if (!(this instanceof Mounted)) {
        return new Mounted(value);
    }
    this.value = value;
}
exports.Mounted = Mounted;
Mounted.prototype.hook = function (node, propertyName, previousValue) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, utils_1.when(function () { return !!node.parentNode; })];
                case 1:
                    _a.sent();
                    this.value(node);
                    return [2 /*return*/];
            }
        });
    });
};
//# sourceMappingURL=hook.js.map