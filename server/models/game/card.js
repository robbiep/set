const _ = require('lodash');
const colors = require('colors');
const cardShapeMap = require('config').get('cardShapeMap');
colors.setTheme({ purple: 'magenta'})

class Card {
    constructor(cardAttributes) {
        if (cardAttributes.hasOwnProperty('attributes')) {
            this.attributes = _.cloneDeep(cardAttributes.attributes);
        } else {
            this.attributes = _.cloneDeep(cardAttributes);
        }
    }

    toString() {
        let abbreviatedAttributes = [];
        for (let attribute in this.attributes) {
            const value = this.attributes[attribute];
            if (value.constructor === String) {
                abbreviatedAttributes.push(value[0] + value[1])
            } else {
                abbreviatedAttributes.push(value);
            }
        }

        return '[' + abbreviatedAttributes.join('-') + ']';
    }

    draw() {
        const symbol = cardShapeMap[this.attributes.shape][this.attributes.pattern];
        const { color, shapeCount } = this.attributes;

        let padding = {};
        if (shapeCount === 1) {
            padding.left = 3;
            padding.right = 3;
            padding.middle = 0;
        } else if (shapeCount === 2) {
            padding.left = 1;
            padding.right = 2;
            padding.middle = 1;
        } else {
            padding.left = 0;
            padding.right = 1;
            padding.middle = 1;
        }
        let string = '[' + ' '.repeat(padding.left);
        for (let i = 0; i < shapeCount; i++) {
            string += ' '.repeat(padding.middle) + symbol;
        }
        string += ' '.repeat(padding.right) + ']';

        return string[color];
    }
}

module.exports = { Card };