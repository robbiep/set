const { findSet } = require('../../helpers/findSet');
const debug = require('debug')('app:models:players:player')
const config = require('config');
const setConfig = config.get('set');
const boardConfig = config.get('board');
const _ = require('lodash')

class GameDealer {
    constructor(options = {}) {
        const { strategy } = options;
        debug('GameDealer: strategy ' + strategy);

        if (options.strategy == 'auto') {
            this.deal = this.dealBoardAuto;
        } else {
            this.deal = this.dealBoard;
        }
    }

    dealBoardAuto(board, deck) {
        debug('dealBoardAuto')

        while (_.isEmpty(board.activeSets)) {
            this.dealBoard(board, deck);
        }
    }

    dealBoard(board, deck) {
        debug('dealBoard')

        if (!board.hasMinBoard()) {
            while (!board.hasMinBoard()) {
                this.dealHand(board, deck);
            }
        } else {
            this.dealHand(board, deck);
        }

        Object.assign(board.activeSets, findSet(board));
    }

    dealHand(board, deck) {
        debug('dealHand')

        for (let i = 0; i < setConfig.setSize; i++) {
            this.dealCard(board, deck);
        }
    }

    dealCard(board, deck) {
        debug('dealBoard')

        if (board.hasMaxBoard()) {
            throw 'ERROR[BOARD_FULL]: The board is full!';
        } else if (!deck.getCardsRemainingCount()) {
            throw 'ERROR[DECK_EMPTY]: The deck is empty!';
        }
        const card = deck.dealCard();
        board.addCard(card);
    }
}

module.exports = { GameDealer };