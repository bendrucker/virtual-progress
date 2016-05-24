'use strict'

var State = require('dover')
var Observ = require('observ')
var watch = require('observ/watch')
var increment = require('observ-increment')
var createStore = require('weakmap-shim/create-store')
var valueEvent = require('value-event/value')
var Event = require('weakmap-event')
var compare = require('pare')
var extend = require('xtend')
var h = require('virtual-dom/h')
var Delegator = require('dom-delegator')

Delegator().listenTo('transitionend')

module.exports = Progress

var store = createStore()

function Progress (data) {
  data = data || {}

  var state = State({
    value: Observ(data.value || 0),
    active: Observ(data.active || false),
    channels: {
      transitionend: transitionend
    }
  })

  watch(state.active, compare(function onActive (previous, current) {
    if (!previous && current) return tick(state)
    if (previous && !current) return clear(state)
  }))

  return state
}

var CompleteEvent = Event()
Progress.onComplete = CompleteEvent.listen

function transitionend (state) {
  if (state.value() !== 1) return
  CompleteEvent.broadcast(state, {})
}

function tick (state) {
  store(state).timer = setTimeout(move, 200)

  function move () {
    if (state.value() >= 0.99) return
    increment(state.value, (1 - state.value()) / 15)
    tick(state)
  }
}

function clear (state) {
  clearTimeout(store(state).timer)
}

Progress.start = function start (state) {
  state.active.set(true)
}

Progress.stop = function stop (state) {
  state.active.set(false)
}

Progress.reset = function reset (state) {
  state.active.set(false)
  state.value.set(0)
}

Progress.done = function done (state) {
  state.active.set(false)
  state.value.set(1)
}

Progress.render = function render (state, options) {
  options = options || {}

  var style = {
    display: 'block'
  }

  return h('progress-meter', extend({style: style}, options), renderContainer(options, [
    renderBar(state, options)
  ]))
}

function renderContainer (options, children) {
  var defaults = {
    display: 'block',
    height: '5px',
    overflow: 'hidden'
  }

  return h('progress-container', {style: extend(defaults, options.container || {})}, children)
}

function renderBar (state, options) {
  var style = {
    display: 'block',
    height: '100%',
    transform: 'translate3d(' + (state.value - 1) * 100 + '%, 0, 0)',
    backgroundColor: 'black',
    transition: 'transform .2s linear'
  }
  var bar = {
    style: extend(style, options.bar || {}),
    'ev-transitionend': valueEvent(state.channels.transitionend)
  }

  return h('progress-bar', bar)
}
