const playerA = new Player({
    sign: 'X',
    name: 'Adrian'
});

const playerB = new Player({
    sign: 'O',
    name: 'Ben'
});

const game = new Game({
    root: document.getElementById('game'),
    size: 3,
    players: [
        playerA, playerB
    ]
});
