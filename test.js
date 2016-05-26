'use strict'

var test = require('tape')
var dispatchEvent = require('dispatch-event')
var createComponent = require('thermometer').createComponent
var Progress = require('./')

test(function (t) {
  var state = Progress()

  createComponent(Progress, state(), function (state, element, done) {
    t.equal(bar(element).style.transform, 'translate3d(-100%, 0, 0)')
    done()
  })

  state.value.set(0.5)
  createComponent(Progress, state(), function (state, element, done) {
    t.equal(bar(element).style.transform, 'translate3d(-50%, 0, 0)')
    done()
  })

  t.end()
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
})

function bar (element) {
  return element.childNodes[0].childNodes[0]
}
