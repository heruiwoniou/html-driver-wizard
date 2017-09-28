import Base from "./../base";
import Loading from "./loading";
import { relative } from "../decorators/position";

/**
 * DOM 当中的 CHART 外包框
 * 
 * @export
 * @class Chart
 * @extends {Base}
 */
@relative
export default class Chart extends Base {

  constructor() {
    super('ts-dom-chart')
    this.push(new Loading())
  }

  render() {
    return super.render({ style: { height: '100%', width: '100%' } })
  }

}