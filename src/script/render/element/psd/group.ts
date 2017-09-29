import Base from "./../base";
import { relative } from "../decorators/position";
import PSDBase from "./psd-base"
import { BaseDisplay } from "../const";
import Layer from "./layer";

export default class Group extends PSDBase {
  group: any
  constructor(group: any) {
    super({
      left: 0,
      top: 0,
      width: 0,
      height: 0
    })
    this.group = group
    this.type = "ts-psd-group"

    this.analysis()
  }

  analysis() {
    this.group.children().filter(o => o.visible()).reverse().forEach(o => {
      let child: PSDBase
      switch (o.type) {
        case 'group':
          child = new Group(o)
          break;
        case 'layer':
          child = new Layer(o)
          break;
      }

      this.push(child);
    })
  }
}