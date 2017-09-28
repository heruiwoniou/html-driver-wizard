export function absolute<T extends { new(...args: any[]) }>(constructor: T) {
  return class extends constructor {
    position = "absolute"
  }
}

export function relative<T extends { new(...args: any[]) }>(constructor: T) {
  return class extends constructor {
    position = "relative"
  }
}