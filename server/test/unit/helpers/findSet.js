const expect = require('chai').expect;
const findSet = require('../../../helpers/findSet').findSet;
const Board = require('../../../models/game/board').Board;
const Card = require('../../../models/game/card').Card;
const CardSet = require('../../../models/game/cardSet').CardSet;
const setFixtures = require('../../fixtures/set');
const shuffleArray = require('shuffle-array');


function getDealtBoard(rawFixtureArray) {
    const board = new Board();
    let instanceCardArray = [];
    for (let rawCard of rawFixtureArray) {
        const card = new Card(rawCard.attributes);
        instanceCardArray.push(card);
    }

    shuffleArray(instanceCardArray);
    for (let card of instanceCardArray) {
        board.addCard(card);
    }

    return board;
}

describe("findSet.js", () => {
    it("returns a matching set if one exists", () => {
        const board = getDealtBoard(
            setFixtures.validSet
            .concat(setFixtures.invalidSet1)
            .concat(setFixtures.invalidSet2)
        );
        const validSetArray = [
            new Card(setFixtures.validSet[0]),
            new Card(setFixtures.validSet[1]),
            new Card(setFixtures.validSet[2])
        ];
        const validSet = new CardSet(...validSetArray);

        const foundSets = findSet(board);
        const foundSetsKeyArray = Object.keys(foundSets);
        const foundSet = foundSets[foundSetsKeyArray[0]];

        expect(foundSet.getHashId()).to.equal(validSet.getHashId());
        expect(foundSetsKeyArray).to.have.lengthOf(1);

    });

    it("returns undefined if no set exists", () => {
        const board = getDealtBoard(
            setFixtures.invalidSet3
            .concat(setFixtures.invalidSet1)
            .concat(setFixtures.invalidSet2)
        );
        const foundSet = findSet(board);

        expect(foundSet).to.be.empty;
    });
});