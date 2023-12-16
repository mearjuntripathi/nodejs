function updateWinningCells(winningIndexes) {
    winningIndexes.forEach(index => {
        cells[index].classList.add('winner-cell');
    });
}

function check() {
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 4, 8],
        [2, 4, 6],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8]
    ];

    for (const condition of winConditions) {
        const [a, b, c] = condition;
        if (blocks[a] === blocks[b] && blocks[b] === blocks[c] && blocks[a] !== -1) {
            winner = true;
            startConfetti();
            updateWinningCells(condition);
        }
    }
}