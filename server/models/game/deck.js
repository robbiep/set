const config = require('config');
const cardConfig = require('config').get('cards');
const debug = require('debug')('app:deck');
const shuffleArray = require('shuffle-array');
const Card = require('./card').Card;

const colors = cardConfig.colors;
const shapes = cardConfig.shapes;
const patterns = cardConfig.patterns;
const shapeCounts = cardConfig.shapeCounts;

class Deck {
    deck = [];
    initialDeckSize = 0;

    constructor() {
        this.createDeck();
        this.shuffleDeck();
    }

    createDeck() {
        if (this.deck && this.deck.length) {
            throw 'ERROR[ALREADY_DECK]: Deck already created!'
        }

        debug('Creating deck');
        const constructCardFromConfig = (configObj, keys, cardObj = {}) => {
            if (!keys.length) {
                const card = new Card(cardObj);
                this.deck.push(card);

            } else {
                const key = keys.shift();
                for (const value of configObj[key]) {
                    cardObj[key] = value;
                    constructCardFromConfig(Object.assign({}, configObj), [...keys], cardObj)
                }
            }
        }

        constructCardFromConfig(cardConfig, Object.keys(cardConfig));
        this.initialDeckSize = this.deck.length;
        debug('Deck created. Size = ' + this.deck.length);
        
    }

    shuffleDeck() {
        debug('Shuffling deck');
        shuffleArray(this.deck);
    }

    dealCard() {
        if (!this.deck.length) {
            throw "ERROR[EMPTY_DECK] No cards remaining!";
        }
        
        const card = this.deck.shift();
        debug('Dealing card', card)
        return card;
    }

    getCardsRemainingCount() {
        return this.deck.length;
    }

    getCardsDealtCount() {
        return this.initialDeckSize - this.deck.length;
    }
}

module.exports = { Deck };