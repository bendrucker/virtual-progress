# virtual-progress [![Build Status](https://travis-ci.org/bendrucker/virtual-progress.svg?branch=master)](https://travis-ci.org/bendrucker/virtual-progress) [![Greenkeeper badge](https://badges.greenkeeper.io/bendrucker/virtual-progress.svg)](https://greenkeeper.io/)

> Animated, randomized progress bar built with virtual-dom


## Install

```
$ npm install --save virtual-progress
```


## Usage

```js
var Progress = require('virtual-progress')
var state = Progress()

var vtree = Progress.render(state)
```

## API

#### `Progress([data])` -> `function`

##### data

*Required*
Type: `object`

Initial state data for the component. Returns an observable state (`{active, value}`.

#### `Progress.start(state)` -> `undefined`

Starts the progress meter, ticking the `value` every 200ms.

#### `Progress.stop(state)` -> `undefined`

Stops the progress meter.

#### `Progress.reset(state)` -> `undefined`

Stops the progress meter and resets it to `{value: 0}`.

#### `Progress.done(state)` -> `undefined`

Animates the progress meter to its final state (`{value: 1, active: false}`).

#### `Progress.onComplete(state, listener)` -> `function`

The listener is called when the progress bar's value is 1 and its transition ends.

Returns an unlisten function.

## License

MIT © [Ben Drucker](http://bendrucker.me)
