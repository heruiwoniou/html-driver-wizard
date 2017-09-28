import Base from "./../base";
import * as h from "virtual-dom/h";
import { when } from './../utils';
import { Mounted } from './../hook';

/**
 * DOM 内的 chart框加载状态图标
 * 
 * @export
 * @class Loading
 * @extends {Base}
 */
export default class Loading extends Base {
  constructor() {
    super('loading')
  }

  render() {
    return h('svg.ts-dom-loading', {
      style: {
        width: this.rootTransform.convertUnit(24),
        height: this.rootTransform.convertUnit(30)
      },
      mounted: Mounted(node => {
        node.parentNode.innerHTML = node.outerHTML
      })
    }, [
        h('use', {
          attributes: {
            'xmlns:xlink': "http://www.w3.org/1999/xlink",
            'xlink:href': '#loading'
          }
        })
      ])
  }
}