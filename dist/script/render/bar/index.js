"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var events = require("events");
var h = require("virtual-dom/h");
var hook_1 = require("../element/hook");
var dom_render_1 = require("../helper/dom-render");
var Bar = /** @class */ (function (_super) {
    tslib_1.__extends(Bar, _super);
    function Bar(buttons) {
        var _this = _super.call(this) || this;
        _this.buttons = buttons;
        return _this;
    }
    Bar.prototype.mount = function (el) {
        this.domRender = new dom_render_1.default(el);
        this.domRender.create(this.render());
        return this;
    };
    Bar.prototype.setState = function (buttons) {
    };
    Bar.prototype.render = function () {
        var _this = this;
        return (h("ul", { className: "bar-container", mounted: hook_1.Mounted(function (node) {
                if (!_this.mounted) {
                    _this.el = node;
                    _this.mounted = true;
                    if (_this.mountTarget)
                        _this.mountTarget.appendChild(_this.el);
                }
            }) }, this.buttons.map(function (btn) {
            return (h("a", { href: "javascript:;", title: btn.name, className: btn.cls, onclick: function (e) { return _this.emit('click', e, btn.cmd); } }));
        })));
    };
    return Bar;
}(events.EventEmitter));
exports.default = Bar;
//# sourceMappingURL=index.js.map