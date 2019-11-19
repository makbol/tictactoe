class Cell {
    constructor({row, column, updateState, getCurrentPlayer}) {
        this.row = row;
        this.column = column;
        this.marked = false;
        this.updateState = updateState;
        this.getCurrentPlayer = getCurrentPlayer;

        this.element = this.getElement();
    }

    onClick() {
        if(this.canClick()) {
            const player = this.getCurrentPlayer();
            this.sign = player.sign;
            this.marked = true;

            this.render();
            this.updateState({
                row: this.row,
                column: this.column
            });
        }
    }

    canClick() {
        return !this.marked;
    }

    clear() {
        this.sign = '';
        this.marked = false;
        this.render();
    }

    getElement() {
        const element = document.createElement('div');
        element.className = 'cell';
        element.addEventListener('click', this.onClick.bind(this));
        return element;
    }

    render() {
        this.element.textContent = this.sign;
    }
}
