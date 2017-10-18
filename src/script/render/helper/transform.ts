import * as events from "events";

export default class Transform extends events.EventEmitter {
  public unit: string;
  public original: number;
  public map: number;
  public scale: number;

  constructor(original: number, map: number, unit?: string) {
    super();
    this.original = original;
    this.map = map;
    this.unit = unit ? unit : "px";
  }

  public setOrignal(originalNumber: number) {
    this.original = originalNumber;
  }

  public setMap(mapNumber: number) {
    this.map = mapNumber;
  }

  public setUnit(unitString: string) {
    this.unit = unitString;
  }

  public convert(realNumber: number): number {
    return realNumber * this.map / this.original;
  }

  public convertUnit(realNumber: number): string {
    return this.convert(realNumber) + this.unit;
  }

  public reverseConvert(thisNumber: number): number {
    return thisNumber * this.original / this.map;
  }
}
