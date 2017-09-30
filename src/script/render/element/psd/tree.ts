import Base from "./../base";
import { relative } from "../decorators/position";
import PSDBase from "./psd-base"
import { BaseDisplay } from "../const";
import * as conf from '../../../conf';
import { Mounted } from "../hook";
import Transform from "../../helper/transform";
import { when } from "../../utils";


import { ipcRenderer, shell } from 'electron'
import * as h from 'virtual-dom/h'
import { VProperties } from "virtual-dom";
import * as merge from 'merge'
import * as path from 'path'
import * as fs from 'fs'
import Group from "./group";
import Layer from "./layer";

@relative
export default class Tree extends PSDBase {
  filename: string;

  private psd: any
  private tree: any


  private mounted: boolean

  selectedLayers: Layer[]

  constructor(psd: any, transform: Transform) {
    var tree = psd.tree()
    super({
      left: 0,
      top: 0,
      width: tree.width,
      height: tree.height
    })
    this.type = "ts-psd-tree"
    this.tree = tree
    this.psd = psd
    this.isRoot = true
    this.mounted = false
    this.filename = path.join(conf.root, 'assets', 'main.png')
    this.transform = transform
    this.setMaxListeners(100)
    this.analysis()
    this.selectedLayers = [];

    ipcRenderer.on('selected-directory', (event, savePaths) => {
      this.saveLayerImages2Path(savePaths[0])
    })
  }

  analysis() {
    this.tree.children().filter(o => o.visible()).reverse().forEach(o => {
      let child: PSDBase
      switch (o.type) {
        case 'group':
          child = new Group(o)
          break;
        case 'layer':
          child = new Layer(o)
          break;
      }

      this.push(child);
    })
  }

  setLayer(layer: Layer) {
    if (!this.selectedLayers.includes(layer)) this.selectedLayers.push(layer)
  }

  clearLayer(layer: Layer) {
    this.selectedLayers.splice(this.selectedLayers.indexOf(layer), 1)
  }

  clearAllLayers() {
    for (var i = this.selectedLayers.length - 1; i >= 0; i--) {
      let layer = this.selectedLayers.pop()
      layer.setSelected(false)
    }
  }

  exportLayerImages() {
    ipcRenderer.send('open-directory-dialog')
  }

  async saveLayerImages2Path(savePath) {
    for (let i = 0; i < this.selectedLayers.length; i++) {
      let o = this.selectedLayers[i]
      await o.layer.saveAsPng(path.join(savePath, o.layer.name + '_' + Math.round(Math.random() * 1e3) + '.png'))
    }
    shell.openItem(savePath + '/')
  }

  public async onMounted(node) {
    if (!this.mounted) {
      super.onMounted(node);
      await this.psd.image.saveAsPng(this.filename)
    }
    await when(() => fs.existsSync(this.filename), { delay: 1000 });
    let img: any = this.el.querySelector('div.ts-psd-background img')
    img.src = path.join('assets', 'main.png?cache=' + new Date().getTime())
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
    var children = this.map(child => { return child.render() })
    return h(this.type ? `${this.tagName}.${this.type}` : `${this.tagName}`,
      vproperties,
      [h('div.ts-psd-background', null, h('img'))].concat(
        [
          h('div.ts-psd-children', null,
            children
          )
        ]
      )
    );
  }

  destroy(): any {
    if (fs.existsSync(this.filename))
      fs.unlinkSync(this.filename)
  }
}