import Transform from "../../helper/transform";
import { BaseDisplay } from "../const";
import { relative } from "./../../decorators";
import Base from "./../base";
import Container from "./container";

/**
 * DOM 最外层框体
 *
 * @export
 * @class DOMContainer
 * @extends {Container}
 */
@relative
export default class DOMContainer extends Container {

  public moveX: number;
  public moveY: number;
  constructor(children?: Base[]) {
    super({
      x: 0,
      y: 0,
      width: BaseDisplay.FULL,
      height: BaseDisplay.FULL,
    }, children);
    this.type = "ts-dom-background";
    this.moveX = 0;
    this.moveY = 0;
    this.isRoot = true;
  }

  public hasBuid(buid: string) {
    const walk = function (node) {
      for (const o of node) {
        if (o.buid !== undefined && o.buid === buid) {
          return true;
        }
        if (walk(o)) { return true; }
      }
      return false;
    };
    return walk(this);
  }

  public setTransform(value) {
    this.transform = value;
  }

  public render() {
    return super.render({
      style: {
        left: this.moveX + "px",
        top: this.moveY + "px",
      },
    });
  }
}
