import React, { useContext } from "react";
import SocketContext from '../Socket/SocketContext';
import { Card } from '../Card';
import { SetForm } from '../SetForm';

const setSize = 3;

export class Board extends React.Component {
    static contextType = SocketContext;
    
    constructor(props) {
        super(props);
        this.handleCardSelect = this.handleCardSelect.bind(this);
        this.state = {
            cardSelection: {},
            cardSelectionArr: [],
        }
    }

    handleCardSelect = index => {
        const { cardSelection, cardSelectionArr } = this.state
        const isSelected = cardSelection[index];

        if (isSelected) {
            delete cardSelection[index];
            this.setState({ cardSelection });
            const arrIndex = cardSelectionArr.indexOf(index);
            console.log('arr index', arrIndex)
            if (arrIndex !== -1) {
                cardSelectionArr.splice(arrIndex, 1);
                this.setState({ cardSelectionArr });
            }
        } else if (Object.keys(cardSelection).length < setSize) {
            cardSelection[index] = true;
            this.setState({ cardSelection });
            cardSelectionArr.push(index);
            this.setState({ cardSelectionArr });
        }

        console.log('selection', cardSelection, Object.keys(cardSelection))
    }

    renderCardTable(cardRows) {
        const { board = [] } = this.context;
        const cardTableRows = [];
        
        for (let i = 0; i < board.length; i += setSize) {
            const tableRow = this.renderCardTableRow(i);
            cardTableRows.push(tableRow);
        }
        return (
            <tbody>
                {cardTableRows}
            </tbody>
        )
    }

    renderCardTableRow(boardIndex) {
        const rowIndex = Math.floor(boardIndex / setSize);

        let tableItemArray = [];
        for (let i = 0; i < setSize; i++) {
            const tableItem = this.renderCardTableItem(boardIndex + i);
            tableItemArray.push(tableItem);
        }

        return (
            <tr key={rowIndex}>
                {tableItemArray}
            </tr>
        );
    }

    renderCardTableItem(boardIndex) {
        const { board = [] } = this.context;
        const isSelected = this.state.cardSelection[boardIndex];
        const className = isSelected ? 'selected' : '';

        const { color, shape, pattern, shapeCount } = board[boardIndex].attributes;
        const card = <Card color={color} shape={shape} pattern={pattern} shapeCount={shapeCount}/>
        return (
            <td key={boardIndex} className={className} onClick={() => this.handleCardSelect(boardIndex)}>
                {card}
            </td>
        );
    }

    render() {
        const cardTable = this.renderCardTable();

        return (
            <div>
            <div><SetForm 
                    position1={this.state.cardSelectionArr[0]} 
                    position2={this.state.cardSelectionArr[1]}
                    position3={this.state.cardSelectionArr[2]}
                />
            </div>
            <div style={{ whiteSpace:'pre-wrap', fontFamily: 'consolas', margin: 'center'}} ><table>
                {cardTable}
            </table>
        </div>
        </div>
        );
    }
}