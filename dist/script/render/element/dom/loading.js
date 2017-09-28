"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var base_1 = require("./../base");
var h = require("virtual-dom/h");
var hook_1 = require("./../hook");
/**
 * DOM 内的 chart框加载状态图标
 *
 * @export
 * @class Loading
 * @extends {Base}
 */
var Loading = /** @class */ (function (_super) {
    tslib_1.__extends(Loading, _super);
    function Loading() {
        return _super.call(this, 'loading') || this;
    }
    Loading.prototype.render = function () {
        return h('svg.ts-dom-loading', {
            style: {
                width: this.rootTransform.convertUnit(24),
                height: this.rootTransform.convertUnit(30)
            },
            mounted: hook_1.Mounted(function (node) {
                node.parentNode.innerHTML = node.outerHTML;
            })
        }, [
            h('use', {
                attributes: {
                    'xmlns:xlink': "http://www.w3.org/1999/xlink",
                    'xlink:href': '#loading'
                }
            })
        ]);
    };
    return Loading;
}(base_1.default));
exports.default = Loading;
//# sourceMappingURL=loading.js.map