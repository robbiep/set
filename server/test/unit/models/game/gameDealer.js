const expect = require("chai").expect;
const { Deck } = require("../../../../models/game/deck");
const { Game } = require("../../../../models/game/game");
const { GameDealer } = require("../../../../models/game/gameDealer");
const { Board } = require("../../../../models/game/board");
const { Card } = require("../../../../models/game/card");
const boardConfig = require('config').get('board');
const setConfig = require('config').get('set');
const setFixtures = require('../../../fixtures/set');

let  gameDealer, board, deck = undefined;

describe("gameDealer.js", () => {
    beforeEach(() => {
        gameDealer = new GameDealer();
        board = new Board();
        deck = new Deck();
    });

    describe("getDealerStrategy", () => {
        it("returns the expected game dealer strategy", () => {
            // default strategy
            expect(gameDealer.deal).to.equal(gameDealer.dealBoard);

            const gameDealerAuto =  new GameDealer({ strategy: 'auto' });
            expect(gameDealerAuto.deal).to.equal(gameDealer.dealBoardAuto);
        });
    });

    describe("dealCard", () => {
        it("deals cards if the board is not full and the deck is not empty", () => {
            const initalCardCount = deck.getCardsRemainingCount();
            gameDealer.dealCard(board, deck);

            expect(deck.getCardsRemainingCount()).to.equal(initalCardCount - 1);
            expect(board.board[0]).to.not.be.undefined;
        });

        it("doesn't deals cards if the board is full", () => {
            board.cardCount = boardConfig.maxBoardSize;
            expect(() => {gameDealer.dealCard(board, deck)}).to.throw('ERROR[BOARD_FULL]: The board is full!');
        });

        it("doesn't deals cards if the deck is empty", () => {
            deck.deck = [];
            expect(() => {gameDealer.dealCard(board, deck)}).to.throw('ERROR[DECK_EMPTY]: The deck is empty!');
        });
    });

    describe("dealHand", () => {
        it("deals a hand if the board is not full and the deck is not empty", () => {
            const initalCardCount = deck.getCardsRemainingCount();
            gameDealer.dealHand(board, deck);

            expect(deck.getCardsRemainingCount()).to.equal(initalCardCount - setConfig.setSize);
            for (let i = 0; i < setConfig.setSize; i++) {
                expect(board.board[i]).to.not.be.undefined;
            }
        });

        it("doesn't deals cards if the board is full", () => {
            board.cardCount = boardConfig.maxBoardSize;
            expect(() => {gameDealer.dealHand(board, deck)}).to.throw('ERROR[BOARD_FULL]: The board is full!');
        });

        it("doesn't deals cards if the deck is empty", () => {
            deck.deck = [];
            expect(() => {gameDealer.dealHand(board, deck)}).to.throw('ERROR[DECK_EMPTY]: The deck is empty!');
        });
    });
        

    describe.only("dealBoard - adds cards to the board until it's correctly full", () => {
        it("deals minimum cards if the board is not at min", () => {
            gameDealer.dealBoard(board, deck);
            expect(board.hasMinBoard()).to.be.true;
            expect(board.board.length).to.equal(boardConfig.minBoardSize);
            expect(board.cardCount).to.equal(boardConfig.minBoardSize);


            gameDealer.dealBoard(board, deck);
            expect(board.cardCount).to.equal(boardConfig.minBoardSize + setConfig.setSize);
        });

        it("does not deal cards if the board is full", () => {
            board.cardCount = boardConfig.maxBoardSize;
            expect(() => {gameDealer.dealBoard(board, deck)}).to.throw('ERROR[BOARD_FULL]: The board is full!');
        });
    });

    describe("dealBoardAuto - adds cards to the board until their is a set and it's at least at the minimum size", () => {
        it("deals minimum cards if the board is not at min, max if board is at min", () => {
            const deckArray = [];
            const fixtureCardArray = setFixtures.invalidSet3
                .concat(setFixtures.invalidSet1)
                .concat(setFixtures.invalidSet2)
                .concat(setFixtures.validSet);
            for (fixtureCard of fixtureCardArray) {
                deckArray.push(new Card(fixtureCard));
            }
            deck.deck = deckArray;
            deck.initialDeckSize = 12;

            gameDealer.dealBoardAuto(board, deck);
            expect(board.cardCount).to.equal(12);
        });
    });
});