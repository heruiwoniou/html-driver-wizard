import * as h from "virtual-dom/h";
import { addClass, once } from "wind-dom";
import { Mounted } from "../element/hook";
import DomRender from "../helper/dom-render";
import { offset } from "../utils";

interface IToastState {
  msg: string;
  x: number;
  y: number;
}
class ToastBase {
  public state: IToastState;
  public container: any;
  public appendEl: Element;
  public domRender: DomRender;
  public timer: any;
  public visible: boolean;
  public el: any;

  constructor(appendEl?: Element) {
    this.appendEl = appendEl || document.body;
    this.state = {
      msg: "",
      x: 0,
      y: 0,
    };
    this.visible = false;
    this.domRender = new DomRender(this.appendEl);
    this.domRender.create(this.render());
  }

  public show(msg: string, el?: Element) {
    this.container = el || this.appendEl;
    this.state.msg = msg;
    this.visible = true;
    const position = offset(this.container);
    this.state.x = position.left + this.container.offsetWidth / 2;
    this.state.y = position.top + this.container.offsetHeight * 2 / 5;
    this.domRender.update(this.render());
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.hide(), 1000);
  }
  public hide() {
    once(this.el, "webkitTransitionEnd", () => {
      this.visible = false;
      this.domRender.update(this.render());
    });
    addClass(this.el, "hidden");
  }

  public render() {
    return this.visible ? (
      <div
        className="component-toast"
        style={{ left: this.state.x + "px", top: this.state.y + "px" }}
        mounted={Mounted((node) => this.el = node)}>
        <span>{this.state.msg}</span>
      </div>
    ) : (<span></span>);
  }
}
export default new ToastBase();
