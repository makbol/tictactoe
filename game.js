const DEFAULT_SIZE = 3;

class Game {
    constructor({ size = DEFAULT_SIZE, root, players  }) {
        this.state = [];
        this.size = size;
        this.root = root;
        this.board = new Board({
            root: this.root,
            size: this.size,
            updateState: this.updateState.bind(this),
            getCurrentPlayer: this.getCurrentPlayer.bind(this)
        });

        this.maxMoves = this.size * this.size;
        this.numMoves = 0;

        this.players = players

        this.playersQueue = [...this.players];
        this.currentPlayer = null;

        this.setCurrentPlayer();
        this.buildState();
    }

    buildState() {
        for(let i = 0; i < this.size; i++) {
            this.state.push(new Array(this.size).fill(0));
        }
    }

    updateState({row, column}) {
        this.state[row][column] = this.currentPlayer.sign;
        this.numMoves++;
        this.setCurrentPlayer();
        this.checkWinner();
    }

    setCurrentPlayer() {
        const player = this.playersQueue.shift();
        this.currentPlayer = player
        this.playersQueue.push(player);
    }

    getCurrentPlayer() {
        return this.currentPlayer;
    }

    checkWinner() {
        const winner = this.getResult();

        if(winner) {
            setTimeout(() => {
                alert('Winner: ' + winner.name);
                this.reset();
            }, 0);
        }

        if (this.numMoves === this.maxMoves) {
            setTimeout(() => {
                alert('Game end');
                this.reset();
            }, 0);
        }
    }

    getResult() {
        const [ winner ] = this.players.filter(player =>
            this.getRowResult(player) ||
            this.getColumnResult(player) ||
            this.getDiagonalResult(player)
        );

        return winner;
    }

    getRowResult(player) {
        return this.state.filter((row) => {
            return row.join('') === player.sign.repeat(row.length);
        }).length
    }

    getColumnResult(player) {
        return this.state[0].filter((column, index) => {
            return this.getColumn(index) === player.sign.repeat(this.size);
        }).length;
    }

    getDiagonalResult(player) {
        let resultLeft = '';
        let resultRight = '';
        let expected = player.sign.repeat(this.size);

        for(let i = 0; i < this.size; i++) {
            resultLeft += this.state[i][i];
        }

        for(let i = this.size - 1; i === 0; i--) {
            resultRight += this.state[i][i];
        }

        return resultLeft === expected || resultRight === expected;
    }

    getColumn(n) {
        let result = '';
        for(let i = 0; i < this.size; i++) {
            result += this.state[i][n];
        }
        return result;
    }

    reset() {
        this.board.clear();
        this.numMoves = 0;
        this.clearState();
    }

    clearState() {
        this.state = [];
        this.buildState();
    }
}
