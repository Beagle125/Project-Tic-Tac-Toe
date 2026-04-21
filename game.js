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
** showBoardState - a getter for the board array
** findWin - checks if there is already a winning combination
*/
const Gameboard = (function(){
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

    let showBoardState = () => {
        return board;
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
        showBoardState,
        findWin
    }
})();




/*
Player Object
*** Purpose:
** This is for creating a player object

*** Variables:
** playerSymbol is the symbol used by the player
** playerName is the chosen name of the player
** playerScore is the current score of the player

*** Methods
** getPlayerSymbol - a getter to returning the playerSymbol
** getPlayerName - a getter to returning the playerName
** getPlayerScore - a getter to return the player score
** incrementPlayerScore - a method that adds one to the player score
*/
let Player = (function(symbol){
    let playerSymbol = symbol;
    let playerScore = 0;
    const playerName = prompt(`Player ${playerSymbol} what is your name? `);

    const getPlayerSymbol = () => {
        return playerSymbol;
    };

    const getPlayerName = () => {
        return playerName;
    };

    const getPlayerScore = () =>{
        return playerScore;
    };

    const incrementPlayerScore = () =>{
        playerScore += 1;
    };

    return {
        getPlayerSymbol,
        getPlayerName,
        getPlayerScore,
        incrementPlayerScore
    };
});


/*
DOM Manipulator object
*** Purpose:
** This will be responsible for accessing the DOM and updating the visuals

*** Variables:
** playerXScore - the p element that holds the display of playerXScore
** playerOScore - the p element that holds the display of playerOScore
** playerXName - the p element that holds the display of playerXName
** playerOName - the p element that holds the display of playerOName
** footerMessage - the p element that holds the message on the footer

*** Methods:
** setName - set the name of the players in the DOM after getting it
** setScore - set the score of the winning player after a game has finished
** setMessage - set the message of the footer
    ** Code 1 - `${playerXName}'s turn`
    ** Code 2 - `${playerOName}'s turn`
    ** Code 3 - `${playerXName} wins click anywhere to reset`
    ** Code 4 - `${playerOName} wins click anywhere to reset`
    ** Code 5 - "It is a tie click anywhere to reset"
*/
const DOMManipipulator = (function(){
    // Declare variables
    const playerXScore = document.querySelector(".playerX-score");
    const playerOScore = document.querySelector(".playerO-score");
    const playerXName = document.querySelector(".playerX-name");
    const playerOName = document.querySelector(".playerO-name");
    const footerMessage = document.querySelector(".footer-message");

    const setName = (name, symbol) => {
        if (symbol === 'X')
            playerXName.textContent = `${name}`;
        else
            playerOName.textContent = `${name}`;
    };

    const setScore = (score, symbol) => {
        if (symbol === 'X')
            playerXScore.textContent = `${score}`;
        else
            playerOScore.textContent = `${score}`;
    };

    const setMessage = (code, playerXName, playerOName) => {
        let message;
        switch (code){
            case 1:
                message = `${playerXName}'s turn`;
                break;
            case 2:
                message = `${playerOName}'s turn`;
                break;
            case 3:
                message = `${playerXName} wins click anywhere to reset`;
                break;
            case 4:
                message = `${playerOName} wins click anywhere to reset`;
                break;
            case 5:
                message = "It is a tie click anywhere to reset";
        }


        footerMessage.textContent = message;
    };

    return{
        setName,
        setScore,
        setMessage
    };

})();
/*
Game Logic Object
*** Purpose:
** This will be responsible for controlling the logic of the game
** It checks for which player turn it is
** It checks for if a player has won a game already

*** Variables:
** currentPlayer - determines which player turn it is true is player1 and false is player2
** chosenPos - stores the chosen position of the player
** isTie - determines the end state of the game if its a tie or not
** player1 - is an object
** player2 - is an object
** gameboard - is the main gameboard an object
** domManipulator - is the object the manipulates the DOM within the game controller

*** Methods:
** showPlayerName - This is for pure utility purposes, just to show the name of player associated with the X or O symbols
** gameOver - This flags and returns a boolean value whether the game has ended or not
** playerTurn - This contains all the logic related to getting, validating, and plotting a current player's turn
** winningPlayer - logs the winning player

*/ 
const Controller = (function(){
    // Declare variables
    let chosenPos;
    let isTie;
    let currentPlayer = true; // start with player 1 as true
    const gameboard = Gameboard;
    const domManipulator = DOMManipipulator;

    // Set the names of the players, set their scores, set the starting footer message and create new player objects
    const player1 = Player('X');
    const player2 = Player('O');

    domManipulator.setName(player1.getPlayerName(), player1.getPlayerSymbol());
    domManipulator.setName(player2.getPlayerName(), player2.getPlayerSymbol());

    domManipulator.setScore(player1.getPlayerScore(), player1.getPlayerSymbol());
    domManipulator.setScore(player2.getPlayerScore(), player2.getPlayerSymbol());

    if (currentPlayer)
        domManipulator.setMessage(1, player1.getPlayerName(), player2.getPlayerName());
    else
        domManipulator.setMessage(2, player1.getPlayerName(), player2.getPlayerName());
    
    // Main methods
    const showPlayerName = (symbol) =>{
        if (symbol == 'X')
            console.log(player1.getPlayerName());
        else if (symbol == 'O')
            console.log(player2.getPlayerName());
        else
            console.log("Invalid symbol");
    };

    let gameOver = () =>{
        let numOfFreeSpace = gameboard.numOfFreeSpace();
        let isWin = gameboard.findWin();
        // check if the positions are all filled
        if (numOfFreeSpace === 0){
            isTie = true;
            return true;
        }
        // check if there is already a winning combination
        else if (isWin){
            isTie = true;
            return true;
        }
        // else return false
        else
            return false;
    };

    const playerTurn = () =>{
            // Get the player's position
            let playerSymbol;
            let chosenPos = -1;

            // get the current player's symbol
            if (currentPlayer)
                playerSymbol = player1.getPlayerSymbol();
            else
                playerSymbol = player2.getPlayerSymbol();
            
            // Check then update the board
            do{
                chosenPos = prompt(`Player ${playerSymbol} your move: `);
            }while(gameboard.showBoardState()[chosenPos] != '0');
            
            gameboard.addPosition(playerSymbol, chosenPos);
            
            // Update the next player
            currentPlayer = !currentPlayer;

            // Update the footer message
            if (currentPlayer)
                domManipulator.setMessage(1, player1.getPlayerName(), player2.getPlayerName());
            else
                domManipulator.setMessage(2, player1.getPlayerName(), player2.getPlayerName());

    };

    const winningPlayer = () =>{
        currentPlayer = !currentPlayer;
        
        if (isTie){
            console.log("It is a tie!");
            domManipulator.setMessage(5, player1.getPlayerName(), player2.getPlayerName())
        }
        else{
            if (currentPlayer){
                console.log(`${player1.getPlayerName()} is the winner!`);
                player1.incrementPlayerScore();
                domManipulator.setScore(player1.getPlayerScore(), player1.getPlayerSymbol());
                domManipulator.setMessage(3, player1.getPlayerName(), player2.getPlayerName())
            }
            else{
                console.log(`${player2.getPlayerName()} is the winner!`);
                player2.incrementPlayerScore();
                domManipulator.setScore(player2.getPlayerScore(), player2.getPlayerSymbol());
                domManipulator.setMessage(4, player1.getPlayerName(), player2.getPlayerName())
            }
        }

    };

    return {
        showPlayerName,
        gameOver,
        playerTurn,
        winningPlayer
    };
})();

const Game = Controller;