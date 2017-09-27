const fs = require('fs')

exports.run = function () {
  let conf = require('./../script/conf/index')
  return new Promise((resolve, reject) => {
    let vars = '';
    Object.keys(conf.view).forEach(key => {
      vars += '$' + key + '=' + conf.view[key] + 'px;\n'
    })

    fs.writeFile('src/style/vars.styl', vars, err => {
      if (err) {
        reject(err)
        return
      }
      resolve()
    })
  })

}

exports.runSync = function () {
  let conf = fs.readFileSync('src/script/conf/index.js')
  let _module_ = { exports: null }
  let vars = '';

  new Function('module', conf)(_module_)
  conf = _module_.exports

  Object.keys(conf.view).forEach(key => {
    vars += '$' + key + '=' + conf.view[key] + 'px;\n'
  })
  fs.writeFileSync('src/style/vars.styl', vars, 'utf-8')
}