import { addClass, getStyle, on, removeClass, setStyle } from "wind-dom";
import { draggable } from "../utils/draggable";

export interface IDrag {
  spacePress: boolean;
  moveTargets: Array<{ moveX: number; moveY: number; el: any }>;
  el: any;
  main: any;
}

export function drag<T extends { new(...args: any[]) }>(constructor: T) {
  return class extends constructor {
    constructor(...args: any[]) {
      super(...args);
      this.spacePress = false;
      this.initDrag();
    }

    private get exist(): boolean {
      for (const o of this.moveTargets) {
        if (!o) { return false; }
      }
      return true;
    }

    public initDrag() {
      window.addEventListener("keydown", (e) => {
        if (!this.spacePress && e.keyCode === 32) {
          this.spacePress = true;
          addClass(this.main, "grab");
        }
      });

      window.addEventListener("keyup", (e) => {
        if (this.spacePress && e.keyCode === 32) {
          this.spacePress = false;
          removeClass(this.main, "grab");
          removeClass(this.main, "grabbing");
        }
      });

      let ox, oy, tx = 0, ty = 0, dx = 0, dy = 0;
      draggable(this.el, {
        start: (e) => {
          if (this.spacePress && this.exist) {
            ox = e.clientX;
            oy = e.clientY;
            tx = this.moveTargets[0].moveX;
            ty = this.moveTargets[0].moveY;
          }
        },
        drag: (e) => {
          if (this.spacePress && this.exist) {
            dx = ox - e.clientX;
            dy = oy - e.clientY;
            this.moveTargets.forEach((target) => {
              setStyle(target.el, "left", tx - dx + "px");
              setStyle(target.el, "top", ty - dy + "px");
            });
            addClass(this.main, "grabbing");
          }
        },
        end: () => {
          if (this.exist) {
            this.moveTargets.forEach((target) => {
              target.moveX = parseFloat(getStyle(target.el, "left"));
              target.moveY = parseFloat(getStyle(target.el, "top"));
            });
            removeClass(this.main, "grabbing");
          }
        },
      });
    }
  };
}
