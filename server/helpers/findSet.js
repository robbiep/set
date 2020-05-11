const debug = require('debug')('app:helpers:findSet')
const CardSet = require('../models/game/cardSet').CardSet;
const _ = require('lodash')


function findSet(board) {
    if (!board.hasMinBoard()) return;

    const cardSets = {};
    const cardSetPositions = {};
    for (let i = 0; i < board.board.length - 2; i++) {
        for (let j = i + 1; j < board.board.length - 1; j++) {
            for (let k = j + 1; k < board.board.length; k++) {
                const cardSet = new CardSet(board.board[i], board.board[j], board.board[k]);
                if (cardSet.isSet()) {
                    const cardSetId = cardSet.getHashId();
                    cardSets[cardSetId] = cardSet;
                    cardSetPositions[cardSetId] = [i,j,k];
                }
            }
        }
    }

    debug('Sets found: ');
    for (const cardSetId in cardSets) {
        debug(cardSets[cardSetId].toString());
        debug(cardSetPositions[cardSetId]);
    }

    return cardSets;
}

module.exports = { findSet };