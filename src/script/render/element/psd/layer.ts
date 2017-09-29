import Base from "./../base";
import { relative } from "../decorators/position";
import PSDBase from "./psd-base"
import { BaseDisplay } from "../const";
import { addClass, removeClass } from 'wind-dom'

export default class Layer extends PSDBase {
  layer: any 
  selected: boolean
  constructor(layer: any) {
    super({
      left: layer.left,
      top: layer.top,
      width: layer.width,
      height: layer.height
    })
    this.layer = layer
    this.type = "ts-psd-layer"
    this.selected = false;
  }

  onMounted(node) {
    super.onMounted(node);
    // this.root.on('mousemove', (...arg) => this.mousemove(...arg))
    // this.root.on('mouseleave', (...arg) => this.mouseleave(...arg))
    this.el.addEventListener('mouseenter', () => {
      addClass(this.el, 'hover')
    })
    this.el.addEventListener('mouseleave', () => {
      removeClass(this.el, 'hover')
    })
    this.el.addEventListener('click', () => this.setSelected(!this.selected, true))
  }

  setSelected(state, self?) {
    this.selected = state
    if (this.selected) {
      addClass(this.el, 'selected')
      if (self) this.root.selectedLayers.push(this)
    } else {
      removeClass(this.el, 'selected')
    }
  }

}