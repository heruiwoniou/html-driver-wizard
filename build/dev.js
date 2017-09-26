const { spawn, spawnSync } = require('child_process')
const path = require('path')
const fs = require('fs')

fs.readdirSync(path.join(__dirname, '../src/style/fonts')).forEach(tf => {
  console.log(path.join(__dirname, '../src/style/fonts/', tf))
  spawnSync('copy', [
    path.join(__dirname, '../src/style/fonts/', tf),
    path.join(__dirname, '../dist/style/fonts/', tf)
  ], {
      shell: true,
      stdio: 'inherit'
    })
})

spawn('tsc', ['--watch'], {
  shell: true,
  stdio: 'inherit'
})

spawn('stylus.cmd', [
  '-w',
  '-c', 'src/style/app.styl',
  '-u', './node_modules/autoprefixer-stylus', '--with', "{ browsers: ['last 10 versions','ie 8', 'ie 9'] }",
  '-I', './src/style/**/*',
  '-o', 'dist/style'
], {
    stdio: 'inherit'
  })