"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mat_1 = require("./mat");
function load(src) {
    return new Promise(function (resolve, reject) {
        var container = document.createElement('div');
        var image = new Image();
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        var height;
        var width;
        container.style.height = '0px';
        container.style.width = '0px';
        container.style.marginLeft = '-9999px';
        container.appendChild(canvas);
        document.body.appendChild(container);
        var clear = function () {
            document.body.removeChild(container);
            container = null;
            image = null;
            canvas = null;
            ctx = null;
        };
        image.addEventListener('load', function () {
            width = canvas.width = image.naturalWidth || image.offsetWidth;
            height = canvas.height = image.naturalHeight || image.offsetHeight;
            ctx.drawImage(image, 0, 0, width, height);
            var data = ctx.getImageData(0, 0, width, height).data;
            resolve(new mat_1.default(width, height, data));
            requestAnimationFrame(clear);
        });
        image.addEventListener('error', function (err) {
            reject(err);
        });
        image.src = src;
    });
}
exports.load = load;
