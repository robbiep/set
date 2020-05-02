const expect = require("chai").expect;
const Deck = require("../../../../models/game/deck").Deck;
const cardConfig = require('config').get('cards');

describe("deck.js", () => {
    it("initializes with shuffled deck", () => {
        const deck1 = new Deck();
        const deck2 = new Deck();
        expect(deck1).to.not.deep.equal(deck2);
    });

    it("cannot recreate an existing deck", () => {
        const deck = new Deck();
        expect(() => { deck.createDeck() }).to.throw('Deck already created!');
    });

    it("can deal cards, decrementing from the deck", () => {
        const deck = new Deck();
        expect(deck.getCardsRemainingCount()).to.equal(81);

        const card = deck.dealCard();
        expect(card).to.have.property('attributes');
        const attributes = card.attributes;
        expect(attributes).to.have.property('color');
        expect(attributes).to.have.property('shape');
        expect(attributes).to.have.property('pattern');
        expect(attributes).to.have.property('shapeCount');

        expect(deck.getCardsRemainingCount()).to.equal(80);
        expect(deck.getCardsDealtCount()).to.equal(1);

        deck.dealCard();
        expect(deck.getCardsRemainingCount()).to.equal(79);
        expect(deck.getCardsDealtCount()).to.equal(2);
    });

    it("cannot deal an empty deck", () => {
        const deck = new Deck();
        deck.deck = [];
        expect(deck.getCardsRemainingCount()).to.equal(0);
        expect(() => { deck.dealCard() }).to.throw('No cards remaining!');

    })
});