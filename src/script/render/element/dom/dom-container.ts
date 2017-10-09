import Transform from "../../helper/transform";
import { BaseDisplay } from "../const";
import { relative } from "../decorators";
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

  constructor(children?: Base[]) {
    super({
      x: 0,
      y: 0,
      width: BaseDisplay.FULL,
      height: BaseDisplay.FULL,
    }, children);
    this.type = "ts-dom-background";

    this.isRoot = true;
  }

  public setTransform(value) {
    this.transform = value;
  }

}
