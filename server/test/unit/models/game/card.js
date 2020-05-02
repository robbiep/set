const expect = require('chai').expect;
const Card = require('../../../../models/game/card').Card;

describe("board.js", () => {
    it("initializes with attribute object", () => {
        const foo = "bar";
        const taco = "cat";
        const num = 1;

        const card = new Card({ foo, taco, num });
        expect(card.attributes.foo).to.deep.equal(foo);
        expect(card.attributes.taco).to.deep.equal(taco);
        expect(card.attributes.num).to.deep.equal(num);
    });

    it("prints toString", () => {
        const foo = "bar";
        const taco = "cat";
        const num = 1;

        const card = new Card({ foo, taco, num });
        const cardString = card.toString();
        expect(cardString).to.equal('[ba-ca-1]');
    });
});