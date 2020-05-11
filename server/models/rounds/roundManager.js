const _ = require('lodash');
const debug = require('debug')('app:models:rounds:roundManager');
const { Round } = require('./round');

class RoundManager {
    constructor(players) {
        this.players = players;
        this.turnHistory = [];
        this.roundHistory = [];
        this.currentRound = undefined;
    }

    startNextRound() {
        debug('startRound');

        if (this.currentRound) {
            this.roundHistory.push(this.currentRound);
        }

        this.startTime = Date.now();
        this.currentRound = new Round({ 
            startTime: this.startTime,
            players: this.players
        });
    }

    startTurn(player) {
        debug('startTurn');
        this.currentRound.startTurn(player);
    }

    takeTurn(cardSelectionFunction) {
        debug('takeTurn');

        const hasCardSet = this.currentRound.takeTurn(cardSelectionFunction);
        const currentTurn = this.currentRound.getCurrentTurn();
        if (!this.currentRound.isRoundActive()) {
            this.startNextRound();
        }

        return { hasCardSet, turn: currentTurn };
    }

    getCurrentPlayer() {
        const currentTurn = this.currentRound.getCurrentTurn();
        const currentPlayer = currentTurn.getPlayer();
        return currentPlayer;
    }
}

module.exports = { RoundManager };