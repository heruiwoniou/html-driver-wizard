"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var html_editor_1 = require("./editor/html-editor");
var electron_1 = require("electron");
var psd_editor_1 = require("./editor/psd-editor");
var htmlEditor, psdEditor;
var graphic = {
    run: function () {
        this.initialize();
        this.registerEvent();
    },
    initialize: function () {
        htmlEditor = html_editor_1.default.initialize();
        psdEditor = psd_editor_1.default.initialize();
    },
    registerEvent: function () {
        document.querySelector('header a').addEventListener('click', function () {
            electron_1.ipcRenderer.sendSync('win-close');
        });
    }
};
window.addEventListener('load', function () {
    graphic.run();
});
exports.default = graphic;
//# sourceMappingURL=index.js.map