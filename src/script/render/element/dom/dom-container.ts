import Base from "./../base";
import { relative } from "../decorators/position";
import Container from "./container"
import { BaseDisplay } from "../const";
import Transform from "../../helper/transform";

/**
 * DOM 最外层框体 
 * 
 * @export
 * @class DOMContainer
 * @extends {Container}
 */
@relative
export default class DOMContainer extends Container {

  constructor(children?: Array<Base>) {
    super({
      x: 0,
      y: 0,
      width: BaseDisplay.FULL,
      height: BaseDisplay.FULL
    }, children)
    this.type = "ts-dom-background"

    this.isRoot = true
  }

  setTransform(value) {
    this.transform = value
  }

}