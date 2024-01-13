class TwoPlayer {
    constructor() {
        this.#addEventListeners();
    }

    #addEventListeners() {
        const cells = document.querySelectorAll('.cell');
        const message = document.querySelector('.message p');
        const reset = document.getElementById('reset');

        let mode = 'x';
        cells.forEach((cell) => { // Use an arrow function here
            cell.addEventListener('click', () => {
                const cellIndex = Array.from(cells).indexOf(cell);
                if (cell.innerHTML == '') {
                    cell.classList.add(mode);
                    cell.innerHTML = mode;
                    blocks[cellIndex] = mode;
                    mode = mode == 'x' ? 'o' : 'x';
                    message.textContent = mode + " turn";
                    let winner = check();
                    if (winner !== null) {
                        if (winner.win == 'x') {
                            this.#updateWinningCells(winner.condition, 'winner-cell');
                            message.classList.add('win');
                            message.textContent = 'X WON';
                            setTimeout(()=>{
                                startConfetti();
                                this.#hideTictactoe();
                            },500);
                        } else if (winner.win == 'o') { 
                            this.#updateWinningCells(winner.condition, 'losser-cell');
                            message.classList.add('loss');
                            message.textContent = 'O WON';
                            setTimeout(()=>{
                                startConfetti();
                                this.#hideTictactoe();
                            },500);
                        }else {
                            message.textContent = 'Match TIE';
                            setTimeout(500,tie());
                        }
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
            mode = 'x';
            message.className = '';
            message.innerHTML = "X Turn";
            stopConfetti();
            this.#showTictactoe();
        });
    }

    #hideTictactoe(){
        let tictactoe = document.querySelector('.tictactoe');
        tictactoe.style.display = 'none';
    }

    #showTictactoe(){
        let tictactoe = document.querySelector('.tictactoe');
        tictactoe.style.display = 'grid';
    }

    #updateWinningCells(winningIndexes, cls) {
        winningIndexes.forEach(index => {
            document.querySelectorAll('.cell')[index].classList.add(cls);
        });
    }
}