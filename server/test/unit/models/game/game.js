const expect = require("chai").expect;
const { Deck } = require("../../../../models/game/deck");
const { Game } = require("../../../../models/game/game");
const { Player } = require("../../../../models/players/player");
const { Card } = require("../../../../models/game/card");
const gameConfig = require('config').get('game');
const setFixtures = require('../../../fixtures/set');


describe("game.js", () => {
    it("initializes with shuffled deck, empty board, and uuid", () => {
        const game = new Game();
        expect(game.uuid).to.exist;
        expect(game.deck.deck.length).to.be.greaterThan(0);
        expect(game.board.board).to.be.empty;
    });

    it("addPlayer - adds players until max player count reached", () => {
        const game = new Game();
        
        for (let i = 0; i < gameConfig.maxPlayerCount; i++) {
            const player = new Player();
            game.addPlayer(player);
            expect(game.players.length).to.equal(i + 1);
        }

        const player = new Player();
        const addPlayer = () => { game.addPlayer(player) };
        expect(addPlayer).to.throw();
    });

    describe("dealBoard - adds cards to the board until it's correctly full", () => {
        it("deals minimum cards if the board is not at min, max if board is at min", () => {
            const game = new Game();
            
            game.dealBoard();
            expect(game.board.hasMinBoard()).to.be.true;

            game.dealBoard();
            expect(game.board.hasMaxBoard()).to.be.true;
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

            const deck = new Deck();
            deck.deck = deckArray;
            const game = new Game({deck});

            game.dealBoardAuto();
            expect(game.hasSet()).to.be.true;
        });
    });

    describe('drawBoard', () => {
        it('draws the board in ASCII', () => {
            const game = new Game();
            game.dealBoardAuto();
            const drawing = game.drawBoard();
            expect(drawing).to.have.lengthOf.at.least(90);
        });
    });
});