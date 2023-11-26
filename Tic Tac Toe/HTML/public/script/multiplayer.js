const cells = document.querySelectorAll('.cell');
const message = document.querySelector('.message p');

let mode = 'X';

let blocks = [-1,-1,-1,-1,-1,-1,-1,-1,-1];
let winner = false;

// Add click event listener to each cell
cells.forEach(function(cell) {
    cell.addEventListener('click', () => {
        // Access the clicked element using event.target
        
        if(cell.innerHTML == '' && !winner){
            const cellIndex = Array.from(cells).indexOf(cell);

            cell.innerHTML = mode;
            if(mode == 'X'){ 
                mode = 'O';
                blocks[cellIndex] = 1;
                message.innerHTML = "O Turn";
            }
            else{
                mode = 'X';
                blocks[cellIndex] = 0;
                message.innerHTML = "X Turn";
            }
            check(cellIndex);
            if(winner){
                message.innerHTML = (mode=='X'?'O':'X')+" WON";
            }
            if (!blocks.includes(-1) && !winner) {
                message.innerHTML = "Match DRAW";
            }
        }
    });
});

document.querySelector('.game-box button').addEventListener('click', () => {
    cells.forEach(function(cell, index) {
        cell.innerHTML = '';
        cells[index].classList.remove('winner-cell');
        blocks[index] = -1; // Reset the corresponding value in the blocks array
    });
    mode = 'X';
    winner = false;
    message.innerHTML = "X Turn";
    stopConfetti();
});