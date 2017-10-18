import * as fs from "fs";
import { PNG } from "pngjs";
import { addClass, removeClass } from "wind-dom";
import { BaseDisplay } from "../const";
import { relative } from "./../../decorators";
import Base from "./../base";
import PSDBase from "./psd-base";

export default class Layer extends PSDBase {
  public layer: any;
  public selected: boolean;
  public buid: string;
  private mouseEnterHandler: any;
  private mouseLeaveHandler: any;
  private clickHandler: any;
  constructor(layer: any) {
    super({
      left: layer.left,
      top: layer.top,
      width: layer.width,
      height: layer.height,
    });
    this.layer = layer;
    this.type = "ts-psd-layer";
    this.selected = false;

    this.mouseEnterHandler = () => {
      addClass(this.el, "hover");
    };
    this.mouseLeaveHandler = () => {
      removeClass(this.el, "hover");
    };
    this.clickHandler = () => {
      this.setSelected(!this.selected, true);
    };
  }

  public saveAsPng(savePath) {
    return new Promise((resolve, reject) => {
      const o = this.layer;
      this.layer.toPng()
        .pack()
        .pipe(new PNG({ filterType: 4 }))
        .on("parsed", function () {
          const alpha = o.layer.opacity / 255;
          for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
              const idx = (this.width * y + x) << 2;
              const opacity = this.data[idx + 3];
              this.data[idx + 3] = opacity * alpha;
            }
          }

          this
            .pack()
            .pipe(fs.createWriteStream(savePath))
            .on("finish", resolve)
            .on("error", reject);
        });
    });
  }

  public onMounted(node) {
    super.onMounted(node);
    try {
      this.el.removeEventListener("mouseenter", this.mouseEnterHandler, false);
      this.el.removeEventListener("mouseleave", this.mouseLeaveHandler, false);
      this.el.removeEventListener("click", this.clickHandler, false);
    } catch (error) {
    } finally {
      this.el.addEventListener("mouseenter", this.mouseEnterHandler, false);
      this.el.addEventListener("mouseleave", this.mouseLeaveHandler, false);
      this.el.addEventListener("click", this.clickHandler, false);
    }
  }

  public setSelected(state, self?) {
    this.selected = state;
    if (this.selected) {
      addClass(this.el, "selected");
      if (self) {
        this.root.selectedLayers.push(this);
      }
    } else {
      removeClass(this.el, "selected");
      if (self) {
        this.root.clearLayer(this);
      }
    }
  }

}
