import { app, globalShortcut } from "electron";

const keyUnRegister = function () {
  globalShortcut.unregisterAll();
};

export const keyRegister = function () {
  app.on("ready", function () {
    // globalShortcut.register('Space', function () {

    // })
  });
  app.on("will-quit", keyUnRegister);
};
