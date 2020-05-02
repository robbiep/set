const debug = require('debug')('app:findSet')
const CardSet = require('../models/game/cardSet').CardSet;


function findSet(board) {
    if (!board.hasMinBoard()) return;

    for (let i = 0; i < board.board.length - 2; i++) {
        for (let j = i + 1; j < board.board.length - 1; j++) {
            for (let k = j + 1; k < board.board.length; k++) {
                const cardSet = new CardSet(board.board[i], board.board[j], board.board[k]);
                if (cardSet.isSet()) {
                    debug('Set found: ');
                    debug(cardSet.toString());
                    return { 
                        cardSet,
                        position1: i,
                        position2: j,
                        position3: k
                    }
                }
            }
        }
    }
}

module.exports = { findSet };