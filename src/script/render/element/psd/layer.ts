import { addClass, removeClass } from "wind-dom";
import { BaseDisplay } from "../const";
import { relative } from "../decorators";
import Base from "./../base";
import PSDBase from "./psd-base";

export default class Layer extends PSDBase {
  public layer: any;
  public selected: boolean;
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
  }

  public onMounted(node) {
    super.onMounted(node);
    // this.root.on('mousemove', (...arg) => this.mousemove(...arg))
    // this.root.on('mouseleave', (...arg) => this.mouseleave(...arg))
    this.el.addEventListener("mouseenter", () => {
      addClass(this.el, "hover");
    });
    this.el.addEventListener("mouseleave", () => {
      removeClass(this.el, "hover");
    });
    this.el.addEventListener("click", () => this.setSelected(!this.selected, true));
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
