import Base from "./../base";
import { relative } from "../decorators/position";
import PSDBase from "./psd-base"
import { BaseDisplay } from "../const";

@relative
export default class Layer extends PSDBase {
  constructor(tree: { width: number, height: number }, children?: Array<Base>) {
    super({
      left: 0,
      top: 0,
      width: tree.width,
      height: tree.height
    }, children)
    this.type = "ts-psd-tree"
  }

}