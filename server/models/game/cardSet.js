const cardConfig = require('config').get('cards');
const debug = require('debug')('app:models:game:cardSet')
const hash = require('object-hash');
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
        if (_.includes(this.cards, null)) {
            return false;
        }

        for (const attribute in cardConfig) {
            if (!this.attributeEqual(attribute) && 
                !this.attributeDifferent(attribute)) {
                    debug("No set found: \n" + this.toString())
                    return false;
                }
        }

        debug("Set found: \n" + this.toString())
        return true;
    }

    getHashId() {
        const attributeStrings = {};

        // create a sorted list of all attributes for consistent hashing
        for (const card of this.cards) {
            for (const attribute in cardConfig) {
                if (!attributeStrings[attributeStrings]) {
                    attributeStrings[attributeStrings] = [];
                }
                attributeStrings[attributeStrings].push(new String(card['attributes'][attribute]));
                attributeStrings[attributeStrings].sort();
            }
        }
        return hash(attributeStrings);
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