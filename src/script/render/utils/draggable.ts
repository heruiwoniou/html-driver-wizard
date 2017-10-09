let isDragging = false;
const supportTouch = "ontouchstart" in window;

export function draggable(element, options) {
  const moveFn = (event) => {
    if (options.drag) {
      options.drag(supportTouch ? event.changedTouches[0] || event.touches[0] : event);
    }
  };

  const endFn = (event) => {
    if (!supportTouch) {
      document.removeEventListener("mousemove", moveFn);
      document.removeEventListener("mouseup", endFn);
    }
    document.onselectstart = null;
    document.ondragstart = null;

    isDragging = false;

    if (options.end) {
      options.end(supportTouch ? event.changedTouches[0] || event.touches[0] : event);
    }
  };

  element.addEventListener(supportTouch ? "touchstart" : "mousedown", (event) => {
    if (isDragging) {
      return;
    }
    document.onselectstart = () => false;
    document.ondragstart = () => false;

    if (!supportTouch) {
      document.addEventListener("mousemove", moveFn);
      document.addEventListener("mouseup", endFn);
    }
    isDragging = true;

    if (options.start) {
      event.preventDefault();
      options.start(supportTouch ? event.changedTouches[0] || event.touches[0] : event);
    }
  }, false);

  if (supportTouch) {
    element.addEventListener("touchmove", moveFn);
    element.addEventListener("touchend", endFn);
    element.addEventListener("touchcancel", endFn);
  }
}
