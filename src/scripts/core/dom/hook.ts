import { when } from './utils';
export function Mounted(value?: Function): void {
  if (!(this instanceof Mounted)) {
    return new Mounted(value)
  }
  this.value = value
}

Mounted.prototype.hook = async function (node, propertyName, previousValue) {
  await when(() => !!node.parentNode)
  this.value(node)
}