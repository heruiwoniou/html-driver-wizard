"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Mat = /** @class */ (function () {
    function Mat(__row, __col, __data, __buffer) {
        this.row = __row;
        this.col = __col;
        this.channel = 4;
        this.buffer = __buffer || new ArrayBuffer(__row * __col * 4);
        this.data = new Uint8ClampedArray(this.buffer);
        __data && this.data.set(__data);
        this.bytes = 1;
        this.type = 'CV_RGBA';
    }
    return Mat;
}());
exports.default = Mat;
