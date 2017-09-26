export default class Mat {

  row: number
  col: number
  channel: number
  buffer: ArrayBuffer
  data: Uint8ClampedArray
  bytes: number
  type: string

  constructor(
    __row: number,
    __col: number,
    __data: Uint8ClampedArray,
    __buffer?: ArrayBuffer
  ) {

    this.row = __row
    this.col = __col
    this.channel = 4
    this.buffer = __buffer || new ArrayBuffer(__row * __col * 4)
    this.data = new Uint8ClampedArray(this.buffer)
    __data && this.data.set(__data)
    this.bytes = 1
    this.type = 'CV_RGBA'

  }
}