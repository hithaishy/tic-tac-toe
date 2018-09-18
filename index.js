/*
 * 
 * 
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

    function initializeGame() {
        game.table = Array.from(document.getElementsByTagName('td'));
        game.player = 1
        game.table.forEach((element) => {
            element.textContent = '';
            element.className = 'click-enabled';
        });
        
    }

    function computeResultArray() {
        let result = new Array(3)
        for (i = 0; i < 3; i++)
            result[i] = new Array(3)
        let rows = Array.from(document.getElementsByTagName('tr'));
        rows.forEach((row,i,rowArr)=>{
            let cols = Array.from(row.getElementsByTagName('td'));
            cols.forEach((col,j,colArr)=>{
                result[i][j] = parseInt(col.getAttribute("data-points"));
            });
        });
        return result;
        
    }

    function checkWinner(){
        let result = computeResultArray();
        let Won = null;
        for (let i = 0; i < 3; i++) {
            let rowSum = 0;
            for (let j = 0; j < 3; j++) {
                rowSum += result[i][j];
            }
            if (rowSum === 3){
                Won = 'X';
            } else if (rowSum === 6){
                Won = 'O';
            }
        }

        for (let i = 0; i < 3; i++) {
            let colSum = 0;
            for (let j = 0; j < 3; j++) {
                colSum += result[j][i];
            }
            if (colSum === 3) {
                Won = 'X';
            } else if (colSum === 6) {
                Won = 'O';
            }
        }

        if (result[0][0] + result[1][1] + result[2][2] === 3) {
            Won = 'O';
        } else if (result[0][0] + result[1][1] + result[2][2] === 6) {
            Won = 'O';
        }
            

        if (result[2][0] + result[1][1] + result[0][2] === 3){
            Won = 'X';
        } else if (result[2][0] + result[1][1] + result[0][2] === 6){
            Won = 'O';
        }
        if(Won){
            alert(`${Won} Wins`);
        } else {
            alert(`Nobody Won`);
        }
    };
    
    
    
    document.addEventListener("DOMContentLoaded", function () {
        initializeGame();
        let grid = document.getElementById('body');
        grid.addEventListener('click', (event) => {
            if (event.target && event.target.nodeName === 'TD') {
                if (event.target.textContent === '') {
                    let text = document.createTextNode(playerValue[game.player]);
                    event.target.setAttribute('data-points', game.player);
                    event.target.appendChild(text);
                    event.target.className = 'click-disabled';
                    (game.player == 1) ? game.player = 2 : game.player = 1;
                    
                }
            }
        });
    });

})();

