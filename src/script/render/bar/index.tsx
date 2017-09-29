import * as events from 'events';
import * as h from 'virtual-dom/h';
import { Mounted } from '../element/hook';
import DomRender from '../helper/dom-render';

interface IButton {
  name: string, cls: string, cmd: string
}

export default class Bar extends events.EventEmitter {
  private buttons: (IButton | string)[]
  private el: any;
  private mountTarget: any;
  private mounted: boolean
  private domRender: DomRender
  constructor(buttons: (IButton | string)[]) {
    super()
    this.buttons = buttons
  }

  mount(el: any) {
    this.domRender = new DomRender(el)
    this.domRender.create(this.render())
    return this;
  }

  setState(buttons: (IButton | string)[]) {

  }

  render() {
    return (
      <ul className="bar-container" mounted={
        Mounted(node => {
          if (!this.mounted) {
            this.el = node
            this.mounted = true;
            if (this.mountTarget) this.mountTarget.appendChild(this.el)
          }
        })
      }>
        {
          this.buttons.map((btn: any) => {
            return (
              <li>
                {
                  (typeof btn === 'string') ? (
                    <span></span>
                  ) : (
                      <a href="javascript:;" title={btn.name} className={btn.cls} onclick={(e) => this.emit('click', e, btn.cmd)}></a>
                    )
                }
              </li>
            )
          })
        }
      </ul>
    )
  }
}