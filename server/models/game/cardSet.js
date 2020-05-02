const cardConfig = require('config').get('cards');
const debug = require('debug')('app:cardSet')
const _ = require('lodash');

class CardSet {
    constructor(card1, card2, card3) {
        debug(`Constructing set: ${card1}, ${card2}, ${card3}`);
        this.cards = [
            _.cloneDeep(card1), 
            _.cloneDeep(card2),
            _.cloneDeep(card3)
        ];
    }

    isSet() {
        for (let attribute in cardConfig) {
            if (!this.attributeEqual(attribute) && 
                !this.attributeDifferent(attribute)) {
                    debug("No set found: \n" + this.toString())
                    return false;
                }
        }

        debug("Set found: \n" + this.toString())
        return true;
    }

    attributeEqual(attribute) {
        return (
            this.cards[0]['attributes'][attribute] === this.cards[1]['attributes'][attribute] &&
            this.cards[1]['attributes'][attribute] === this.cards[2]['attributes'][attribute] &&
            this.cards[2]['attributes'][attribute] === this.cards[0]['attributes'][attribute]
        );
    }

    attributeDifferent(attribute) {
        return (
            this.cards[0]['attributes'][attribute] !== this.cards[1]['attributes'][attribute] &&
            this.cards[1]['attributes'][attribute] !== this.cards[2]['attributes'][attribute] &&
            this.cards[2]['attributes'][attribute] !== this.cards[0]['attributes'][attribute]
        );
    }

    toString() {
        let string = '';
        for (let card of this.cards) {
            string += card + "\n";
        }
        return string;
    }
}

module.exports = { CardSet };