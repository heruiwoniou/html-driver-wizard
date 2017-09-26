import * as h from "virtual-dom/h";
import DomRender from "./dom-render"
import { BaseDisplay } from "../element/const";

interface ICurrent {
  staticX: number, staticY: number, width: number, height: number, el: HTMLElement
}

export default class CurrentSelection {
  private current: ICurrent
  private domRender: DomRender
  private outClickListener: any
  constructor() {
    this.domRender = new DomRender(document.querySelector('.html'))
    this.domRender.create(this.render())
    this.outClickListener = () => {
      this.clear()
    }
  }
  set(base: ICurrent) {
    this.current = base
    this.domRender.update(this.render())
    document.addEventListener('click', this.outClickListener, false)
  }
  clear() {
    this.current = null
    document.removeEventListener('click', this.outClickListener)
    this.domRender.update(this.render())
  }
  render() {
    let style = this.current ? {
      left: this.current.staticX + 'px',
      top: this.current.staticY + 'px',
      width: (this.current.width == BaseDisplay.FULL ? this.current.el.offsetWidth : this.current.width) + 'px',
      height: (this.current.height == BaseDisplay.FULL ? this.current.el.offsetHeight : this.current.height) + 'px',
    } : null
    return this.current ? (
      <div className="ts-current-selection">
        <div className="ts-selection-box" style={style}></div>
      </div >
    ) : (
        <div className="ts-current-selection"></div>
      )
  }
}