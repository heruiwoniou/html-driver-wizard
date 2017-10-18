import * as conf from "./../../../conf";
import { relative } from "./../../decorators";
import Transform from "./../../helper/transform";
import { when } from "./../../utils";
import Base from "./../base";
import { BaseDisplay } from "./../const";
import { Mounted } from "./../hook";
import PSDBase from "./psd-base";

import { ipcRenderer, shell } from "electron";
import * as fs from "fs";
import * as merge from "merge";
import * as path from "path";
import { VProperties } from "virtual-dom";
import * as h from "virtual-dom/h";
import Group from "./group";
import Layer from "./layer";

@relative
export default class Tree extends PSDBase {
  public filename: string;

  private psd: any;
  private tree: any;

  public moveX: number;
  public moveY: number;

  private mounted: boolean;

  public selectedLayers: Layer[];

  constructor(psd: any, transform: Transform) {
    const tree = psd.tree();
    super({
      left: 0,
      top: 0,
      width: tree.width,
      height: tree.height,
    });
    this.type = "ts-psd-tree";
    this.tree = tree;
    this.psd = psd;
    this.isRoot = true;
    this.mounted = false;
    this.filename = path.join(conf.root, "assets", "main.png");
    this.transform = transform;
    this.setMaxListeners(100);
    this.analysis();
    this.selectedLayers = [];
    this.moveX = 0;
    this.moveY = 0;

    ipcRenderer.on("selected-directory", (event, savePaths) => {
      this.saveLayerImages2Path(savePaths[0]);
    });
  }

  public analysis() {
    this.tree.children().filter((o) => o.visible()).reverse().forEach((o) => {
      let child: PSDBase;
      switch (o.type) {
        case "group":
          child = new Group(o);
          break;
        case "layer":
          child = new Layer(o);
          break;
      }

      this.push(child);
    });
  }

  public setLayer(layer: Layer) {
    if (!this.selectedLayers.includes(layer)) {
      this.selectedLayers.push(layer);
    }
  }

  public clearLayer(layer: Layer) {
    this.selectedLayers.splice(this.selectedLayers.indexOf(layer), 1);
  }

  public clearAllLayers() {
    for (let i = this.selectedLayers.length - 1; i >= 0; i--) {
      const layer = this.selectedLayers.pop();
      layer.setSelected(false);
    }
  }

  public exportLayerImages() {
    ipcRenderer.send("open-directory-dialog");
  }

  public async saveLayerImages2Path(savePath) {
    for (const o of this.selectedLayers) {
      await o.layer.saveAsPng(path.join(savePath, o.layer.name + "_" + Math.round(Math.random() * 1e3) + ".png"));
    }
    shell.openItem(savePath + "/");
  }

  public async onMounted(node) {
    if (!this.mounted) {
      super.onMounted(node);
      await this.psd.image.saveAsPng(this.filename);
    }
    await when(() => fs.existsSync(this.filename), { delay: 1000 });
    const img: any = this.el.querySelector("div.ts-psd-background img");
    img.src = path.join("assets", "main.png?cache=" + new Date().getTime());
    img.width = this.rootTransform.convert(this.width);
    img.height = this.rootTransform.convert(this.height);
    img.style.display = "initial";
  }

  public render(vproperties: VProperties = {}) {
    const self = this;
    vproperties = merge.recursive(vproperties, {
      style: {
        left: this.moveX + "px",
        top: this.moveY + "px",
        width: this.width === BaseDisplay.FULL ? "100%" : this.rootTransform.convertUnit(this.width),
        height: this.height === BaseDisplay.FULL ? "100%" : this.rootTransform.convertUnit(this.height),
        position: (this as any).position,
      },
      onclick: (e) => this.onselect(e),
    });
    vproperties.mounted = Mounted((node) => {
      this.onMounted(node);
    });
    const children = this.map((child) => child.render());
    return h(this.type ? `${this.tagName}.${this.type}` : `${this.tagName}`,
      vproperties,
      [h("div.ts-psd-background", null, h("img"))].concat(
        [
          h("div.ts-psd-children", null,
            children,
          ),
        ],
      ),
    );
  }

  public destroy(): any {
    if (fs.existsSync(this.filename)) {
      fs.unlinkSync(this.filename);
    }
  }
}
