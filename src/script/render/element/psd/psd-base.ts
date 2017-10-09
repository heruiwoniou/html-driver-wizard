import * as merge from "merge";
import { VProperties } from "virtual-dom";
import { BaseDisplay } from "../const";
import Base from "./../base";

export default class PSDBase extends Base {

  public originalX: number;
  public originalY: number;
  public width: number;
  public height: number;

  constructor(obj: { left: number, top: number, width: number, height: number }) {
    super("ts-psd-base");

    this.originalX = obj.left;
    this.originalY = obj.top;
    this.width = obj.width;
    this.height = obj.height;

  }

  public get staticX(): number {
    return this.originalX;
  }

  public get staticY(): number {
    return this.originalY;
  }

  public get x(): number {
    const parent: PSDBase = this.parent as PSDBase;
    return parent ? this.originalX - parent.x : this.originalX;
  }

  public get y(): number {
    const parent: PSDBase = this.parent as PSDBase;
    return parent ? this.originalY - parent.y : this.originalY;
  }

  public render(vproperties: VProperties = {}) {
    vproperties = merge.recursive(true, vproperties, {
      style: {
        left: this.rootTransform.convertUnit(this.x),
        top: this.rootTransform.convertUnit(this.y),
        width: this.width === BaseDisplay.FULL ? "100%" : this.rootTransform.convertUnit(this.width),
        height: this.height === BaseDisplay.FULL ? "100%" : this.rootTransform.convertUnit(this.height),
      },
    });
    return super.render(vproperties);
  }
}
