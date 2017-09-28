"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var html_editor_1 = require("./editor/html-editor");
var psd_editor_1 = require("./editor/psd-editor");
var index_1 = require("./bar/index");
var wind_dom_1 = require("wind-dom");
var htmlEditor, psdEditor;
var htmlbar, psdbar;
var html, source;
var graphic = {
    run: function () {
        html = document.querySelector('.html');
        source = document.querySelector('.psd');
        this.initialize();
        this.registerEvent();
    },
    initialize: function () {
        htmlEditor = html_editor_1.default.initialize();
        psdEditor = psd_editor_1.default.initialize();
        htmlbar = new index_1.default([
            { name: '清空', cls: 'fa fa-trash-o', cmd: 'html-remove' }
        ]).mount(document.querySelector('.html-toolbar'));
        psdbar = new index_1.default([
            { name: '清空', cls: 'fa fa-trash-o', cmd: 'psd-remove' }
        ]).mount(document.querySelector('.psd-toolbar'));
    },
    registerEvent: function () {
        psdbar.on('click', function (e) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            return psdEditor.emit.apply(psdEditor, args);
        });
        document.querySelector('header a.fa-close').addEventListener('click', function () {
            electron_1.ipcRenderer.sendSync('win-close');
        });
        var resizeTime;
        window.addEventListener('resize', function () {
            wind_dom_1.addClass(html, 'resize');
            wind_dom_1.addClass(source, 'resize');
            wind_dom_1.setStyle(source.querySelector('img'), 'display', 'none');
            clearTimeout(resizeTime);
            resizeTime =
                setTimeout(function () {
                    htmlEditor.resize();
                    psdEditor.resize();
                    wind_dom_1.removeClass(html, 'resize');
                    wind_dom_1.removeClass(source, 'resize');
                }, 200);
        });
    }
};
window.addEventListener('load', function () {
    setTimeout(function () {
        return graphic.run();
    });
});
exports.default = graphic;
//# sourceMappingURL=index.js.map