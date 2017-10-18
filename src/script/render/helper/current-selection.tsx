import * as events from "events";
import * as h from "virtual-dom/h";
import { BaseDisplay } from "../element/const";
import DomRender from "./dom-render";
import Transform from "./transform";

interface ICurrent {
  staticX: number;
  staticY: number;
  width: number;
  height: number;
  el: HTMLElement;
}

export default class CurrentSelection extends events.EventEmitter {
  private current: ICurrent;
  private domRender: DomRender;
  private elClickListener: any;
  public transform: Transform;
  public moveX: number;
  public moveY: number;
  constructor(transform?: Transform) {
    super();
    if (transform) { this.transform = transform; }
    this.domRender = new DomRender(document.querySelector(".html"));
    this.domRender.create(this.render());
    this.elClickListener = ({ target }) => {
      if (target.className === "ts-selection-box") {
        this.clear();
      }
    };
    this.domRender.el.querySelector(".ts-current-selection").addEventListener("click", this.elClickListener, false);
  }

  public setTransform(transform: Transform) {
    this.transform = transform;
  }
  public set(base: ICurrent) {
    if (base === this.current) {
      this.clear();
    } else {
      this.current = base;
      this.emit("set", base);
      this.domRender.update(this.render());
    }
  }
  public clear() {
    this.current = null;
    this.emit("clear");
    this.domRender.update(this.render());
  }

  public get el() {
    return document.querySelector(".ts-current-selection");
  }

  public render() {
    const domStyle = {
      left: this.moveX + "px",
      top: this.moveY + "px",
    };
    const style = this.current ? {
      left: this.transform.convertUnit(this.current.staticX),
      top: this.transform.convertUnit(this.current.staticY),
      width: (this.current.width === BaseDisplay.FULL ? "100%" : this.transform.convertUnit(this.current.width)),
      height: (this.current.height === BaseDisplay.FULL ? "100%" : this.transform.convertUnit(this.current.height)),
    } : null;
    return this.current ? (
      <div className="ts-current-selection" style={domStyle}>
        <div className="ts-selection-box" style={style}></div>
      </div >
    ) : (
        <div className="ts-current-selection" style={domStyle}></div>
      );
  }
}
