import React from "react";
import _ from 'lodash';

export class Card extends React.Component {
    constructor(props) {
        super(props);
        const { color, shape, pattern, shapeCount } = props;
        this.state = {
            color,
            shape,
            pattern,
            shapeCount,
        }
    }

    isNull() {
        const { color, shape, pattern, shapeCount } = this.state;
        return !color || !shape || !pattern || !shapeCount;
    }

    draw() {
        if (this.isNull()) {
            return;
        }

        const cardShapeMap = {
            "oval": {
                "none": "O",
                "striped": "◒",
                "solid": "●"
            },
            "triangle": {
                "none": "△",
                "striped": "◭",
                "solid": "▲"
    
            },
            "squigle": {
                "none": "□",
                "striped": "◧",
                "solid": "◼"
            }
        };
        const symbol = cardShapeMap[this.state.shape][this.state.pattern];
        const { shapeCount } = this.state;

        let string = '';
        for (let i = 0; i < shapeCount; i++) {
            const space = !!(i) ? ' ' : '';
            string += space  + symbol;
        }

        return string;
    }

    render() {
        const cardShapeDisplay = this.draw();
        let cardClass = this.isNull() ? '' : 'card';
        let cardColorClass = 'cardColor-' + this.state.color;
        return (
            <div className={ cardClass + ' ' + cardColorClass } style={{ fontSize: '20px', fontFamily: 'Monospace', textAlign: 'center', cursor: 'pointer'}} >
                {cardShapeDisplay}
            </div>
        );
    }
}