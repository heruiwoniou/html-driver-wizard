"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var diff = require("virtual-dom/diff");
var patch = require("virtual-dom/patch");
var create = require("virtual-dom/create-element");
var DomRender = /** @class */ (function () {
    function DomRender(dom) {
        this.el = dom;
    }
    DomRender.prototype.create = function (tree) {
        this.tree = tree;
        this.rootNode = create(tree);
        this.el.appendChild(this.rootNode);
    };
    DomRender.prototype.update = function (tree) {
        var patches = diff(this.tree, tree);
        this.rootNode = patch(this.rootNode, patches);
        this.tree = tree;
    };
    return DomRender;
}());
exports.default = DomRender;
//# sourceMappingURL=dom-render.js.map