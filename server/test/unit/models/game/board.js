const expect = require('chai').expect;
const Board = require('../../../../models/game/board').Board;
const cardConfig = require('config').get('board');

describe("board.js", () => {
    it("initializes with empty board", () => {
        const board = new Board();
        expect(board.board).to.be.empty;
    });

    it("can add cards until the board is full", () => {
        const board = new Board();
        const mockCard = {};

        const maxBoardSize = cardConfig.maxBoardSize;
        for (let i = 0; i < maxBoardSize; i++) {
            expect(() => { board.addCard(mockCard) }).not.to.throw();
        }
        expect(board.board.length).to.equal(maxBoardSize);

        expect(() => { board.addCard(mockCard) }).to.throw();

    });

    it("can remove cards that exist on the board, maintaing the card positions", () => {
        const board = new Board();
        const mockCard = {};

        const maxBoardSize = cardConfig.maxBoardSize;
        for (let i = 0; i < maxBoardSize; i++) {
            board.addCard({ position: i});
        }

        const position = 5;
        const removedCard = board.removeCard(position);
        expect(removedCard).to.deep.equal({ position });
        expect(board.board[position]).to.equal(null);
        expect(board.board[position+1]).to.deep.equal({ position: position + 1});
        expect(() => { board.removeCard(position) }).to.throw();
    });

    it("can add new cards to the first available open position", () => {
        const board = new Board();
        const mockCard = {};

        const maxBoardSize = cardConfig.maxBoardSize;
        for (let i = 0; i < maxBoardSize; i++) {
            board.addCard({ position: i});
        }

        const position1 = 5;
        const position2 = 7;
        board.removeCard(position1);
        board.removeCard(position2);

        const mockCard1 = { foo: "bar "};
        const mockCard2 = { taco: "cat "};
        board.addCard(mockCard1);
        board.addCard(mockCard2);
        expect(board.board[position1]).to.deep.equal(mockCard1);
        expect(board.board[position2]).to.deep.equal(mockCard2);
    });

    it("can compress the board, moving all elements 'left' to remove empty positions", () => {
        const board = new Board();
        const mockCard = {};

        const maxBoardSize = cardConfig.maxBoardSize;
        for (let i = 0; i < maxBoardSize; i++) {
            board.addCard({ position: i});
        }

        const position1 = 5;
        const position2 = 7;
        board.removeCard(position1);
        board.removeCard(position2);

        board.compress();
        expect(board.board[position1]).to.deep.equal({ position: position1 + 1});
        expect(board.board[position2]).to.deep.equal({ position: position2 + 2});
    });
});