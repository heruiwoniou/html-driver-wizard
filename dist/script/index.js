"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var html_editor_1 = require("./editor/html-editor");
var electron_1 = require("electron");
var graphic = {
    run: function () {
        document.querySelector('header a').addEventListener('click', function () {
            electron_1.ipcRenderer.sendSync('win-close');
        });
        html_editor_1.default.initialize();
    }
};
window.addEventListener('load', function () {
    graphic.run();
});
exports.default = graphic;
