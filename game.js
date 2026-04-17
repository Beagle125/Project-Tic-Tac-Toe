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
*/
function Gameboard(){
    const board = [];

    // This creates the starting condition of the board
    for (let i = 0; i < positions; i++){
        board[i] = '0';
    }

    const addPosition = (symbol, chosenPos) =>{
        board[chosenPos] = symbol;
    };


    return {
        addPosition
    };

}


/*
Player Object
*** Purpose:
** This is for creating a player object

*** Variables:
** playerSymbol is the symbol used by the player
** playerName is the chosen name of the player (TO BE ADDED)
*/
function Player(symbol){
    let playerSymbol = symbol;
    const playerName = prompt(`Player ${playerSymbol} what is your name? `);

    return {playerSymbol, playerName};
}


/*
Game Logic Object
*** Purpose:
** This will be responsible for controlling the logic of the game
** It checks for which player turn it is
** It checks for if a player has won a game already

*** Variables:
** currentPlayer determines which player turn it is
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
        // check if the positions are all filled

        // check if there is already a winning combination

        // else return false
    };

    const gameLoop = () =>{
        do{
            // Get the player's position
            console.log('This works');
            // Update the board

            // Update the next player

        }while(!gameOver);
    };

    return {
        showPlayerName,
        gameboard,
        gameOver,
        gameLoop
    };
}

const game = Controller();