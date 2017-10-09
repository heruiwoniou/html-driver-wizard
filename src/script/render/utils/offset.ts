export const offset = (el: Element) => {
  let parent: any = el;
  const result = { left: parent.offsetLeft, top: parent.offsetTop };
  while ((parent = parent.offsetParent)) {
    result.left += parent.offsetLeft;
    result.top += parent.offsetTop;
  }
  return result;
};
