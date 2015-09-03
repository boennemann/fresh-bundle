#!/usr/bin/env node

var path = require('path')

var relative = require('require-relative')
var rimraf = require('rimraf')

if (!module.parent) {
  freshBundle()
} else {
  module.exports = freshBundle
}

function freshBundle () {
  var pkg = require(path.join(process.cwd(), 'package.json'))

  ;(pkg.bundleDependencies || pkg.bundledDependencies || [])

  .filter(function (dep) {
    return pkg.dependencies[dep]
  })
  .forEach(function (dep) {
    try {
      rimraf.sync(relative.resolve(dep))
      console.log(dep + ' deleted')
    } catch (e) {}
  })
}
