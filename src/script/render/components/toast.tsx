import * as h from 'virtual-dom/h';
import { offset } from '../utils';
import DomRender from '../helper/dom-render';
// import * as snabbt from 'snabbt.js';
import { Mounted } from '../element/hook';
import { addClass, once } from 'wind-dom';

interface IToastState {
  msg: string,
  x: number,
  y: number
}
class ToastBase {
  state: IToastState
  container: any
  appendEl: Element
  domRender: DomRender
  timer: any
  visible: boolean
  el: any

  constructor(appendEl?: Element) {
    this.appendEl = appendEl || document.body;
    this.state = {
      msg: '',
      x: 0,
      y: 0
    }
    this.visible = false
    this.domRender = new DomRender(this.appendEl)
    this.domRender.create(this.render())
  }

  show(msg: string, el?: Element) {
    this.container = el || this.appendEl
    this.state.msg = msg
    this.visible = true
    let position = offset(this.container)
    this.state.x = position.left + this.container.offsetWidth / 2
    this.state.y = position.top + this.container.offsetHeight * 2 / 5
    this.domRender.update(this.render())
    clearTimeout(this.timer)
    this.timer = setTimeout(() => this.hide(), 1000)
  }
  hide() {
    once(this.el, 'webkitTransitionEnd', () => {
      this.visible = false
      this.domRender.update(this.render())
    })
    addClass(this.el, 'hidden')
  }

  render() {
    return this.visible ? (
      <div className="component-toast" style={{ left: this.state.x + 'px', top: this.state.y + 'px' }} mounted={Mounted(node => this.el = node)}>
        <span>{this.state.msg}</span>
      </div>
    ) : (<span></span>)
  }
}
export default new ToastBase()