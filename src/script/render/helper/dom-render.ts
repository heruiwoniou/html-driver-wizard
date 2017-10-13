import { VNode } from "virtual-dom";
import * as create from "virtual-dom/create-element";
import * as diff from "virtual-dom/diff";
import * as patch from "virtual-dom/patch";
import { forEach } from "./../utils";

export default class DomRender {
  public el: Element;
  private tree: VNode;
  private rootNode: Element;
  constructor(dom: Element) {
    this.el = dom;
  }
  public create(tree) {
    if (this.tree) {
      this.el.removeChild(this.rootNode);
    }
    this.tree = tree;
    this.rootNode = create(tree);
    this.el.appendChild(this.rootNode);
  }

  public update(tree) {
    const patches = diff(this.tree, tree);
    this.rootNode = patch(this.rootNode, patches);
    this.tree = tree;
  }
}
