import { addClass, getStyle, on, removeClass, setStyle } from "wind-dom";
import { offset } from "../utils";
import toast from "./../components/toast";

export interface IScale {
  altPress: boolean;
  scale: number;
  scaleTargets: Array<{ moveX: number, moveY: number, el: any }>;
  el: any;
  main: any;
}

export function scale<T extends { new(...args: any[]) }>(constructor: T) {
  return class extends constructor {
    constructor(...args: any[]) {
      super(...args);
      this.altPress = false;
      this.scale = 1;
      this.initScale();
    }

    private get exist(): boolean {
      for (const o of this.scaleTargets) {
        if (!o) { return false; }
      }
      return true;
    }

    public initScale() {
      window.addEventListener("keydown", (e) => {
        if (!this.altPress && e.keyCode === 18) {
          this.altPress = true;
          addClass(this.main, "zoom");
        }
      });

      window.addEventListener("keyup", (e) => {
        if (this.altPress && e.keyCode === 18) {
          this.altPress = false;
          removeClass(this.main, "zoom");
          removeClass(this.main, "zoomIn");
          removeClass(this.main, "zoomOut");
        }
      });

      on(this.el, "mousewheel", ({ clientX, clientY, wheelDelta }) => {
        if (this.altPress && this.exist) {
          const d = wheelDelta / Math.abs(wheelDelta);
          const ds = d / 20;
          if (this.scale + ds > 0.1) {
            const oldscale = this.scale;
            this.scale += ds;
            removeClass(this.main, d > 0 ? "zoomOut" : "zoomIn");
            addClass(this.main, d > 0 ? "zoomIn" : "zoomOut");
            const { left, top } = offset(this.scaleTargets[0].el);
            const { offsetWidth, offsetHeight } = this.scaleTargets[0].el;
            const { moveX: originalX, moveY: originalY } = this.scaleTargets[0];
            const dx = - offsetWidth * ds;
            const dy = - offsetHeight * ds;
            const computedLeft = dx * (clientX - left - originalX) / (offsetWidth * oldscale);
            const computedTop = dy * (clientY - top - originalY) / (offsetHeight * oldscale);
            this.scaleTargets.forEach((target) => {
              setStyle(target.el, "transform", `scale(${this.scale},${this.scale})`);
              setStyle(target.el, "left", (originalX + computedLeft) + "px");
              setStyle(target.el, "top", (originalY + computedTop) + "px");
              target.moveX = originalX + computedLeft;
              target.moveY = originalY + computedTop;
            });
            toast.show(`${(this.scale * 100).toFixed(0)}%`, this.el);
          }
        }
      });
    }
  };
}
