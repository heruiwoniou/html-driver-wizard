let path = require('path')
var conf = {
  root: process.cwd(),
  assetsPath: path.join(process.cwd(), 'assets'),

  view: {
    mainWidth: 1000,
    mainHeight: 900,

    mainHeaderHeight: 40,
    mainFooterHeight: 25,
    toolBarHeight: 30
  }
}

module.exports = conf