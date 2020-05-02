const { Board } = require('./board');
const { Deck } = require('./deck');
const { findSet } = require('../../helpers/findSet');
const debug = require('debug')('app:models:players:player')
const config = require('config');
const gameConfig = config.get('game');
const setConfig = config.get('set');
const uuid = require('uuid').v1;
const _ = require('lodash');



class Game {
    constructor(options = {}) {
        this.autoDeal = false;
        this.board = new Board();
        this.deck = options.deck ? _.cloneDeep(options.deck) : new Deck();
        this.dealStrategy = null;
        this.endTime = 0;
        this.players = [];
        this.sets = [];
        this.startTime = 0;
        this.uuid = uuid();
    }

    addPlayer(player) {
        if (this.players.length === gameConfig.maxPlayerCount) {
            const error = 'ERROR[MAX_PLAYERS]: Max player count ' + gameConfig.maxPlayerCount + ' has been reached.';
            debug('addPlayer: throws error "' + error + '"');
            throw error;
        }

        debug('addPlayer: ' + player)
        this.players.push(player);
    }

    dealCard() {
        if (this.board.hasMaxBoard()) {
            throw 'ERROR[BOARD_FULL]: The board is full!';
        } else if (!this.deck.getCardsRemainingCount()) {
            throw 'ERROR[DECK_EMPTY]: The deck is empty!';
        }
        const card = this.deck.dealCard();
        this.board.addCard(card)
    }

    dealHand() {
        for (let i = 0; i < setConfig.setSize; i++) {
            this.dealCard();
        }
    }

    dealBoard() {
        if (this.board.cardCount <= 9) {
            while (!this.board.hasMinBoard()) {
                this.dealHand();
            }
        } else {
            this.dealHand();
        }
    }

    callCount = 0;
    dealBoardAuto() {
        debug('dealBoardAuto')
        while (!this.hasSet()) {
            if (this.callCount > 20) {
                throw 'eweefsdlkhflk'
            }
            this.dealBoard();
            this.callCount++;
        }
    }

    startGame() {
        if (this.players.length() === 0) {
            const error = 'ERROR[NO_PLAYERS]: There are no players in the game! Cannot start!';
            debug('startGame: throws error "' + error + '"');
            throw error;
        }

        if (!this.autoDeal) {
            dealStrategy = this.dealBoard();
        } else {
            dealStrategy = this.dealCardAuto();

        }

        this.startTime = Date.now();
        debug('startGame: ' + this.startTime)

        this.dealStrategy();
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

    startTurn(player) {

    }

    selectSetFromBoard(options) {
        const { player, cardPositions } = options;
        const cardSet = this.board.getCardSet([cardPositions[0], cardPositions[1], cardPositions[2]]);
        console.log(cardSet)
        if (cardSet.isSet()) {
            return cardSet;
        } else {
            return false;
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