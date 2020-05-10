const expect = require('chai').expect;
const CardSet = require('../../../../models/game/cardSet').CardSet;
const Card = require('../../../../models/game/card').Card;
const { validSet, invalidSet1, invalidSet2, invalidSet3 } = require('../../../fixtures/set');

const card1 = new Card(validSet[0].attributes);
const card2 = new Card(validSet[1].attributes);
const card3 = new Card(validSet[2].attributes);
const card4 = new Card(invalidSet1[0].attributes);
const card5 = new Card(invalidSet1[1].attributes);
const card6 = new Card(invalidSet1[2].attributes);
const card7 = new Card(invalidSet2[0].attributes);
const card8 = new Card(invalidSet2[1].attributes);
const card9 = new Card(invalidSet2[2].attributes);
const card10 = new Card(invalidSet3[0].attributes);
const card11 = new Card(invalidSet3[1].attributes);
const card12 = new Card(invalidSet3[2].attributes);


describe("cardSet.js", () => {
    describe("attribute assetions", () => {
        it("attributeEqual - returns true if all cards have same value for attribute", () => {
            const cardSet = new CardSet(card1, card1, card1);
            const result = cardSet.attributeEqual("shapeCount");
            expect(result).to.equal(true);
        });

        it("attributeEqual - returns false if not all cards have same value for attribute", () => {
            const cardSet = new CardSet(card1, card2, card1);
            const result = cardSet.attributeEqual("shapeCount");
            expect(result).to.equal(false);
        });

        it("attributeEqual - returns false if all cards have different value for attribute", () => {
            const cardSet = new CardSet(card1, card2, card3);
            const result = cardSet.attributeEqual("shapeCount");
            expect(result).to.equal(false);
        });

        it("attributeDifferent - returns false if all cards have same value for attribute", () => {
            const cardSet = new CardSet(card1, card1, card1);
            const result = cardSet.attributeDifferent("shapeCount");
            expect(result).to.equal(false);
        });

        it("attributeDifferent - returns false if not all cards have same value for attribute", () => {
            const cardSet = new CardSet(card1, card2, card1);
            const result = cardSet.attributeDifferent("shapeCount");
            expect(result).to.equal(false);
        });

        it("attributeDifferent - returns true if all cards have different value for attribute", () => {
            const cardSet = new CardSet(card1, card2, card3);
            const result = cardSet.attributeDifferent("shapeCount");
            expect(result).to.equal(true);
        });
    });

    describe("entire set evaluation", () => {
        it("isSet - return true if there is a set", () => {
            const cardSet = new CardSet(card1, card2, card3);
            const result = cardSet.isSet();
            expect(result).to.equal(true);
        });

        it("isSet - return false if there is a no set", () => {
            const cardSet1 = new CardSet(card4, card5, card6);
            const result1 = cardSet1.isSet();
            expect(result1).to.equal(false);

            const cardSet2 = new CardSet(card7, card8, card9);
            const result2 = cardSet2.isSet();
            expect(result2).to.equal(false);

            const cardSet3 = new CardSet(card10, card11, card12);
            const result3 = cardSet3.isSet();
            expect(result3).to.equal(false);
        });
    });

    describe('getHashId', () => {
        it('returns a the same hashId for two different card sets with the same cards', () => {
            const cardSet1 = new CardSet(card1, card2, card3);
            const cardSet2 = new CardSet(card1, card2, card3);

            expect(cardSet1.getHashId()).to.equal(cardSet2.getHashId());
        });

        it('returns a different hashId for two different card sets with the same cards', () => {
            const cardSet1 = new CardSet(card1, card2, card3);
            const cardSet2 = new CardSet(card1, card2, card4);

            expect(cardSet1.getHashId()).not.to.equal(cardSet2.getHashId());
        });
    });
});