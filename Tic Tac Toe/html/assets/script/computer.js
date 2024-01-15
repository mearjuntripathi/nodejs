class ComputerGame {
    constructor(level) {
        this.#addEventListeners();
        this.mode = 'x';
        this.level = level;
    }

    #addEventListeners() {
        const cells = document.querySelectorAll('.cell');
        const message = document.querySelector('.message p');
        const reset = document.getElementById('reset');

        cells.forEach((cell) => { // Use an arrow function here
            cell.addEventListener('click', () => {
                const cellIndex = Array.from(cells).indexOf(cell);
                if (cell.innerHTML == '' && this.mode == 'x') {
                    cell.classList.add(this.mode);
                    cell.innerHTML = this.mode;
                    blocks[cellIndex] = this.mode;
                    this.mode = 'o';
                    message.textContent = "Computer turn";
                    this.#evaluvateWinner();
                    if(check() == null){
                        setTimeout(() => {
                            this.#computerMode();
                        }, 1000);
                    }
                }
            });
        });

        reset.addEventListener('click', () => {
            cells.forEach((cell, index) => {
                cell.innerHTML = '';
                cells[index].className = ''; // Remove both winner-cell and loser-cell
                cells[index].classList.add('cell');
                blocks[index] = '';
            });
            this.mode = 'x';
            message.className = '';
            message.innerHTML = "Your Turn";
            stopConfetti();
            this.#showTictactoe();
        });
    }

    #hideTictactoe() {
        let tictactoe = document.querySelector('.tictactoe');
        tictactoe.style.display = 'none';
    }

    #showTictactoe() {
        let tictactoe = document.querySelector('.tictactoe');
        tictactoe.style.display = 'grid';
    }

    #updateWinningCells(winningIndexes, cls) {
        winningIndexes.forEach(index => {
            document.querySelectorAll('.cell')[index].classList.add(cls);
        });
    }

    #evaluvateWinner(){
        let winner = check();
        const message = document.querySelector('.message p');
        if (winner !== null) {
            if (winner.win == 'x') {
                this.#updateWinningCells(winner.condition, 'winner-cell');
                message.classList.add('win');
                message.textContent = 'You WON';
                setTimeout(() => {
                    startConfetti();
                    this.#hideTictactoe();
                }, 1000);
            } else if (winner.win == 'o') { // Fix the condition here
                this.#updateWinningCells(winner.condition, 'losser-cell');
                message.classList.add('loss');
                message.textContent = 'You Loss';
                setTimeout(() => {
                    looser();
                    this.#hideTictactoe();
                }, 1000);
            } else {
                message.textContent = 'Match TIE';
                setTimeout(() => {
                    tie();
                }, 1000);
            }
        }
    }

    #computerMode() {
        if (!blocks.includes('')) return;

        const cells = document.querySelectorAll('.cell');
        const message = document.querySelector('.message p');
        let x;
        if (this.level == 'easy') {
            x = this.#easy();
        } else if (this.level == 'medium') {
            x = this.#medium();
        } else if (this.level == 'hard') {
            x = this.#hard();
        }
        cells[x].classList.add(this.mode);
        cells[x].innerHTML = this.mode;
        blocks[x] = this.mode;
        this.mode = 'x';
        message.textContent = "Your turn";
        this.#evaluvateWinner();
    }

    #easy() {
        let x = Math.floor(Math.random() * 9);
        while (blocks[x] != '')
            x = Math.floor(Math.random() * 9);
        return x;
    }

    #medium() {
        // Check if there's an opportunity to win
        for (let i = 0; i < 9; i++) {
            if (blocks[i] === '') {
                blocks[i] = 'o';
                if (check() !== null && check().win === 'o') {
                    blocks[i] = ''; // Undo the move
                    return i;
                }
                blocks[i] = ''; // Undo the move
            }
        }

        // If no opportunity to win, block the player if they are about to win
        for (let i = 0; i < 9; i++) {
            if (blocks[i] === '') {
                blocks[i] = 'x';
                if (check() !== null && check().win === 'x') {
                    blocks[i] = ''; // Undo the move
                    return i;
                }
                blocks[i] = ''; // Undo the move
            }
        }

        // If no opportunity to win or block, make a random move
        return this.#easy();
    }

    #hard() {
        let bestMove = -1;
        let bestScore = -Infinity;

        for (let i = 0; i < 9; i++) {
            if (blocks[i] === '') {
                blocks[i] = 'o';
                let moveScore = this.#minmax(blocks, 0, false);
                blocks[i] = '';
                if (moveScore > bestScore) {
                    bestScore = moveScore;
                    bestMove = i;
                }
            }
        }
        return bestMove;
    }

    #minmax(blocks, depth, isMaximizing) {
        let ai = 'o';
        let human = 'x';
        let result = check();

        if (result !== null) {
            if (result.win === 'x') {
                return -1;
            } else if (result.win === 'o') {
                return 1;
            } else {
                return 0; // It's a tie
            }
        }

        let bestScore = isMaximizing ? -Infinity : Infinity;
        for (let i = 0; i < 9; i++) {
            if (blocks[i] === '') {
                blocks[i] = isMaximizing ? ai : human;
                let score = this.#minmax(blocks, depth - 1, !isMaximizing);
                blocks[i] = '';
                bestScore = isMaximizing ? Math.max(bestScore, score) : Math.min(bestScore, score);
            }
        }

        return bestScore;
    }
}