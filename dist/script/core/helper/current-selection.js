"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var h = require("virtual-dom/h");
var dom_render_1 = require("./dom-render");
var const_1 = require("../element/const");
var CurrentSelection = /** @class */ (function () {
    function CurrentSelection() {
        var _this = this;
        this.domRender = new dom_render_1.default(document.querySelector('.html'));
        this.domRender.create(this.render());
        this.outClickListener = function () {
            _this.clear();
        };
    }
    CurrentSelection.prototype.set = function (base) {
        this.current = base;
        this.domRender.update(this.render());
        document.addEventListener('click', this.outClickListener, false);
    };
    CurrentSelection.prototype.clear = function () {
        this.current = null;
        document.removeEventListener('click', this.outClickListener);
        this.domRender.update(this.render());
    };
    CurrentSelection.prototype.render = function () {
        var style = this.current ? {
            left: this.current.staticX + 'px',
            top: this.current.staticY + 'px',
            width: (this.current.width == const_1.BaseDisplay.FULL ? this.current.el.offsetWidth : this.current.width) + 'px',
            height: (this.current.height == const_1.BaseDisplay.FULL ? this.current.el.offsetHeight : this.current.height) + 'px',
        } : null;
        return this.current ? (h("div", { className: "current-selection", style: "position: absolute; left: 0; top: 0;" },
            h("div", { className: "selection-box", style: style }))) : (h("div", { className: "current-selection", style: "position: absolute; left: 0; top: 0;" }));
    };
    return CurrentSelection;
}());
exports.default = CurrentSelection;
