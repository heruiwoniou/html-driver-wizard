import * as events from "events";
import * as h from "virtual-dom/h";
import { Mounted } from "../element/hook";
import DomRender from "../helper/dom-render";

interface IButton {
  name: string; cls: string; cmd: string;
}

export default class Bar extends events.EventEmitter {
  private buttons: Array<IButton | string>;
  private el: any;
  private mountTarget: any;
  private mounted: boolean;
  private domRender: DomRender;
  constructor(buttons: Array<IButton | string>, toAppend?: Element) {
    super();
    this.buttons = buttons;
    if (toAppend) {
      this.mount(toAppend);
    }
  }

  public mount(el: any) {
    this.domRender = new DomRender(el);
    this.domRender.create(this.render());
    return this;
  }

  public setState(buttons: Array<IButton | string>) {

  }

  public render() {
    return (
      <ul className="bar-container" mounted={
        Mounted((node) => {
          if (!this.mounted) {
            this.el = node;
            this.mounted = true;
            if (this.mountTarget) {
              this.mountTarget.appendChild(this.el);
            }
          }
        })
      }>
        {
          this.buttons.map((btn: any) => {
            return (
              <li>
                {
                  (typeof btn === "string") ? (
                    <span></span>
                  ) : (
                      <a href="javascript:;"
                        title={btn.name}
                        className={btn.cls}
                        onclick={(e) => this.emit("click", e, btn.cmd)}
                      ></a>
                    )
                }
              </li>
            );
          })
        }
      </ul>
    );
  }
}
