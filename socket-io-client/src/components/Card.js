import React from "react";

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

    draw() {
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
        let cardColorClass = 'cardColor-' + this.state.color;
        return (
            <div className={ 'card '+ cardColorClass } style={{ fontSize: '20px', fontFamily: 'Monospace', textAlign: 'center'}} >
                {cardShapeDisplay}
            </div>
        );
    }
}