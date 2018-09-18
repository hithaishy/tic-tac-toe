/*
 * A two player Tic Tac Toe game
 * Whoever starts the game is player 1 (X)
 * Player 2 is O
 * 
 * Once the game is Won by a player or the game is Tied
 * it alerts the users and a New Game starts
 */

(function () {
    let game = {
        table: [],
        player: null
    };
    let playerValue = {
        1: 'X',
        2: 'O'
    };
    let availableCells = 9;
    function initializeGame() {
        /**
        *This function initializes the game
        *by giving default values to each cell in the game
        * Player 1 starts the game
        * 
        */
        game.table = Array.from(document.getElementsByTagName('td'));
        game.player = 1
        game.table.forEach((element) => {
            element.textContent = '';
        });
        let footer = document.getElementById('footer');
        footer.textContent = `${playerValue[game.player]}'s Turn`;
    }

    function redraw() {
        /**
         * Function to restart the game
         */
        location.reload();
    }

    function computeResultArray() {
        /**
         * Function to compute the matrix with current status
         * @returns result matrix
         */
        let result = new Array(3)
        for (i = 0; i < 3; i++)
            result[i] = new Array(3)
        let rows = Array.from(document.getElementsByTagName('tr'));
        rows.forEach((row, i, rowArr) => {
            let cols = Array.from(row.getElementsByTagName('td'));
            cols.forEach((col, j, colArr) => {
                result[i][j] = parseInt(col.getAttribute("data-points"));
            });
        });
        return result;

    }

    function checkWinner() {
        /**
         * Function to check if there is a winner
         * @returns if there is a winner
         */
        let mapPlayers = {
            '3' : 'X',      //if the sum comes to 3 its player 1
            '-3' : 'O'      //if the sum comes to -3 then its player 2
        };
        let result = computeResultArray();
        for (let i = 0; i < 3; i++) {
            let rowSum = 0;
            for (let j = 0; j < 3; j++) {
                rowSum += result[i][j];
            }
            if (rowSum === 3 || rowSum === -3) {              //check horizontal win condition
                return mapPlayers[rowSum];
            }
        }

        for (let i = 0; i < 3; i++) {
            let colSum = 0;
            for (let j = 0; j < 3; j++) {
                colSum += result[j][i];
            }
            if (colSum === 3 || colSum === -3) {             //check vertical win condition
                return mapPlayers[colSum];
            }
        }
        let leftDiagonalsum = result[0][0] + result[1][1] + result[2][2];
        if (leftDiagonalsum === 3 || leftDiagonalsum === -3) {     //check diagonal win condition  
            return mapPlayers[leftDiagonalsum];
        }

        let rightDiagonalSum = result[2][0] + result[1][1] + result[0][2];
        if (rightDiagonalSum === 3 || rightDiagonalSum === -3) {      //check diagonal win condition  
            return mapPlayers[rightDiagonalSum];
        }

    };


    document.addEventListener("DOMContentLoaded", () => {
        initializeGame();
        let grid = document.getElementById('body');
        grid.addEventListener('click', (event) => {             //adding event listener once the DOM is loaded
            if (event.target && event.target.nodeName === 'TD') {       //Listening to all click events on td
                availableCells--;
                if (event.target.textContent === '') {
                    let text = document.createTextNode(playerValue[game.player]);
                    let footer = document.getElementById('footer');
                    event.target.setAttribute('data-points', (game.player === 2) ? -1 : 1);
                    event.target.appendChild(text);
                    event.target.className = 'click-disabled';
                    (game.player == 1) ? game.player = 2 : game.player = 1;
                    footer.textContent = ((checkWinner() == null) && (availableCells === 0)) ? `Match Tied` : `${playerValue[game.player]}'s Turn`; //checking if there is a tie and updating the footer
                }
                setTimeout(() => {  //making an async call to check if we have winner
                    if (availableCells <= 6) {
                        let won = null;
                        won = checkWinner();
                        if (won != null) {
                            alert(`${won} Won`);
                            redraw();
                        } else if (availableCells === 0) {
                            alert('Match Tied');
                            redraw();
                        }
                    }
                }, 0);
            }
        });
    });

})();

