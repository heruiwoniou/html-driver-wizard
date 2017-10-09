export function relative<T extends { new(...args: any[]) }>(constructor: T) {
  return class extends constructor {
    public position = "relative";
  };
}
