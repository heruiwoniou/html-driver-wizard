import Base from "./../base";
import { VProperties } from "virtual-dom";
import { BaseDisplay } from "../const"
import * as merge from 'merge'

export default class PSDBase extends Base {

  _x: number
  _y: number
  public width: number
  public height: number

  constructor(obj: { left: number, top: number, width: number, height: number }) {
    super('ts-psd-base')

    this._x = obj.left
    this._y = obj.top
    this.width = obj.width
    this.height = obj.height

   
  }

  public get staticX(): number {
    return this._x
  }

  public get staticY(): number {
    return this._y
  }

  public get x(): number {
    let parent: PSDBase = this.parent as PSDBase
    return parent ? this._x - parent.x : this._x
  }

  public get y(): number {
    let parent: PSDBase = this.parent as PSDBase
    return parent ? this._y - parent.y : this._y
  }

  public render(vproperties: VProperties = {}) {
    vproperties = merge.recursive(true, vproperties, {
      style: {
        left: this.rootTransform.convertUnit(this.x),
        top: this.rootTransform.convertUnit(this.y),
        width: this.width === BaseDisplay.FULL ? '100%' : this.rootTransform.convertUnit(this.width),
        height: this.height === BaseDisplay.FULL ? '100%' : this.rootTransform.convertUnit(this.height)
      }
    })
    return super.render(vproperties)
  }
}