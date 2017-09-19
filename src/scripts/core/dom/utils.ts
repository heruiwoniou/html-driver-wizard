import merge from 'merge'

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

export function when(condition: Function, setting: { count?: number, delay?: number } = {}): Promise<any> {

  let privateSetting = {
    time: null,
    loops: 0,
    resolve: null,
    reject: null
  }

  setting = merge.recursive(true, setting, {
    count: 10,
    delay: 500
  }, setting)


  let clear = function () {
    clearTimeout(privateSetting.time)
    privateSetting.time = null
  }

  let loop = function () {
    if (privateSetting.loops++ >= setting.count) {
      clear()
      privateSetting.reject(new Error('Failure to meet conditions'))
    } else if (condition()) {
      clear()
      privateSetting.resolve()
    } else privateSetting.time = setTimeout(loop, setting.delay)
  }

  return new Promise((resolve, reject) => {
    privateSetting.resolve = resolve
    privateSetting.reject = reject
    privateSetting.time = loop()
  })
}