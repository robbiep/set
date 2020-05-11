const debug = require('debug')('app:models:game:board');
const boardConfig = require('config').board;
const CardSet = require('../game/cardSet').CardSet;
const { findSet } = require('../../helpers/findSet');
const _ = require('lodash');

class Board {
    constructor() {
        this.board = [];
        this.cardCount = 0;
        this.activeSets = {};
    }

    hasMinBoard() {
        return (this.cardCount >= boardConfig.minBoardSize);
    }

    hasMaxBoard() {
        return (this.cardCount === boardConfig.maxBoardSize);
    }

    addCard(card) {
        if (this.hasMaxBoard()) {
            throw `The board has ${this.board.length} cards and is full! Cannot add a card`;
        }

        for (let i = 0; i < boardConfig.maxBoardSize; i++) {
            if (!this.board[i]) {
                debug(`Adding card at position ${i}`)
                this.board[i] = card;
                this.cardCount++;
                return;
            }
        }
    }

    getCardSet(positions) {
        return new CardSet(
            this.board[positions[0]],
            this.board[positions[1]],
            this.board[positions[2]]
        );
    }

    hasCardSet(positions) {
        const cardSet = this.getCardSet(positions);
        const hasCardSet = !!this.activeSets[cardSet.getHashId()];
        debug('hasCardSet [' + hasCardSet +']: ' + positions);
        return hasCardSet;
    }

    hasActiveCardSets() {
        return !_.isEmpty(this.activeSets);
    }

    removeCardSet(positions) {
        debug('removeSet: ' + positions);

        const cardSet = this.getCardSet(positions);
        
        for (const position of positions) {
            this.removeCard(position);
        }

        this.activeSets = {};
        Object.assign(this.activeSets, findSet(this));
        //this.compress();
    }

    removeCard(position) {
        debug('removeCard at position ' + position);
        
        if (!this.board[position]) {
            throw `No card exists at position ${position}`;
        }

        const removedCard = this.board[position];
        debug('removeCard at position ' + position);
        debug(removedCard);

        this.board[position] = null;
        this.cardCount--;
    }

    compress() {
        this.board = this.board.filter(function (card) {
            return card != null;
        });
    }
}

module.exports = { Board };