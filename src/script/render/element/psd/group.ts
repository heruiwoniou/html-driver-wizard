import { BaseDisplay } from "../const";
import { relative } from "../decorators";
import Base from "./../base";
import Layer from "./layer";
import PSDBase from "./psd-base";

export default class Group extends PSDBase {
  public group: any;
  constructor(group: any) {
    super({
      left: 0,
      top: 0,
      width: 0,
      height: 0,
    });
    this.group = group;
    this.type = "ts-psd-group";

    this.analysis();
  }

  public analysis() {
    this.group.children().filter((o) => o.visible()).reverse().forEach((o) => {
      let child: PSDBase;
      switch (o.type) {
        case "group":
          child = new Group(o);
          break;
        case "layer":
          child = new Layer(o);
          break;
      }

      this.push(child);
    });
  }
}
