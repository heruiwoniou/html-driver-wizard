import Base from "./../base";
import { relative } from "../decorators/position";
import PSDBase from "./psd-base"
import { BaseDisplay } from "../const";
import conf from '../../../../conf/index';
import { Mounted } from "../hook";


import * as h from 'virtual-dom/h'
import { VProperties } from "virtual-dom";
import * as merge from 'merge'
import * as path from 'path'
import * as fs from 'fs'

@relative
export default class Tree extends PSDBase {

  private psd: any
  private tree: any

  constructor(psd: any, children?: Array<Base>) {
    var tree = psd.tree()
    super({
      left: 0,
      top: 0,
      width: tree.width,
      height: tree.height
    }, children)
    this.type = "ts-psd-tree"
    this.tree = tree
    this.psd = psd
  }

  public async onMounted(node) {
    super.onMounted(node);
    let filename = path.join(conf.root, 'assets', 'main.png')
    await this.psd.image.saveAsPng(filename)
    let img = new Image()
    img.src = filename
    this.el.querySelector('div.ts-psd-background').appendChild(img)
  }

  public render(vproperties: VProperties = {}) {
    let self = this;
    vproperties = merge.recursive(vproperties, {
      style: {
        left: this.x + 'px',
        top: this.y + 'px',
        width: this.width === BaseDisplay.FULL ? '100%' : this.width + 'px',
        height: this.height === BaseDisplay.FULL ? '100%' : this.height + 'px',
        position: this.position
      },
      onclick: (e) => this.onselect(e)
    })
    vproperties.mounted = Mounted(node => {
      this.onMounted(node)
    })
    return h(this.type ? `${this.tagName}.${this.type}` : `${this.tagName}`, vproperties, [h('div.ts-psd-background')].concat(this.map(child => child.render())));
  }
}