"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var dom_render_1 = require("../core/helper/dom-render");
var electron_1 = require("electron");
var tree_1 = require("../core/element/psd/tree");
var editor_1 = require("./editor");
var transform_1 = require("../core/helper/transform");
var conf = require("../../conf/index");
var PSD = require("psd");
var h = require("virtual-dom/h");
var PSDEditor = /** @class */ (function (_super) {
    tslib_1.__extends(PSDEditor, _super);
    function PSDEditor() {
        var _this = _super.call(this) || this;
        _this.el = document.querySelector('.source');
        _this.domRender = new dom_render_1.default(_this.el);
        _this.transform = new transform_1.default(conf.view.mainWidth, _this.el.offsetWidth, 'px');
        _this.domRender.create(_this.render());
        electron_1.ipcRenderer.on('selected-file', function (event, files) {
            if (files.length > 0) {
                _this.analysis(files.pop());
            }
        });
        return _this;
    }
    PSDEditor.initialize = function () {
        return new PSDEditor();
    };
    PSDEditor.prototype.analysis = function (filename) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, PSD.open(filename)];
                    case 1:
                        _a.psd = _b.sent();
                        this.node = new tree_1.default(this.psd);
                        this.transform.setOrignal(this.psd.tree().width);
                        this.node.setTransform(this.transform);
                        this.domRender.update(this.render());
                        return [2 /*return*/];
                }
            });
        });
    };
    PSDEditor.prototype.onSelectFile = function () {
        electron_1.ipcRenderer.send('open-file-dialog');
    };
    PSDEditor.prototype.resize = function () {
        _super.prototype.resize.call(this);
        this.domRender.update(this.render());
    };
    PSDEditor.prototype.render = function () {
        var _this = this;
        if (this.node) {
            return this.node.render();
        }
        else {
            return h('div.ts-psd-upload', {
                style: {
                    position: 'relative',
                    height: '100%',
                    width: '100%'
                }
            }, [
                h('span'),
                h('button', {
                    onclick: function () { return _this.onSelectFile(); }
                }, '选择PSD文件')
            ]);
        }
    };
    return PSDEditor;
}(editor_1.default));
exports.default = PSDEditor;
//# sourceMappingURL=psd-editor.js.map