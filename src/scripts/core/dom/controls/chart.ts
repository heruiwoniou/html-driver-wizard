import Base from "./base";
import Loading from "./loading";
import { relative } from "../decorators/position";

@relative
export default class Chart extends Base {

  constructor() {
    super('chart')
    this.push(new Loading())
  }

  render() {
    return super.render({ style: { height: '100%', width: '100%' } })
  }

}