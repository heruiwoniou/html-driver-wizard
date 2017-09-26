"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var dom_render_1 = require("./../core/helper/dom-render");
var events = require("events");
var dom_container_1 = require("../core/element/dom/dom-container");
var HtmlEditor = /** @class */ (function (_super) {
    tslib_1.__extends(HtmlEditor, _super);
    function HtmlEditor() {
        var _this = _super.call(this) || this;
        _this.domRender = new dom_render_1.default(document.querySelector('.html'));
        _this.node = new dom_container_1.default();
        _this.domRender.create(_this.node.render());
        _this.node.on('onselecthandler', function (o) { return _this.onSelectNode(o); });
        return _this;
    }
    HtmlEditor.initialize = function () {
        return new HtmlEditor();
    };
    HtmlEditor.prototype.onSelectNode = function (o) {
    };
    return HtmlEditor;
}(events.EventEmitter));
exports.default = HtmlEditor;
