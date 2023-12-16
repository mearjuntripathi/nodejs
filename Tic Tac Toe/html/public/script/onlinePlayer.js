const cells = document.querySelectorAll('.cell');
const message = document.querySelector('.message p');

let mode = 'X';

let blocks = [-1,-1,-1,-1,-1,-1,-1,-1,-1];
let winner = false;
let turn = false;
// Add click event listener to each cell
cells.forEach(function(cell) {
    cell.addEventListener('click', () => {
        // Access the clicked element using event.target
        
        if(cell.innerHTML == '' && !winner && turn){
            const cellIndex = Array.from(cells).indexOf(cell);

            cell.innerHTML = mode;

            mode = 'O';
            blocks[cellIndex] = 1;
            message.innerHTML = `${opponent.name} Turn`;

            check(cellIndex);
            
            if(winner){
                message.innerHTML = 'You WON';
            }
            if (!blocks.includes(-1) && !winner) {
                message.innerHTML = "Match DRAW";
            }
            turn = false;
            otherplayerturn(cellIndex);
        }
    });
});

function playerMove(position){
    cells[position].innerHTML = mode;
    mode = 'X';
    blocks[position] = 0;
    message.innerHTML = "Your Turn";
    check(position);
    if(winner){
        message.innerHTML = opponent.name + " WON";
    }
    if (!blocks.includes(-1) && !winner) {
        message.innerHTML = "Match DRAW";
    }
    turn = true;
}

document.getElementById('leave').addEventListener('click', () => {
    clearCells();
    
});

function clearCells(){
    cells.forEach(function(cell, index) {
        cell.innerHTML = '';
        cells[index].classList.remove('winner-cell');
        blocks[index] = -1; // Reset the corresponding value in the blocks array
    });
    mode = 'X';
    winner = false;
    message.innerHTML = "Your Turn";
    stopConfetti();
}

document.getElementById('select-mode').querySelector('input').addEventListener('keypress', (event) =>{
    if(event.key === 'Enter'){
        document.getElementById('select-mode').style.display = 'none';
        joingame(document.getElementById('select-mode').querySelector('input').value);
    }
})

function showWaiting(){
    document.getElementById('select-mode').style.display = 'none';
    document.getElementById('game-mode').style.display = 'none';
    document.getElementById('wating').style.display = 'flex';
}

function removeWaiting(){
    document.getElementById('game-mode').style.display = 'flex';
    document.getElementById('wating').style.display = 'none';
}