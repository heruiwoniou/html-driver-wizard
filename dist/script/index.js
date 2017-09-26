"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var html_editor_1 = require("./editor/html-editor");
var electron_1 = require("electron");
var psd_editor_1 = require("./editor/psd-editor");
var graphic = {
    run: function () {
        this.registerEvent();
        this.initialize();
    },
    initialize: function () {
        html_editor_1.default.initialize();
        psd_editor_1.default.initialize();
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
