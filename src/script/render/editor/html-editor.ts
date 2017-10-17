import Base from "../element/base";
import DOMContainer from "../element/dom/dom-container";
import Transform from "../helper/transform";
import DomRender from "./../helper/dom-render";
import Editor from "./editor";

import * as events from "events";
import { scale, drag, IDrag, IScale } from "../decorators";
import Container from "../element/dom/container";
import CurrentSelection from "../helper/current-selection";
import * as conf from "./../../conf";

/**
 * HTML编辑框
 * @export
 * @class HtmlEditor
 * @extends {Editor}
 */
@scale
@drag
export default class HtmlEditor extends Editor implements IScale, IDrag {

  public static initialize(): HtmlEditor {
    return new HtmlEditor();
  }

  public node: DOMContainer;
  private currentSelection: CurrentSelection;
  private selectionRender: DomRender;

  public spacePress: boolean;
  public altPress: boolean;
  public scale: number;

  public selectedNode: Base;

  constructor() {
    super();
    this.el = document.querySelector(".html");
    this.domRender = new DomRender(document.querySelector(".html"));
    this.node = new DOMContainer();
    this.transform = new Transform(conf.view.mainWidth, this.el.offsetWidth, "px");
    this.currentSelection = new CurrentSelection(this.transform);
    this.node.setTransform(this.transform);
    this.domRender.create(this.node.render());

    this.node.on("onselecthandler", (o) => this.onSelectNode(o));
  }

  // 外部工具栏对应command

  /**
   * 重新生成新的外容器
   *
   * @memberof HtmlEditor
   */
  public createNew() {
    this.node.splice(0);
    this.node.background = "";
    this.currentSelection.clear();
    this.update();
  }

  /**
   * 生成内部小容器
   *
   * @param {number} transformOriginal 原始尺寸
   * @param {number} x 左边距
   * @param {number} y 上边距
   * @param {number} width 宽度
   * @param {number} height 高度
   * @param {string} backgroundImage 背景图片
   * @memberof HtmlEditor
   */
  public createContainer(transformOriginal: number, x: number, y: number, width: number, height: number, backgroundImage: string) {
    const node = new Container({
      x, y, width, height,
    });
    node.background = backgroundImage;
    this.node.transform.setOrignal(transformOriginal);
    this.selectedNode.push(node);
    this.update();
  }

  /**
   * 选择容器
   *
   * @param {any} node 选择的节点
   * @memberof HtmlEditor
   */
  public onSelectNode(node) {
    this.selectedNode = this.selectedNode === node ? null : node;
    this.currentSelection.set(node);
  }

  /**
   * 重绘
   *
   * @memberof HtmlEditor
   */
  public resize() {
    super.resize();
    this.update();
  }

  public update() {
    this.domRender.update(this.node.render());
  }
}
