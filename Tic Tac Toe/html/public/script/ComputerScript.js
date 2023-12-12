let MODE;

const select_mode = document.getElementById('select_mode');
const game_mode = document.getElementById('game_mode');
const reset = document.getElementById('reset');
const modemess = document.getElementById('mode');


function easyMode(){
    MODE = 0;
    modemess.innerHTML += "EASY"
    modemess.style.backgroundColor='green'
    triger();
}

function mediumMode(){
    MODE = 1;
    modemess.innerHTML += "Medium"
    modemess.style.backgroundColor='orange'
    triger();
}

function hardMode(){
    MODE = 2;
    modemess.innerHTML += "HARD"
    modemess.style.backgroundColor='red'
    triger();
}

function triger(){
    select_mode.style.display = 'none';
    game_mode.style.display = 'flex';
}

// start game form here

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
                message.innerHTML = "Computer Turn";
                setTimeout(() => {
                    computerTurn();
                }, 500);
            }
            else{
                mode = 'X';
                blocks[cellIndex] = 0;
                message.innerHTML = "Your Turn";
            }
            check(cellIndex);
            if(winner){
                message.innerHTML = (mode=='X'?'Computer':'You')+" WON";
            }
            if (!blocks.includes(-1) && !winner) {
                message.innerHTML = "Match DRAW";

            }
        }
    });
});

reset.addEventListener('click', () => {
    cells.forEach(function(cell, index) {
        cell.innerHTML = '';
        cells[index].classList.remove('winner-cell');
        blocks[index] = -1; // Reset the corresponding value in the blocks array
    });
    mode = 'X';
    winner = false;
    message.innerHTML = "Your Turn";
    stopConfetti();
});

function computerTurn(){
    if(MODE == 0)
        easySTEP();
    else if(MODE == 1)
        mediumSTEP();
    else if(MODE == 2)
        hardSTEP();
}

function easySTEP(){
    if(winner || !blocks.includes(-1)) return;
    let x = Math.floor(Math.random()*9);
    while(blocks[x] != -1 )
        x = Math.floor(Math.random()*9);
    cells[x].click();
}


function mediumSTEP() {
    if (winner || !blocks.includes(-1)) return;
    
}