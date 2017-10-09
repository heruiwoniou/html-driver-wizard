import * as merge from "merge"

export function when(condition: Function, setting: { count?: number, delay?: number } = {}): Promise<any> {

  const privateSetting = {
    time: null,
    loops: 0,
    resolve: null,
    reject: null,
  };

  setting = merge.recursive(true, setting, {
    count: 10,
    delay: 500,
  }, setting);

  const clear = function () {
    clearTimeout(privateSetting.time);
    privateSetting.time = null;
  };

  const loop = function () {
    if (privateSetting.loops++ >= setting.count) {
      clear();
      privateSetting.reject(new Error("Failure to meet conditions"))
    } else if (condition()) {
      clear();
      privateSetting.resolve();
    } else {
      privateSetting.time = setTimeout(loop, setting.delay);
    }
  };

  return new Promise((resolve, reject) => {
    privateSetting.resolve = resolve;
    privateSetting.reject = reject;
    loop();
  });
}
