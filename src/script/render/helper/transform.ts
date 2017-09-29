import * as events from 'events'

export default class Transform extends events.EventEmitter {
  unit: string;
  original: number;
  map: number;
  scale: number;

  constructor(original: number, map: number, unit?: string) {
    super()
    this.original = original;
    this.map = map;
    this.unit = unit ? unit : 'px'
  }

  setOrignal(orignialNumber: number) {
    this.original = orignialNumber
  }

  setMap(mapNumber: number) {
    this.map = mapNumber
  }

  setUnit(unitString: string) {
    this.unit = unitString;
  }

  convert(realNumber: number): number {
    return realNumber * this.map / this.original
  }

  convertUnit(realNumber: number): string {
    return this.convert(realNumber) + this.unit
  }

  reverseConvert(thisNumber: number): number {
    return thisNumber * this.original / this.map
  }
}