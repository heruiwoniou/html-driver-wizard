"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var events = require("events");
var Editor = /** @class */ (function (_super) {
    tslib_1.__extends(Editor, _super);
    function Editor() {
        return _super.call(this) || this;
    }
    Editor.prototype.onSelectNode = function (o) {
    };
    Editor.prototype.resize = function () {
        this.transform.setMap(this.el.offsetWidth);
    };
    return Editor;
}(events.EventEmitter));
exports.default = Editor;
//# sourceMappingURL=editor.js.map