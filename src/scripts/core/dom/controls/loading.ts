import Base from "./base";
import h from "virtual-dom/h";
import { when } from './../utils';
import { Mounted } from './../hook';

export default class Loading extends Base {
  constructor() {
    super('loading')
  }

  render() {
    return h('svg.loading', {
      style: {
        width: '24px',
        height: '30px'
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