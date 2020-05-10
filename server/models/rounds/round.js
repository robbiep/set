const debug = require('debug')('app:models:rounds:round');
const _ = require('lodash');
const { Turn } = require('./turn');


class Round {
    constructor(options = {}) {
        this.startTime = options.startTime || Date.now();
        this.players = options.players || {};
        this.endTime = null;
        this.playerTurnsTaken = new Set();
        this.turnHistory = [];

        debug('new round started at ' + this.startTime);
    }

    getCurrentTurn() {
        const turn = this.turnHistory.slice(-1)[0];
        return turn;
    }

    startTurn(player) {
        debug('startTurn');

        if (this.endTime) {
            throw 'ERROR[ROUND_ENDED]: This round has ended.'
        } else if (this.playerTurnsTaken.has(player)) {
            throw 'ERROR[PLAYER_CANNOT_TAKE_TURN]: Player has already taken a turn this round';
        }

        const turn = new Turn({ player });
        this.turnHistory.push(turn);
        this.playerTurnsTaken.add(player);
    }

    takeTurn(cardSelectionFunction) {
        debug('takeTurn');
        
        const turn = this.getCurrentTurn();
        const result = turn.takeTurn(cardSelectionFunction);
        if (Object.keys(this.players).length === this.playerTurnsTaken.size) {
            this.endRound();
        }
        return result;
    }

    getPlayerTurnsTaken() {
        return this.playerTurnsTaken;
    }

    endRound() {
        const turn = this.getCurrentTurn();
        turn.endTurn();
        this.endTime = Date.now();

        debug('endRound: ' + this.endTime);
    }

    isRoundActive() {
        return !this.endTime;
    }

}

module.exports = { Round };