"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var dom_render_1 = require("../core/helper/dom-render");
var events = require("events");
var h = require("virtual-dom/h");
var PSDEditor = /** @class */ (function (_super) {
    tslib_1.__extends(PSDEditor, _super);
    function PSDEditor() {
        var _this = _super.call(this) || this;
        _this.domRender = new dom_render_1.default(document.querySelector('.source'));
        _this.domRender.create(_this.render());
        return _this;
        // this.node.on('onselecthandler', o => this.onSelectNode(o))
    }
    PSDEditor.initialize = function () {
        return new PSDEditor();
    };
    PSDEditor.prototype.onSelectNode = function (o) {
    };
    PSDEditor.prototype.render = function () {
        return h('div.upload', {
            style: {
                position: 'relative',
                height: '100%',
                width: '100%'
            }
        }, [
            h('span'),
            h('button', null, '选择PSD文件')
        ]);
    };
    return PSDEditor;
}(events.EventEmitter));
exports.default = PSDEditor;
