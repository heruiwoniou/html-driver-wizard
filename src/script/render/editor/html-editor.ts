import Base from "../element/base";
import DOMContainer from "../element/dom/dom-container";
import Transform from "../helper/transform";
import DomRender from "./../helper/dom-render";
import Editor from "./editor";

import * as events from "events";
import Container from "../element/dom/container";
import CurrentSelection from "../helper/current-selection";
import * as conf from "./../../conf";

/**
 * HTML编辑框
 * @export
 * @class HtmlEditor
 * @extends {Editor}
 */
export default class HtmlEditor extends Editor {

  public static initialize(): HtmlEditor {
    return new HtmlEditor();
  }

  protected node: DOMContainer;
  private currentSelection: CurrentSelection;
  private selectionRender: DomRender;

  public selectedNode: Base;

  constructor() {
    super();
    this.el = document.querySelector(".html");
    this.domRender = new DomRender(document.querySelector(".html"));
    this.currentSelection = new CurrentSelection();
    this.node = new DOMContainer();
    this.transform = new Transform(conf.view.mainWidth, this.el.offsetWidth, "px");
    this.node.setTransform(this.transform);
    this.domRender.create(this.node.render());

    this.node.on("onselecthandler", (o) => this.onSelectNode(o));
  }

  // 外部工具栏对应command

  public createNew() {
    this.node.splice(0);
    this.node.background = "";
    this.currentSelection.clear();
    this.update();
  }

  public createContainer(x: number, y: number, width: number, height: number, backgroundImage: string) {
    const node = new Container({
      x, y, width, height,
    });
    node.background = backgroundImage;
    this.selectedNode.push(node);
    this.update();
  }

  public onSelectNode(node) {
    this.selectedNode = this.selectedNode === node ? null : node;
    this.currentSelection.set(node);
  }

  public resize() {
    super.resize();
    this.update();
  }

  public update() {
    this.domRender.update(this.node.render());
  }
}
