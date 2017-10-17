import { addClass, getStyle, on, removeClass, setStyle } from "wind-dom";
import { draggable } from "../utils/draggable";

export function drag<T extends { new(...args: any[]) }>(constructor: T) {
  return class extends constructor {
    constructor(...args: any[]) {
      super(...args);
      this.spacePress = false;
      this.initDrag();
    }

    public initDrag() {
      let main: any = document.querySelector(".main");
      window.addEventListener("keydown", (e) => {
        if (!this.spacePress && e.keyCode === 32) {
          this.spacePress = true;
          addClass(main, "grab");
        }
      });

      window.addEventListener("keyup", (e) => {
        if (this.spacePress && e.keyCode === 32) {
          this.spacePress = false;
          removeClass(main, "grab");
          removeClass(main, "grabbing");
        }
      });

      let ox, oy, tx = 0, ty = 0, dx = 0, dy = 0;
      draggable(this.el, {
        start: (e) => {
          if (this.spacePress && this.node) {
            ox = e.clientX;
            oy = e.clientY;
            tx = this.node.moveX;
            ty = this.node.moveY;
          }
        },
        drag: (e) => {
          if (this.spacePress && this.node) {
            dx = ox - e.clientX;
            dy = oy - e.clientY;
            setStyle(this.node.el, "left", tx - dx + "px");
            setStyle(this.node.el, "top", ty - dy + "px");
            addClass(main, "grabbing");
          }
        },
        end: () => {
          if (this.node) {
            this.node.moveX = tx - dx;
            this.node.moveY = ty - dy;
            removeClass(main, "grabbing");
            main = null;
          }
        },
      });
    }
  };
}

export interface IDrag {
  spacePress: boolean;
  node: {
    moveX: number;
    moveY: number;
  };
}
