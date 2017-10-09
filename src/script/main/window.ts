import { app, BrowserWindow } from "electron";
import { bindIpcMain } from "./ipc";
import { keyRegister } from "./keyshortcuts";

import * as path from "path";
import * as url from "url";
import * as conf from "../conf";

let mainWindow;

function createWindow() {

  mainWindow = new BrowserWindow({
    width: conf.view.mainWidth,
    height: conf.view.mainHeight,
    frame: false,
  });

  mainWindow.loadURL(url.format({
    pathname: path.join(conf.root, "index.html"),
    protocol: "file:",
    slashes: true,
  }));

  mainWindow.webContents.openDevTools();

  mainWindow.on("closed", function () { mainWindow = null; });

  bindIpcMain(mainWindow);

  keyRegister();
}

export default function init() {
  app.on("ready", createWindow);
  app.on("window-all-closed", function () { if (process.platform !== "darwin") { app.quit(); } });
  app.on("activate", function () { if (mainWindow === null) { createWindow(); } });
}
