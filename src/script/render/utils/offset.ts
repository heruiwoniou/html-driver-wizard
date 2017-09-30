export const offset = function (el: Element) {
  let parent: any = el
  let result = { left: parent.offsetLeft, top: parent.offsetTop }
  while ((parent = parent.offsetParent)) {
    result.left += parent.offsetLeft;
    result.top += parent.offsetTop;
  }
  return result;
}