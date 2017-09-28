"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var dom_render_1 = require("./../helper/dom-render");
var dom_container_1 = require("../element/dom/dom-container");
var transform_1 = require("../helper/transform");
var editor_1 = require("./editor");
var conf = require("./../../conf/index");
/**
 * HTML编辑框
 *
 * @export
 * @class HtmlEditor
 * @extends {Editor}
 */
var HtmlEditor = /** @class */ (function (_super) {
    tslib_1.__extends(HtmlEditor, _super);
    function HtmlEditor() {
        var _this = _super.call(this) || this;
        _this.el = document.querySelector('.html');
        _this.domRender = new dom_render_1.default(document.querySelector('.html'));
        _this.node = new dom_container_1.default();
        _this.transform = new transform_1.default(conf.view.mainWidth, _this.el.offsetWidth, 'px');
        _this.node.setTransform(_this.transform);
        _this.domRender.create(_this.node.render());
        _this.node.on('onselecthandler', function (o) { return _this.onSelectNode(o); });
        return _this;
    }
    HtmlEditor.initialize = function () {
        return new HtmlEditor();
    };
    HtmlEditor.prototype.resize = function () {
        _super.prototype.resize.call(this);
        this.domRender.update(this.node.render());
    };
    return HtmlEditor;
}(editor_1.default));
exports.default = HtmlEditor;
//# sourceMappingURL=html-editor.js.map