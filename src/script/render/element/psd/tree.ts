import Base from "./../base";
import { relative } from "../decorators/position";
import PSDBase from "./psd-base"
import { BaseDisplay } from "../const";
import * as conf from '../../../conf/index';
import { Mounted } from "../hook";


import * as h from 'virtual-dom/h'
import { VProperties } from "virtual-dom";
import * as merge from 'merge'
import * as path from 'path'
import * as fs from 'fs'
import Transform from "../../helper/transform";

@relative
export default class Tree extends PSDBase {

  private psd: any
  private tree: any

  private mounted: boolean

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
    this.isRoot = true
    this.mounted = false
  }

  setTransform(value) {
    this.transform = value;
  }

  public async onMounted(node) {
    if (!this.mounted) {
      super.onMounted(node);
      let filename = path.join(conf.root, 'assets', 'main.png')
      await this.psd.image.saveAsPng(filename)
    }
    let img: any = this.el.querySelector('div.ts-psd-background img')
    img.src = path.join('assets', 'main.png')
    img.width = this.rootTransform.convert(this.width)
    img.height = this.rootTransform.convert(this.height)
    img.style.display = 'initial'
  }

  public render(vproperties: VProperties = {}) {
    let self = this;
    vproperties = merge.recursive(vproperties, {
      style: {
        left: this.rootTransform.convertUnit(this.x),
        top: this.rootTransform.convertUnit(this.y),
        width: this.width === BaseDisplay.FULL ? '100%' : this.rootTransform.convertUnit(this.width),
        height: this.height === BaseDisplay.FULL ? '100%' : this.rootTransform.convertUnit(this.height),
        position: this.position
      },
      onclick: (e) => this.onselect(e)
    })
    vproperties.mounted = Mounted(node => {
      this.onMounted(node)
    })
    return h(this.type ? `${this.tagName}.${this.type}` : `${this.tagName}`, vproperties, [h('div.ts-psd-background', null, h('img'))].concat(this.map(child => child.render())));
  }
}