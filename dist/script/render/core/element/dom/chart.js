"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var base_1 = require("./../base");
var loading_1 = require("./loading");
var position_1 = require("../decorators/position");
var Chart = /** @class */ (function (_super) {
    tslib_1.__extends(Chart, _super);
    function Chart() {
        var _this = _super.call(this, 'ts-dom-chart') || this;
        _this.push(new loading_1.default());
        return _this;
    }
    Chart.prototype.render = function () {
        return _super.prototype.render.call(this, { style: { height: '100%', width: '100%' } });
    };
    Chart = tslib_1.__decorate([
        position_1.relative
    ], Chart);
    return Chart;
}(base_1.default));
exports.default = Chart;
//# sourceMappingURL=chart.js.map