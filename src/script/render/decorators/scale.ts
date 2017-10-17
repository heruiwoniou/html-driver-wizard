import { addClass, getStyle, on, removeClass, setStyle } from "wind-dom";
import { offset } from "../utils";
import toast from "./../components/toast";

export function scale<T extends { new(...args: any[]) }>(constructor: T) {
  return class extends constructor {
    constructor(...args: any[]) {
      super(...args);
      this.altPress = false;
      this.scale = 1;
      this.initScale();
    }

    public initScale() {
      let main = document.querySelector(".main"), timer;

      window.addEventListener("keydown", (e) => {
        if (!this.altPress && e.keyCode === 18) {
          this.altPress = true;
          addClass(main, "zoom");
        }
      });

      window.addEventListener("keyup", (e) => {
        if (this.altPress && e.keyCode === 18) {
          this.altPress = false;
          removeClass(main, "zoom");
          removeClass(main, "zoomIn");
          removeClass(main, "zoomOut");
        }
      });

      const { left, top } = offset(this.el);
      on(this.el, "mousewheel", ({ clientX, clientY, wheelDelta }) => {
        if (this.altPress && this.node) {
          main = main || document.querySelector(".zoom");
          const d = wheelDelta / Math.abs(wheelDelta);
          const ds = d / 20;
          if (this.scale + ds > 0.1) {
            const oldscale = this.scale;
            this.scale += ds;
            removeClass(main, d > 0 ? "zoomOut" : "zoomIn");
            addClass(main, d > 0 ? "zoomIn" : "zoomOut");
            const { left: a, top: b } = offset(this.node.el);
            const { offsetWidth, offsetHeight } = this.node.el;
            const { moveX: originalX, moveY: originalY } = this.node;
            const dx = - offsetWidth * ds;
            const dy = - offsetHeight * ds;
            const computedLeft = dx * (clientX - left - originalX) / (offsetWidth * oldscale);
            const computedTop = dy * (clientY - top - originalY) / (offsetHeight * oldscale);
            setStyle(this.node.el, "transform", `scale(${this.scale},${this.scale})`);
            setStyle(this.node.el, "left", (originalX + computedLeft) + "px");
            setStyle(this.node.el, "top", (originalY + computedTop) + "px");
            this.node.moveX = originalX + computedLeft;
            this.node.moveY = originalY + computedTop;
            toast.show(`${(this.scale * 100).toFixed(0)}%`, this.el);
          }
          clearTimeout(timer);
          timer = setTimeout(() => main = null, 1000);
        }
      });
    }
  };
}

export interface IScale {
  altPress: boolean;
  scale: number;
}
