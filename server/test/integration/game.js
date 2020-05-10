const expect = require("chai").expect;
const sinon = require('sinon');
const { Game } = require('../../models/game/game')
const { Player } = require("../../models/players/player");

let game = undefined;

describe("game.js", () => {
    beforeEach(() => {
        game = new Game();
    });

    it('can start a game with players and play', () => {
        const player1 = new Player(123);
        game.addPlayer(player1);
        game.start();
        game.startRound();
        game.startTurn(player1);
        game.takeTurn([1,2,3]);
    });
});