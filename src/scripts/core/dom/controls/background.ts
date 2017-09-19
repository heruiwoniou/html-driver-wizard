import Base from "./base";
import { relative } from "../decorators/position";
import Container from "./container"
import { BaseDisplay } from "../const";

@relative
export default class Background extends Container {

  constructor(children?: Array<Base>) {
    super({
      x: 0,
      y: 0,
      width: BaseDisplay.FULL,
      height: BaseDisplay.FULL
    }, children)
    this.type = "ts-background"
  }

}