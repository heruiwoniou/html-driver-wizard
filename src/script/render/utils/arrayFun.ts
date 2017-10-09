const originalPush = Array.prototype.push;
const originalSplice = Array.prototype.splice;
const originalForEach = Array.prototype.forEach;
const originalSlice = Array.prototype.slice;

export const push = (context, ...args) => {
  return originalPush.apply(context, [...args]);
};

export const splice = (context, ...args) => {
  return originalSplice.apply(context, [...args]);
};

export const forEach = (context, ...args) => {
  return originalForEach.apply(context, [...args]);
};

export const slice = (context, ...args) => {
  return originalSlice.apply(context, [...args]);
};
