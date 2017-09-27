"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var html_editor_1 = require("./editor/html-editor");
var electron_1 = require("electron");
var psd_editor_1 = require("./editor/psd-editor");
var wind_dom_1 = require("wind-dom");
var htmlEditor, psdEditor;
var html, source;
var graphic = {
    run: function () {
        html = document.querySelector('.html');
        source = document.querySelector('.source');
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