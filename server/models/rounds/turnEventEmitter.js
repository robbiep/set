const EventEmitter = require( 'events' );

class TurnEvent extends EventEmitter {
    startTurn(player) {
        this.emit( 'Turn Start',  player);
    }

}