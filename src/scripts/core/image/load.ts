import Mat from './mat'
export function load(src: string): Promise<Mat> {
  return new Promise((resolve: Function, reject: Function) => {
    let container: HTMLDivElement = document.createElement('div')
    let image: HTMLImageElement = new Image()
    let canvas: HTMLCanvasElement = document.createElement('canvas')
    let ctx: CanvasRenderingContext2D = canvas.getContext('2d')
    let height: number
    let width: number

    container.style.height = '0px'
    container.style.width = '0px'
    container.style.marginLeft = '-9999px'
    container.appendChild(canvas)
    document.body.appendChild(container)

    let clear = function () {
      document.body.removeChild(container)
      container = null
      image = null
      canvas = null
      ctx = null
    }

    image.addEventListener('load', () => {
      width = canvas.width = image.naturalWidth || image.offsetWidth
      height = canvas.height = image.naturalHeight || image.offsetHeight

      ctx.drawImage(image, 0, 0, width, height)
      let { data } = ctx.getImageData(0, 0, width, height)
      resolve(new Mat(width, height, data))
      requestAnimationFrame(clear)
    })

    image.addEventListener('error', (err) => {
      reject(err)
    })

    image.src = src
  });
}