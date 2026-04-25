/* 
CONSTANT GLOBAL VARIABLES
*/
const positions = 9;
let player1Name;
let player2Name;

/*
Gameboard Object
*** Purpose:
** This will serve as the main gameboard for the game

*** Variables:
** 1D array of board that stores all the positions

*** Methods
** resetBoard - deals with resetting the board
** addPosition - deals with adding a player's position to the board. This assumes it is valid.
** numOfFreeSpace - returns the number of unoccupied cells
** showBoardState - a getter for the board array
** findWin - checks if there is already a winning combination
*/
const Gameboard = (function(){
    const board = [];

    const resetBoard = () => {
        // This creates the starting condition of the board
        for (let i = 0; i < positions; i++){
            board[i] = '0';
        }
    };


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
        resetBoard,
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
let Player = (function(symbol, name){
    let playerSymbol = symbol;
    let playerScore = 0;
    const playerName = name;

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
** footerContainer - the div container for the footer

*** Methods:
** setName - set the name of the players in the DOM after getting it
** setScore - set the score of the winning player after a game has finished
** setMessage - set the message of the footer
    ** Code 1 - `${playerXName}'s turn`
    ** Code 2 - `${playerOName}'s turn`
    ** Code 3 - `${playerXName} wins click anywhere to reset`
    ** Code 4 - `${playerOName} wins click anywhere to reset`
    ** Code 5 - "It is a tie click anywhere to reset"
** setToken - this add the token or text to the cell that was chosen
** removeClass - this is to remove the class content-cell to remove hover effect
** startGame - this to remove the hover effect of the footer indicating that it is not clickable
** endGame - this is to add the hover effect of the footer indiciating that it is now clickable
*/
const DOMManipipulator = (function(){
    // Declare variables
    const playerXScore = document.querySelector(".playerX-score");
    const playerOScore = document.querySelector(".playerO-score");
    const playerXName = document.querySelector(".playerX-name");
    const playerOName = document.querySelector(".playerO-name");
    const footerMessage = document.querySelector(".footer-message");
    const footerContainer = document.querySelector(".footer-container");

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
                message = `${playerXName} wins click here to reset`;
                break;
            case 4:
                message = `${playerOName} wins click here to reset`;
                break;
            case 5:
                message = "It is a tie click anywhere to reset";
        }
        footerMessage.textContent = message;
    };

    const setToken = (function(cellID, playerSymbol){
        let cell = document.getElementById(cellID);

        if (playerSymbol == 'X')
            cell.textContent = "X";
        else
            cell.textContent = "O";
    });

    const removeClass = (function(cellID){
        let cell = document.getElementById(cellID);

        if (cell.classList.contains("content-hover"))
            cell.classList.remove("content-hover");
    });

    const addClass = (function(cellID){
        let cell = document.getElementById(cellID);
        cell.classList.add("content-hover");

        // Remove all the token
        cell.textContent = "";
    });

    const startGame = () => {
        if (footerContainer.classList.contains("footer-hover"))
            footerContainer.classList.remove("footer-hover");
    };

    const endGame = () => {
        footerContainer.classList.add("footer-hover");
    };

    return{
        setName,
        setScore,
        setMessage,
        setToken,
        removeClass,
        addClass,
        startGame,
        endGame
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
** cells - this contains all the divs that are cells in the gameboard

*** Methods:
** initializeNewGame - This is for resetting the game
** showPlayerName - This is for pure utility purposes, just to show the name of player associated with the X or O symbols
** gameOver - This flags and returns a boolean value whether the game has ended or not
** playerTurn - This contains all the logic related to getting, validating, and plotting a current player's turn
** winningPlayer - logs the winning player

*/ 
const Controller = (function(){
    // Declare important variables
    let gameboard = Gameboard;
    let domManipulator = DOMManipipulator;
    let chosenPos
    let isTie;
    let cells = document.querySelectorAll('.content-cell');
    let test = document.querySelector('.footer-container')

    // Set the names of the players, set their scores, set the starting footer message and create new player objects
    const player1 = Player('X', player1Name);
    const player2 = Player('O', player2Name);

    // Initialize New Game
    const initializeNewGame = () => {
        currentPlayer = true; // start with player 1 as true

        gameboard.resetBoard();
        DOMManipipulator.startGame();

        if (currentPlayer)
            domManipulator.setMessage(1, player1.getPlayerName(), player2.getPlayerName());
        else
            domManipulator.setMessage(2, player1.getPlayerName(), player2.getPlayerName());

        domManipulator.setName(player1.getPlayerName(), player1.getPlayerSymbol());
        domManipulator.setName(player2.getPlayerName(), player2.getPlayerSymbol());

        domManipulator.setScore(player1.getPlayerScore(), player1.getPlayerSymbol());
        domManipulator.setScore(player2.getPlayerScore(), player2.getPlayerSymbol());

        cells.forEach((cell) => {
            domManipulator.addClass(cell.id);
        });
    };

    // Call the game to start
    initializeNewGame();
    
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
        if (isWin){
            isTie = false;
            return true;
        }
        // check if there is already a winning combination
        else if (numOfFreeSpace === 0){
            isTie = true;
            return true;
        }
        // else return false
        else
            return false;
    };

    const playerTurn = () =>{
        if (!gameOver()){
            // Get the player's position
            let playerSymbol;

            // get the current player's symbol
            if (currentPlayer)
                playerSymbol = player1.getPlayerSymbol();
            else
                playerSymbol = player2.getPlayerSymbol();
            
            // Check then update the board
            if (gameboard.showBoardState()[chosenPos] === '0'){
                gameboard.addPosition(playerSymbol, chosenPos);
                domManipulator.setToken(chosenPos, playerSymbol);
                domManipulator.removeClass(chosenPos);
                console.log("Successful Move");

                // Update the next player
                currentPlayer = !currentPlayer;
            }
            else{
                console.log("Invalid Move");
            }
            
            // Update the footer message
            if (currentPlayer)
                domManipulator.setMessage(1, player1.getPlayerName(), player2.getPlayerName());
            else
                domManipulator.setMessage(2, player1.getPlayerName(), player2.getPlayerName());

            // Check if the game is over
            if (gameOver())
                winningPlayer();     
        }
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

        cells.forEach((cell) => {
            domManipulator.removeClass(cell.id);
        });

        DOMManipipulator.endGame();
    };

    // Clicking cells event listener
    cells.forEach((cell) => {
        cell.addEventListener("click", () => {
            chosenPos = cell.id;
            playerTurn();
        });
    });

    // for resetting the game

    test.addEventListener("click", () => {
        if (gameOver())
            initializeNewGame();
    });

    return{
        showPlayerName,
        gameOver,
        playerTurn,
        winningPlayer
    };
});

/* This module is for everything related with the modal used in getting player input*/
const getPlayerNames = (function(){
    const modal = document.getElementById("my-dialog");
    modal.showModal();
})();


/*This global code is for listening on the player submitting the forms*/
window.addEventListener("submit", (event) => {
    player1Name = document.getElementById("P1Name").value;
    player2Name = document.getElementById("P2Name").value;
    const Game = Controller();
});


