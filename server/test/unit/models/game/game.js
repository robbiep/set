const expect = require("chai").expect;
const sinon = require('sinon');
const { CardSet } = require("../../../../models/game/cardSet");
const { Deck } = require("../../../../models/game/deck");
const { Game } = require("../../../../models/game/game");
const { GameDealer } = require("../../../../models/game/gameDealer");
const { Player } = require("../../../../models/players/player");
const { Card } = require("../../../../models/game/card");
const gameConfig = require('config').get('game');
const boardConfig = require('config').get('board');
const setFixtures = require('../../../fixtures/set');

let game = undefined;

describe("game.js", () => {
    beforeEach(() => {
        game = new Game();
    });

    describe('contructor', () => {
        it("initializes with shuffled deck, empty board, and uuid", () => {
            expect(game.uuid).to.exist;
            expect(game.deck.deck.length).to.be.greaterThan(0);
            expect(game.board.board).to.be.empty;
        });
    });

    describe('addPlayer', () => {
        it("adds players until max player count reached", () => {        
            for (let i = 0; i < gameConfig.maxPlayerCount; i++) {
                const player = new Player(i);
                game.addPlayer(player);
                expect(Object.keys(game.players).length).to.equal(i + 1);
            }

            const player = new Player();
            const addPlayer = () => { game.addPlayer(player) };
            expect(addPlayer).to.throw();
        });
    });
    
    describe("startGame", () => {
        it('requires players to start', () => {
            expect(() => { game.start()}).to.throw('ERROR[NO_PLAYERS]: There are no players in the game! Cannot start!');
        });

        it('initilizes with a start time, a deal strategy, and deals', () => {
            const gameDealer = new GameDealer();
            const dealStrategyFunction = gameDealer.deal;
            const spy = sinon.spy(game, 'deal');

            game.addPlayer('player1');
            game.start();

            expect(game.gameDealer.deal).to.equal(dealStrategyFunction);
            sinon.assert.calledOnce(spy);
        });

        it('allows choosing a deal strategy and deals', () => {
            const gameAutoDeal = new Game({ dealerStrategyType: 'auto' });
            const gameDealer = new GameDealer({ strategy: 'auto' });
            const dealStrategyFunction = gameDealer.deal;
            const spy = sinon.spy(gameAutoDeal, 'deal');


            gameAutoDeal.addPlayer('player1');
            gameAutoDeal.start();
            expect(gameAutoDeal.gameDealer.deal).to.equal(dealStrategyFunction);
            sinon.assert.calledOnce(spy);
        });
    });

    describe('deal', () => {
        it('deals to the board', () => {
            game.gameDealer = new GameDealer();
            game.deal();
            expect(game.board.board.length).to.be.at.least(boardConfig.minBoardSize);
        });
    });

    describe('drawBoard', () => {
        it('draws the board in UTF8', () => {
            game.gameDealer = new GameDealer();
            game.deal();

            const drawing = game.drawBoard();
            expect(drawing).to.have.lengthOf.at.least(90);
        });
    });
});