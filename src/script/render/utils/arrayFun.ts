const _push = Array.prototype.push
const _splice = Array.prototype.splice
const _forEach = Array.prototype.forEach
const _slice = Array.prototype.slice

export const push = (context, ...args) => {
  return _push.apply(context, [...args])
}

export const splice = (context, ...args) => {
  return _splice.apply(context, [...args])
}

export const forEach = (context, ...args) => {
  return _forEach.apply(context, [...args])
}

export const slice = (context, ...args) => {
  return _slice.apply(context, [...args])
}

