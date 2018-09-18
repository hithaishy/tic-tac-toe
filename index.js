

(function () {
    let game = {
        table: [],
        player : null
    };
    let playerValue = {
        1 :'X',
        2 : 'O'

    }  
 
    function initializeGame() {
        game.table = Array.from(document.getElementsByTagName('td'));
        game.player = 1
        return game;
    }
    
    document.addEventListener("DOMContentLoaded", function () {
        initializeGame();
        let grid = document.getElementById('body');
        grid.addEventListener('click',(event)=>{
            if(event.target && event.target.nodeName === 'TD'){
                if (game.table[event.target.id].textContent === ""){
                    let text = document.createTextNode(playerValue[game.player]);
                    game.table[event.target.id].appendChild(text);
                    console.log(game.table[event.target.id].text);
                    (game.player == 1) ? game.player = 2 : game.player = 1;
                }
                
            }
        })
    });
    
})();
 
