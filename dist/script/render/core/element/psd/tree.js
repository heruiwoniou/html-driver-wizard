"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var position_1 = require("../decorators/position");
var psd_base_1 = require("./psd-base");
var const_1 = require("../const");
var index_1 = require("../../../../conf/index");
var hook_1 = require("../hook");
var h = require("virtual-dom/h");
var merge = require("merge");
var path = require("path");
var Tree = /** @class */ (function (_super) {
    tslib_1.__extends(Tree, _super);
    function Tree(psd, children) {
        var _this = this;
        var tree = psd.tree();
        _this = _super.call(this, {
            left: 0,
            top: 0,
            width: tree.width,
            height: tree.height
        }, children) || this;
        _this.type = "ts-psd-tree";
        _this.tree = tree;
        _this.psd = psd;
        return _this;
    }
    Tree.prototype.onMounted = function (node) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var filename, img;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _super.prototype.onMounted.call(this, node);
                        filename = path.join(index_1.default.root, 'assets', 'main.png');
                        return [4 /*yield*/, this.psd.image.saveAsPng(filename)];
                    case 1:
                        _a.sent();
                        img = new Image();
                        img.src = filename;
                        this.el.querySelector('div.ts-psd-background').appendChild(img);
                        return [2 /*return*/];
                }
            });
        });
    };
    Tree.prototype.render = function (vproperties) {
        var _this = this;
        if (vproperties === void 0) { vproperties = {}; }
        var self = this;
        vproperties = merge.recursive(vproperties, {
            style: {
                left: this.x + 'px',
                top: this.y + 'px',
                width: this.width === const_1.BaseDisplay.FULL ? '100%' : this.width + 'px',
                height: this.height === const_1.BaseDisplay.FULL ? '100%' : this.height + 'px',
                position: this.position
            },
            onclick: function (e) { return _this.onselect(e); }
        });
        vproperties.mounted = hook_1.Mounted(function (node) {
            _this.onMounted(node);
        });
        return h(this.type ? this.tagName + "." + this.type : "" + this.tagName, vproperties, [h('div.ts-psd-background')].concat(this.map(function (child) { return child.render(); })));
    };
    Tree = tslib_1.__decorate([
        position_1.relative
    ], Tree);
    return Tree;
}(psd_base_1.default));
exports.default = Tree;
//# sourceMappingURL=tree.js.map