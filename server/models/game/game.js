const { Board } = require('./board');
const { Deck } = require('./deck');
const { findSet } = require('../../helpers/findSet');
const { GameDealer } = require('./gameDealer');
const { RoundManager } = require('../rounds/roundManager');
const debug = require('debug')('app:models:game')
const config = require('config');
const gameConfig = config.get('game');
const setConfig = config.get('set');
const uuid = require('uuid').v1;
const _ = require('lodash');

class Game {
    constructor(options = {}) {
        this.dealerStrategyType = options.dealerStrategyType || 'none';
        this.board = new Board();
        this.deck = options.deck ? _.cloneDeep(options.deck) : new Deck();
        this.endTime = 0;
        this.players = {};
        this.sets = [];
        this.startTime = 0;
        this.uuid = uuid();
        this.score = {};
    }

    addPlayer(player) {
        if (Object.keys(this.players).length === gameConfig.maxPlayerCount) {
            const error = 'ERROR[MAX_PLAYERS]: Max player count ' + gameConfig.maxPlayerCount + ' has been reached.';
            debug('addPlayer: throws error "' + error + '"');
            throw error;
        }

        debug('addPlayer: ' + player)
        this.players[player.playerId] = _.cloneDeep(player);
        this.score[player.playerId] = 0;
    }

    getPlayer(playerId) {
        return this.players[playerId];
    }

    start() {
        if (Object.keys(this.players).length === 0) {
            const error = 'ERROR[NO_PLAYERS]: There are no players in the game! Cannot start!';
            debug('startGame: throws error "' + error + '"');
            throw error;
        }

        this.startTime = Date.now();
        debug('startGame at ' + new Date(this.startTime).toISOString())

        this.gameDealer = new GameDealer({strategy: this.dealerStrategyType});
        this.roundManager = new RoundManager(this.players);

        this.deal(this.board, this.deck);
    }

    deal() {
        this.gameDealer.deal(this.board, this.deck)
    }

    endGame() {
        // send endTime
        // store game in DB
    }

    hasSet() {
        return !!this.getNextSet();
    }

    getNextSet() {
        return findSet(this.board);
    }

    isGameOver() {
        const nextSet = this.getNextSet();
        const undealtCardCount = this.deck.getCardsRemainingCount();

        return (!nextSet && !undealtCardCount)
    }

    startRound() {
        this.roundManager.startNextRound();
    }

    startTurn(player) {
        this.roundManager.startTurn(player);
    }

    takeTurn(cardPositions) {
        debug('takeTurn');

        const cardSelectionFunction = () => { return this.board.hasCardSet(cardPositions) };
        const { hasCardSet, turn } = this.roundManager.takeTurn(cardSelectionFunction);
        if (hasCardSet) {
            this.removeCardSet(cardPositions);
            const player = turn.getPlayer();
            this.score[player.playerId]++;
        }
    }

    removeCardSet(cardPositions) {
        debug('removeCardSet: ' + cardPositions);

        for (const position of cardPositions) {
            this.board.removeCard(position);
        }
    }

    toString() {
        return this.printBoard('toString');
    }

    drawBoard() {
        return this.printBoard('draw');
    }

    printBoard(functionName) {
        let string = '';
        for (let i = 0; i < this.board.board.length; i++) {
            string += `{${i}}` + this.board.board[i][functionName]() + ' ';
            if (!((i+1) % 3 )) {
                string += "\n";
            }
        }

        debug("drawBoard:\n" + string);
        return string;
    }


}

module.exports = { Game };