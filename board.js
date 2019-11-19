class Board {
    constructor({size, root, updateState, getCurrentPlayer}) {
        this.size = size;
        this.cells = [];
        this.root = root;
        this.updateState = updateState;
        this.getCurrentPlayer = getCurrentPlayer

        this.buildBoard();
    }
    
    buildBoard() {
        const board = [];
        for(let i = 0; i < this.size; i++) {
            const row = [];
            for(let j = 0; j < this.size; j++) {
                const cell = new Cell({
                    row: i,
                    column: j,
                    updateState: this.updateState,
                    getCurrentPlayer: this.getCurrentPlayer
                });
                this.cells.push(cell);
                row.push(cell);
            }
            board.push(this.addRowElement(row));
        }

        board.forEach(rows => {
            this.root.appendChild(rows);
        });
    }

    addRowElement(cells) {
        const rowElement = document.createElement('div');
        rowElement.className = 'row';

        cells.forEach((cell) => {
            rowElement.appendChild(cell.element);
        });

        return rowElement;
    }

    clear() {
        this.cells.forEach(cell => cell.clear());
    }
}
