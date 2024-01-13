class MultiPlayer {
    constructor() {
        this.over = false;
        this.mode = '';
        this.opponent = {name:"", id:""};
        this.panel = document.querySelector('.game-box');
    }

    waiting() {
        this.panel.innerHTML = "";
        let div = document.createElement('div');
        div.classList.add('loading-spinner');
        let h = document.createElement('h2');
        h.innerText = "Matching ..."
        // h.style = "";
        this.panel.append(div);
        this.panel.append(h);
    }

    startGame(opponent,move,id) {
        this.mode = move ? 'x' : 'o';
        this.opponent.id = id;
        this.opponent.name = opponent;
        let start = new Audio('./tune/begin.mp3');
        start.play();
        this.panel.innerHTML = "";
        
        let div = document.createElement('div');
        div.classList.add('battle');
        
        let div1 = document.createElement('div');
        div1.classList.add('p1');
        div1.innerHTML = "YOU";
        
        let div2 = document.createElement('div');
        div2.classList.add('p2');
        div2.innerHTML = opponent;
        
        div.append(div1);
        div.append('V/S');
        div.append(div2);
        
        let h = document.createElement('h1');
        h.innerText = 'tic tac toe';
        h.classList.add('welcome-title');
        this.panel.append(h);
        this.panel.append(div);
    
        // Countdown timer
        let countdown = 5;
        let countdownInterval = setInterval(() => {
            h.innerText = "Match begin in "+countdown;
            countdown--;
    
            if (countdown < 1) {
                clearInterval(countdownInterval);
    
                // Triggering the animation after the countdown
                setTimeout(() => {
                    h.innerText = 'Match Begin';
                    div.classList.add('show');
                    div1.classList.add('show');
                    div2.classList.add('show');
                    setTimeout(() => {
                        this.#showGameBox();
                    }, 2000);
                }, 1000); // Adjust the delay as needed
            }
        }, 1000); // Update every second
    }    

    #showGameBox(){
        let message = document.createElement('div');
        message.classList.add('message');
        message.innerHTML = `<p>${this.mode == 'x' ? "YOU" : this.opponent.name} turn</p>`;
        let tictactoe = document.createElement('div');
        tictactoe.classList.add('tictactoe');
        for(let i = 0 ; i < 9 ; i++){
            let cells = document.createElement('div');
            cells.classList.add('cell');
            tictactoe.append(cells);
        }
        this.panel.innerHTML = '';
        this.panel.append(message);
        let lobby = document.createElement('button');
        lobby.innerText = 'lobby';
        lobby.addEventListener('click',()=>{
            location.reload();
        })
        this.panel.append(tictactoe);
        this.panel.append(lobby);
        this.#addEventListeners();
    }
    
    opponentMove(position){
        const cells = document.querySelectorAll('.cell');
        const message = document.querySelector('.message p');
        cells[position].classList.add(this.mode);
        cells[position].innerHTML = this.mode;
        blocks[position] = this.mode;
        this.mode = 'x';
        message.textContent = "Your turn";
        this.#evaluateWinner();
    }

    opponentLeave(){
        if(!this.over){
            this.#hideTictactoe();
            const message = document.querySelector('.message p');
            message.classList.add('win');
            message.innerHTML = 'Opponent Leave match <br> You won';
            startConfetti();
        }
    }

    #addEventListeners() {
        const cells = document.querySelectorAll('.cell');
        const message = document.querySelector('.message p');

        cells.forEach((cell) => { // Use an arrow function here
            cell.addEventListener('click', () => {
                const cellIndex = Array.from(cells).indexOf(cell);
                if (cell.innerHTML == '' && this.mode == 'x') {
                    cell.classList.add(this.mode);
                    cell.innerHTML = this.mode;
                    blocks[cellIndex] = this.mode;
                    this.mode = 'o';
                    message.textContent = this.opponent.name + " turn";
                    client.myMove(cellIndex,this.opponent.id);
                    this.#evaluateWinner();
                }
            });
        });
    }

    #evaluateWinner(){
        const message = document.querySelector('.message p');
        let winner = check();
        if (winner !== null) {
            this.over = true;
            if (winner.win == 'x') {
                this.#updateWinningCells(winner.condition, 'winner-cell');
                message.classList.add('win');
                message.textContent = 'You Won';
                setTimeout(() => {
                    startConfetti();
                    this.#hideTictactoe();
                }, 300);
            } else if (winner.win == 'o') { // Fix the condition here
                this.#updateWinningCells(winner.condition, 'losser-cell');
                message.classList.add('loss');
                message.textContent = 'You Loss';
                setTimeout(() => {
                    looser();
                    this.#hideTictactoe();
                }, 300);
            } else {
                message.textContent = 'Match TIE';
                setTimeout(() => {
                    tie();
                }, 300);
            }
        } 
    }

    #hideTictactoe() {
        let tictactoe = document.querySelector('.tictactoe');
        tictactoe.style.display = 'none';
    }

    #updateWinningCells(winningIndexes, cls) {
        winningIndexes.forEach(index => {
            document.querySelectorAll('.cell')[index].classList.add(cls);
        });
    }



}