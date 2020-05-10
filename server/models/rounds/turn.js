const debug = require('debug')('app:models:rounds:turn');
const turnConfig = require('config').get('turn');

class Turn {
    constructor(options) {
        this.player = options.player;
        this.startTime = Date.now();
        this.endTime = null;
    }

    getPlayer() {
        return this.player;
    }

    canTakeTurn() {
        return true;
        const elapsedTime = Date.now() - this.startTime;
        return (elapsedTime < turnConfig.turnDuration);
    }

    takeTurn(cardSelectionFunction) {
        debug('takeTurn: player ' + this.player.playerId)
        if (this.canTakeTurn()) {
            this.endTime = Date.now();
            const result = cardSelectionFunction();
            return result;
        }
    }

    endTurn(endTime) {
        this.endTime = endTime || Date.now();
    }
}

module.exports = { Turn };