import DOMContainer from "../element/dom/dom-container";
import DomRender from "../helper/dom-render";
import Transform from "../helper/transform";

import * as events from "events";
import Base from "../element/base";

/**
 * 基本的编辑框类
 * @export
 * @class Editor
 * @extends {events.EventEmitter}
 */
export default class Editor extends events.EventEmitter {
  /**
   * 渲染dom类
   * @protected
   * @type {DomRender}
   * @memberof Editor
   */
  protected domRender: DomRender;
  /**
   * 节点
   * @protected
   * @type {Base}
   * @memberof Editor
   */
  protected node: Base;
  /**
   * 比例尺
   * @protected
   * @type {Transform}
   * @memberof Editor
   */
  protected transform: Transform;
  /**
   * editor's dom
   * @public
   * @type {*}
   * @memberof Editor
   */
  public el: any;

  constructor() {
    super();
  }

  public onSelectNode(o: Base) {

  }

  public resize() {
    this.transform.setMap(this.el.offsetWidth);
  }

  public invoke(cmd, ...args) {
    cmd = cmd.replace(/-(\S)/g, (m, m1) => m1.toLocaleUpperCase());
    if (this[cmd]) {
      this[cmd](...args);
    }
  }
}
