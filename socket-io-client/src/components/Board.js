import React from "react";
import { SocketContext } from './Socket/SocketContext';
import { Card } from './Card';
import { submitSet } from "../sockets/emit";

const setSize = 3;

export class Board extends React.Component {
    static contextType = SocketContext;
    
    constructor(props) {
        super(props);

        this.handleCardSelect = this.handleCardSelect.bind(this);
    }

    handleCardSelect = index => {
        const { cardSelection, isActiveTurn } = this.context;
        if (!isActiveTurn) return;

        const isSelected = cardSelection[index] !== undefined;
        if (isSelected) {
            delete cardSelection[index];
        } else if (cardSelection.filter(() => { return true }).length < setSize) {
            cardSelection[index] = index;
        }

        this.context.update({cardSelection});
        if(cardSelection.filter(() => { return true }).length === setSize) {
            submitSet(cardSelection.filter(() => { return true }));
        }
    }

    renderCardTable() {
        const { board = [] } = this.context;
        const cardTableRows = [];
        
        for (let i = 0; i < board.length; i += setSize) {
            const tableRow = this.renderCardTableRow(i);
            cardTableRows.push(tableRow);
        }
        return (
            <table>
                <tbody>
                    {cardTableRows}
                </tbody>
            </table>
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
        const { board = [], cardSelection = [] } = this.context;
        console.log(cardSelection)
        const isSelected = cardSelection[boardIndex] !== undefined;
        const className = isSelected ? 'selected' : '';

        const rawCardData = board[boardIndex];
        let attributes = {
            color: '',
            shape: '',
            pattern: '',
            shapeCount: '',
        };
        if (rawCardData) {
            attributes = rawCardData.attributes;
        }
        const { color, shape, pattern, shapeCount } = attributes;
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
            <div style={{ whiteSpace:'pre-wrap', fontFamily: 'consolas' }} >
                {cardTable}
            </div>
        );
    }
}