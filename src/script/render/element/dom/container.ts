import * as merge from "merge";
import { VProperties } from "virtual-dom";
import { BaseDisplay } from "../const";
import Base from "./../base";

interface IContainerparameter {
  x: number;
  y: number;
  width: number;
  height: number;
  onselect?: Function;
}

/**
 * DOM 基本的框体
 *
 * @export
 * @class Container
 * @extends {Base}
 */
export default class Container extends Base {

  protected originalX: number;
  protected originalY: number;
  public width: number;
  public height: number;
  public background: string;
  public buid: string;

  constructor({ x, y, width, height }: IContainerparameter, children?: Base[]) {
    super("ts-dom-container", children);

    this.originalX = x;
    this.originalY = y;
    this.width = width;
    this.height = height;

    this.on("onselecthandler", (...args) => this.onselecthandler(...args));
  }

  public get staticX(): number {
    return this.originalX;
  }

  public get staticY(): number {
    return this.originalY;
  }

  public get x(): number {
    let resultX = this.originalX;
    let parent: Container = this as Container;
    while (!parent.isRoot && (parent = parent.parent as Container)) {
      if (parent.isRoot) { return resultX; }
      resultX -= parent.x;
    }
    return resultX;
  }

  public get y(): number {
    let resultY = this.originalY;
    let parent: Container = this as Container;
    while (!parent.isRoot && (parent = parent.parent as Container)) {
      if (parent.isRoot) { return resultY; }
      resultY -= parent.y;
    }
    return resultY;
  }

  protected onselecthandler(container?: Container) {
    if (this.parent) {
      this.parent.emit("onselecthandler", container || this);
    }
  }

  protected onselect(e: MouseEvent) {
    this.emit("onselecthandler", this);
    e.stopPropagation();
  }

  public render(vproperties: VProperties = {}) {
    vproperties = merge.recursive(true, {
      style: {
        left: this.rootTransform.convertUnit(this.x),
        top: this.rootTransform.convertUnit(this.y),
        width: this.width === BaseDisplay.FULL ? "100%" : this.rootTransform.convertUnit(this.width),
        height: this.height === BaseDisplay.FULL ? "100%" : this.rootTransform.convertUnit(this.height),
        backgroundImage: this.background ? `url(${this.background})` : "none",
      },
    }, vproperties);
    return super.render(vproperties);
  }
}
