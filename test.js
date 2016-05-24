'use strict'

var test = require('tape')
var rent = require('rent')
var pipe = require('value-pipe')
var dispatchEvent = require('dispatch-event')
var createComponent = require('thermometer').createComponent
var Progress = require('./')

test(function (t) {
  var state = Progress()
  var render = pipe(rent(Progress.render, state), bar)

  t.equal(render().properties.style.transform, 'translate3d(-100%, 0, 0)')

  state.value.set(0.5)
  t.equal(render().properties.style.transform, 'translate3d(-50%, 0, 0)')

  t.end()

  function bar (vtree) {
    return vtree.children[0].children[0]
  }
})

test('onComplete', function (t) {
  t.plan(1)

  createComponent(Progress, function (state, element, done) {
    Progress.onComplete(state, function () {
      t.equal(state.value(), 1)
    })

    state.value.set(0.5)
    dispatchEvent(bar(element), 'transitionend')

    state.value.set(1)
    dispatchEvent(bar(element), 'transitionend')

    done()
  })

  function bar (element) {
    return element.childNodes[0].childNodes[0]
  }
})
