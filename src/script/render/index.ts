import { ipcRenderer } from "electron";
import Bar from "./bar";
import HtmlEditor from "./editor/html-editor";
import PSDEditor from "./editor/psd-editor";

import { addClass, removeClass, setStyle } from "wind-dom";

let htmlEditor, psdEditor: PSDEditor;
let htmlbar, psdbar;
let html, source;
let main;

const graphic = {
  run() {

    main = document.querySelector(".main");
    html = document.querySelector(".html");
    source = document.querySelector(".psd");

    this.initialize();
    this.registerEvent();
  },
  initialize() {
    htmlEditor = HtmlEditor.initialize();
    psdEditor = PSDEditor.initialize();
    htmlbar = new Bar(
      [
        { name: "清空", cls: "fa fa-trash-o", cmd: "html-remove" },
        "|",
        { name: "sticky-note-o", cls: "fa fa-sticky-note-o", cmd: "html-create-new" },
      ],
      document.querySelector(".html-toolbar"));

    psdbar = new Bar(
      [
        { name: "清除PSD文件", cls: "fa fa-trash-o", cmd: "psd-remove" },
        { name: "清空选择", cls: "fa fa-times-rectangle-o", cmd: "clear-all-layers" },
        "|",
        { name: "切片导出", cls: "fa fa-image", cmd: "export-layer-images" },
        { name: "导出到内容", cls: "fa fa-files-o", cmd: "export-layer-images2container", args: [htmlEditor] },
      ], document.querySelector(".psd-toolbar"));

  },
  registerEvent() {

    htmlbar.on("click", (e, cmd, ...args) => htmlEditor.invoke(cmd, ...args));
    psdbar.on("click", (e, cmd, ...args) => psdEditor.invoke(cmd, ...args));

    window.addEventListener("keydown", (e) => {
      if (!psdEditor.spacePress && e.keyCode === 32) {
        psdEditor.spacePress = true;
        addClass(main, "grab");
      }

      if (!psdEditor.spacePress && e.keyCode === 18) {
        psdEditor.altPress = true;
        addClass(main, "zoom");
      }
    });

    window.addEventListener("keyup", (e) => {
      if (psdEditor.spacePress && e.keyCode === 32) {
        psdEditor.spacePress = false;
        removeClass(main, "grab");
        removeClass(main, "grabbing");
      }
      if (psdEditor.altPress && e.keyCode === 18) {
        psdEditor.altPress = false;
        removeClass(main, "zoom");
        removeClass(main, "zoomIn");
        removeClass(main, "zoomOut");
      }
    });

    document.querySelector("header a.fa-close").addEventListener("click", function () {
      ipcRenderer.sendSync("win-close");
    });
    let resizeTime;
    window.addEventListener("resize", function () {
      addClass(html, "resize");
      addClass(source, "resize");
      setStyle(source.querySelector("img"), "display", "none");
      clearTimeout(resizeTime);
      resizeTime =
        setTimeout(() => {
          htmlEditor.resize();
          psdEditor.resize();
          removeClass(html, "resize");
          removeClass(source, "resize");
        }, 200);
    });
  },
};

window.addEventListener("load", function () {
  setTimeout(() =>
    graphic.run(),
  );
});

export default graphic;
