/* 
CONSTANT GLOBAL VARIABLES
*/
const positions = 9;

/*
Gameboard Object
*** Purpose:
** This will serve as the main gameboard for the game

*** Variables:
** 1D array of board that stores all the positions

*** Methods
** addPosition - deals with adding a player's position to the board. This assumes it is valid.
** numOfFreeSpace - returns the number of unoccupied cells
** findWin - checks if there is already a winning combination
*/
function Gameboard(){
    const board = [];

    // This creates the starting condition of the board
    for (let i = 0; i < positions; i++){
        board[i] = '0';
    }

    const addPosition = (symbol, chosenPos) => {
        board[chosenPos] = symbol;
    };

    let numOfFreeSpace = () => {
       return (board.filter((position) => position === '0')).length;
    };

    let findWin = () => {
        let isWin;

        if ((board[0] != '0' && board[1] != '0' && board[2] != '0') && (board[0] == board[1] && board[0] == board[2]) ||
            (board[3] != '0' && board[4] != '0' && board[5] != '0') && (board[3] == board[4] && board[3] == board[5]) ||
            (board[6] != '0' && board[7] != '0' && board[8] != '0') && (board[6] == board[7] && board[6] == board[8]) ||
            (board[0] != '0' && board[3] != '0' && board[6] != '0') && (board[0] == board[3] && board[0] == board[6]) ||
            (board[1] != '0' && board[4] != '0' && board[7] != '0') && (board[1] == board[4] && board[1] == board[7]) ||
            (board[2] != '0' && board[5] != '0' && board[8] != '0') && (board[2] == board[5] && board[2] == board[8]) ||
            (board[0] != '0' && board[4] != '0' && board[8] != '0') && (board[0] == board[4] && board[0] == board[8]) ||
            (board[2] != '0' && board[4] != '0' && board[6] != '0') && (board[2] == board[4] && board[2] == board[6])
           ){
            isWin = true;
           }
        else{
            isWin = false;
        }
        return isWin;
    };

    return {
        addPosition,
        numOfFreeSpace,
        findWin
    };

}


/*
Player Object
*** Purpose:
** This is for creating a player object

*** Variables:
** playerSymbol is the symbol used by the player
** playerName is the chosen name of the player

*** Methods
** getPlayerSymbol - a setter to returning the playerSymbol
*/
function Player(symbol){
    let playerSymbol = symbol;
    const playerName = prompt(`Player ${playerSymbol} what is your name? `);

    let getPlayerSymbol = () => {
        return playerSymbol;
    };

    return {getPlayerSymbol};
}


/*
Game Logic Object
*** Purpose:
** This will be responsible for controlling the logic of the game
** It checks for which player turn it is
** It checks for if a player has won a game already

*** Variables:
** currentPlayer determines which player turn it is 0 is player1 and X is player2
** chosenPos stores the chosen position of the player
** player1 is an object
** player2 is an object
** gameboard is the main gameboard an object

*** Methods:

*/ 
function Controller(){
    let currentPlayer = 0; // start with player 1
    let chosenPos;
    const player1 = Player('X');
    const player2 = Player('O');
    const gameboard = Gameboard();

    const showPlayerName = (symbol) =>{
        if (symbol === 'X')
            console.log(player1.playerName);
        else
            console.log(player2.playerName);
    };

    let gameOver = () =>{
        let numOfFreeSpace = gameboard.numOfFreeSpace;
        let isWin = gameboard.findWin;
        // check if the positions are all filled
        if (numOfFreeSpace === 0)
            return true;
        // check if there is already a winning combination
        else if (isWin)
            return true;
        // else return false
        else
            return false;
    };

    const gameLoop = () =>{
        do{
            // Get the player's position
            let playerSymbol;
            let chosenPos;

            if (currentPlayer === 0)
                playerSymbol = player1.getPlayerSymbol();
            else
                playerSymbol = player2.getPlayerSymbol();

            do{
                chosenPos = prompt(`Player ${playerSymbol} move: `);
            }while(gameboard[chosenPos] != '0');
            
            // Update the board

            // Update the next player
            currentPlayer = !currentPlayer;

        }while(!gameOver());
    };

    return {
        showPlayerName,
        gameOver,
        gameLoop
    };
}

const Game = Controller();