import { push, splice, forEach, slice } from './../utils';
import { VProperties } from 'virtual-dom';
import * as h from 'virtual-dom/h'
import { absolute } from './decorators/position';
import * as merge from 'merge'
import { Mounted } from './hook'
import * as events from 'events'
import Transform from '../helper/transform';

/**
 * 页面可选框的基本类
 * 
 * @export
 * @class Base
 * @extends {events.EventEmitter}
 */
@absolute
export default class Base extends events.EventEmitter {

  protected tagName: string = 'div'

  protected type: string

  protected _uid: number

  public length: number

  public parent: Base

  public position: string

  public el: HTMLElement

  public isRoot: boolean

  public transform: Transform

  public constructor(type: string = 'base', children?: Base[]) {
    super()
    this._uid = Math.round(Math.random() * 1e5)
    this.type = type
    this.isRoot = false
    children ?
      children.forEach(child => {
        this.push(child)
      }) : null
  }

  public get rootTransform(): Transform {
    return this.root.transform
  }

  public get root(): any {
    let parent: Base = this
    do {
      if (parent.isRoot) return parent
    } while ((parent = parent.parent))
  }

  public push(...args) {
    args.forEach(child => child.parent = this)
    return push(this, ...args)
  }

  public forEach(...args) {
    return forEach(this, ...args)
  }

  public slice(...args) {
    return slice(this, ...args)
  }

  public toArray() {
    return this.slice()
  }

  public map(dispose: Function) {
    let result = [];
    this.forEach(child => result.push(dispose(child)))
    return result
  }

  protected onselect(e: MouseEvent) {

  }

  public onMounted(node) {
    this.el = node
    this.emit('mounted', this)
  }

  public render(vproperties: VProperties = {}) {
    let self = this;
    vproperties = merge.recursive(vproperties, {
      style: {
        position: this.position
      },
      onclick: (e) => this.onselect(e)
    })
    vproperties.mounted = Mounted(node => {
      this.onMounted(node)
    })
    return h(this.type ? `${this.tagName}.${this.type}` : `${this.tagName}`, vproperties, this.map(child => child.render()));
  }
}