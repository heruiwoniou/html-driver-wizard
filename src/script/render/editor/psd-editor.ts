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
import { drag, IDrag } from "../decorators";
import { IScale, scale } from "../decorators/index";
import Layer from "../element/psd/layer";
import HtmlEditor from "./html-editor";

/**
 * PSD呈现及编辑框
 * @export
 * @class PSDEditor
 * @extends {Editor}
 */
@scale
@drag
export default class PSDEditor extends Editor implements IScale, IDrag {

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
   *  是否按下alt键
   *
   * @type {boolean}
   * @memberof PSDEditor
   */

  /**
   * 是否按下ALT键
   *
   * @type {boolean}
   * @memberof PSDEditor
   */
  public altPress: boolean;
  /**
   * 缩放比例
   *
   * @type {number}
   * @memberof PSDEditor
   */
  public scale: number;
  public spacePress: boolean;
  /**
   *  视力原始宽度
   *
   * @type {number}
   * @memberof PSDEditor
   */
  public viewWidth: number;

  constructor() {
    super();

    this.el = document.querySelector(".psd");
    this.domRender = new DomRender(this.el);
    this.viewWidth = this.el.offsetWidth;
    this.transform = new Transform(conf.view.mainWidth, this.viewWidth, "px");
    this.domRender.create(this.render());

    ipcRenderer.on("selected-file", (event, files) => {
      if (files.length > 0) {
        this.analysis(files.pop());
      }
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
    if (!htmlEditor.selectedNode) {
      toast.show("请选择要填充的容器");
    }
    const layers: Layer[] = this.node.selectedLayers;
    if (layers.length !== 0 && htmlEditor.selectedNode) {
      for (const o of layers) {
        if (!o.background) {
          o.background = Math.round(Math.random() * 1e5).toString();
          const fileName: string = o.background + ".png";
          const savePath: string = path.join(conf.assetsPath, fileName);
          await o.layer.saveAsPng(savePath);
          htmlEditor.createContainer(this.transform.original, o.staticX, o.staticY, o.width, o.height, "assets/" + fileName);
        }
      }
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
    this.transform.setMap(this.el.offsetWidth);
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
