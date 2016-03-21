'use strict'

var test = require('tape')
var rent = require('rent')
var pipe = require('value-pipe')
var Progress = require('./')

test(function (t) {
  var state = Progress()
  var render = pipe(rent(Progress.render, state), bar)

  t.equal(render().properties.style.transform, 'translate3d(-100%, 0, 0)')

  state.value.set(0.5)
  t.equal(render().properties.style.transform, 'translate3d(-50%, 0, 0)')

  t.end()
})

function bar (vtree) {
  return vtree.children[0].children[0]
}
