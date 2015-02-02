multiplayer-snake
=================
###[live here!](http://snake-42581.onmodulus.net/)

# client api
api is exposed on client as a global, so you can script Ai's from your console!

## known Ai's
* [black mamba](https://github.com/jarofghosts/black-mamba) by jarofghosts
* [bob](https://github.com/olivierrr/bob) by olivierrr

## game.on('input', data)
* `data.grid` {Array#2d}
* `data.snakes` {Array}
    - contains all snakes coordinates and names
* `data.foods` {Array} food blocks within model
    - contains all food blocks coordinates
* `data.events` {Array}
    - each event object has a `type` and a `coordinates` property
    - possible `type`s are:
        - `'snake-die'` triggered when you die
        - `'snake-eat'` triggered when your snake collides with a food block
        - `'snake-kill'` triggered when a snake (not yours) collides with your snake

## game.emit('output', direction)
* `direction` {String}
    - can be 'UP' | 'RIGHT' | 'LEFT' | 'DOWN'

## game.emit('spawn')
* spawns your snake at a random location
* your snake must be dead
