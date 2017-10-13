import { ipcRenderer } from "electron";
import { addClass, getStyle, on, removeClass, setStyle } from "wind-dom";
import Tree from "../element/psd/tree";
import DomRender from "../helper/dom-render";
import Transform from "../helper/transform";
import { draggable, offset } from "../utils";
import toast from "./../components/toast";
import Editor from "./editor";

import * as events from "events";
import * as  path from "path";
import * as PSD from "psd";
import * as velocity from "velocity-animate";
import * as h from "virtual-dom/h";
import * as conf from "../../conf";
import Layer from "../element/psd/layer";
import HtmlEditor from "./html-editor";

/**
 * PSD呈现及编辑框
 * @export
 * @class PSDEditor
 * @extends {Editor}
 */
export default class PSDEditor extends Editor {

  public static initialize(): PSDEditor {
    return new PSDEditor();
  }

  /**
   *  原始PSD文档
   * @private
   * @type {*}
   * @memberof PSDEditor
   */
  private psd: any;
  /**
   *  内容结点
   *
   * @protected
   * @type {Tree}
   * @memberof PSDEditor
   */
  public node: Tree;
  /**
   *  是否按下空格键
   *
   * @type {boolean}
   * @memberof PSDEditor
   */
  public spacePress: boolean;
  /**
   *  是否按下alt键
   *
   * @type {boolean}
   * @memberof PSDEditor
   */
  public altPress: boolean;
  /**
   *  视力原始宽度
   *
   * @type {number}
   * @memberof PSDEditor
   */
  public viewWidth: number;
  /**
   *  缩放比例
   *
   * @type {number}
   * @memberof PSDEditor
   */
  public scale: number;

  constructor() {
    super();

    this.spacePress = false;
    this.altPress = false;
    this.el = document.querySelector(".psd");
    this.domRender = new DomRender(this.el);
    this.viewWidth = this.el.offsetWidth;
    this.scale = 1;
    this.transform = new Transform(conf.view.mainWidth, this.viewWidth, "px");

    this.domRender.create(this.render());

    ipcRenderer.on("selected-file", (event, files) => {
      if (files.length > 0) {
        this.analysis(files.pop());
      }
    });

    this.initGrab();
    this.initScale();
  }

  /**
   *  初始化缩放
   *
   * @memberof PSDEditor
   */
  public initScale() {
    let main, timer;
    const { left, top } = offset(this.el);
    on(this.el, "mousewheel", ({ clientX, clientY, wheelDelta }) => {
      if (this.altPress && this.node) {
        main = main || document.querySelector(".zoom");
        const d = wheelDelta / Math.abs(wheelDelta);
        const ds = d / 20;
        if (this.scale + ds > 0.1) {
          const oldscale = this.scale;
          this.scale += ds;
          removeClass(main, d > 0 ? "zoomOut" : "zoomIn");
          addClass(main, d > 0 ? "zoomIn" : "zoomOut");
          const { left: a, top: b } = offset(this.node.el);
          const { offsetWidth, offsetHeight } = this.node.el;
          const { originalX, originalY } = this.node;
          const dx = - offsetWidth * ds;
          const dy = - offsetHeight * ds;
          const computedLeft = dx * (clientX - left - originalX) / (offsetWidth * oldscale);
          const computedTop = dy * (clientY - top - originalY) / (offsetHeight * oldscale);
          setStyle(this.node.el, "transform", `scale(${this.scale},${this.scale})`);
          setStyle(this.node.el, "left", (originalX + computedLeft) + "px");
          setStyle(this.node.el, "top", (originalY + computedTop) + "px");
          this.node.originalX = originalX + computedLeft;
          this.node.originalY = originalY + computedTop;
          toast.show(`${(this.scale * 100).toFixed(0)}%`, this.el);
        }
        clearTimeout(timer);
        timer = setTimeout(() => main = null, 1000);
      }
    });
  }

  /**
   *  初始化拖拽
   *
   * @memberof PSDEditor
   */
  public initGrab() {
    let ox, oy, tx, ty, dx, dy, main;
    draggable(this.el, {
      start: (e) => {
        if (this.spacePress && this.node) {
          ox = e.clientX;
          oy = e.clientY;
          tx = this.node.x;
          ty = this.node.y;
          main = document.querySelector(".grab");
        }
      },
      drag: (e) => {
        if (this.spacePress && this.node) {
          dx = ox - e.clientX;
          dy = oy - e.clientY;
          setStyle(this.node.el, "left", tx - dx + "px");
          setStyle(this.node.el, "top", ty - dy + "px");
          addClass(main, "grabbing");
        }
      },
      end: () => {
        if (this.node) {
          this.node.originalX = tx - dx;
          this.node.originalY = ty - dy;
          removeClass(main, "grabbing");
          main = null;
        }
      },
    });
  }

  // 外部工具栏对应command
  /**
   *  移除psd
   *
   * @returns {*}
   * @memberof PSDEditor
   */
  public psdRemove() {
    if (this.node) {
      this.node.destroy();
    }
    this.node = null;
    this.domRender.create(this.render());
  }
  /**
   * 清除所有选中
   *
   * @memberof PSDEditor
   */
  public clearAllLayers() {
    if (this.node) {
      this.node.clearAllLayers();
    }
  }
  /**
   *  导出所有选中图层的图片
   *
   * @memberof PSDEditor
   */
  public exportLayerImages() {
    if (this.node) {
      this.node.exportLayerImages();
    }
  }

  public async exportLayerImages2container(htmlEditor: HtmlEditor) {
    const layers: Layer[] = this.node.selectedLayers.slice(0, 1);
    if (layers.length !== 0 && htmlEditor.selectedNode) {
      const o: Layer = layers[0];
      const fileName: string = o.layer.name + "_" + Math.round(Math.random() * 1e3) + ".png";
      const savePath: string = path.join(conf.assetsPath, fileName);
      await o.layer.saveAsPng(savePath);
      htmlEditor.createContainer(o.staticX, o.staticY, o.width, o.height, "assets/" + fileName);
    }
  }

  /**
   *  处理PSD文件
   *
   * @param {any} filename
   * @memberof PSDEditor
   */
  public async analysis(filename) {
    this.scale = 1;
    this.psd = await PSD.open(filename);
    this.transform.setOrignal(this.psd.tree().width);
    this.node = new Tree(this.psd, this.transform);
    this.domRender.update(this.render());
  }

  /**
   *  选择PSD文件
   *
   * @memberof PSDEditor
   */
  public onSelectFile() {
    ipcRenderer.send("open-file-dialog");
  }

  public resize() {
    super.resize();
    this.domRender.update(this.render());
  }

  public render() {
    if (this.node) {
      return this.node.render();
    } else {
      return h("div.ts-psd-upload", {
        style: {
          position: "relative",
          height: "100%",
          width: "100%",
        },
      }, [
          h("span"),
          h("button", {
            onclick: () => this.onSelectFile(),
          }, "选择PSD文件"),
        ]);
    }
  }
}
