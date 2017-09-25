"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var base_1 = require("./../base");
var h = require("virtual-dom/h");
var hook_1 = require("./../hook");
var Loading = /** @class */ (function (_super) {
    tslib_1.__extends(Loading, _super);
    function Loading() {
        return _super.call(this, 'loading') || this;
    }
    Loading.prototype.render = function () {
        return h('svg.loading', {
            style: {
                width: '24px',
                height: '30px'
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
