const EventEmitter = require( 'events' );

class TurnEventListener extends EventEmitter {
    startTurn(player) {
        this.emit( 'Turn Start',  player);
    }

}

module.exports = { TurnEventListener };