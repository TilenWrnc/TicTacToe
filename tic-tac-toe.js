const square = document.querySelectorAll(".square");
const playerOneScore = document.querySelector(".player-one-score");
const playerTwoScore = document.querySelector(".player-two-score");
const winnerPopUp = document.querySelector("#winner");
const intro = document.querySelector(".intro");
const buttonContainer = document.querySelector(".button-container");


function Player(marker) {
    this.marker = marker;
};

function playerChange() {
    if (currentMode == "PlayerOne") {
        return currentMode = "PlayerTwo"
    } else {
        return currentMode = "PlayerOne"
    }
};

function ButtonDisabler() {
    square.forEach((button) => {
        button.disabled = true;
    });
};

function newGame() {
    square.forEach((button) => {
        button.textContent = "";
        winnerPopUp.textContent = "";
        currentMode = "PlayerOne";
        button.disabled = false;
    })
}

function NewGameButtonCreate() {
    const newGameButton = document.createElement("button");
    newGameButton.classList.add("new-game-button");
    buttonContainer.appendChild(newGameButton);
    newGameButton.textContent = "NEW GAME";
    return newGameButton;
};

function restartGameButtonCreate() {
    const restartGameButton = document.createElement('button');
    restartGameButton.classList.add("restart-game-button");
    buttonContainer.appendChild(restartGameButton);
    restartGameButton.textContent = "RESTART GAME";
    return restartGameButton;
};

function arrayClear() {
    arrayOne = [
        [],[],[],
        [],[],[],
        [],[],[],
];
};

function restartGame() {
    const newGameButton = NewGameButtonCreate();
    newGameButton.addEventListener("click", () => {
        newGame();
        arrayClear();
        while (buttonContainer.firstChild) {
            buttonContainer.removeChild(buttonContainer.firstChild);
        }
    });
};

function resetGame() {
    const restartGameButton = restartGameButtonCreate();
    restartGameButton.addEventListener("click", () => {
        newGame();
        arrayClear();
        playerOneScoreCount = 0;
        playerTwoScoreCount = 0;
        playerOneScore.textContent = playerOneScoreCount;
        playerTwoScore.textContent = playerTwoScoreCount;
        while (buttonContainer.firstChild) {
            buttonContainer.removeChild(buttonContainer.firstChild);
        }    
    })
}

function resetScore() {
    playerOneScoreCount = 0;
    playerTwoScoreCount = 0;
    currentMode = "PlayerOne"
    arrayClear();
};

const playerOne = new Player("X");
const playerTwo = new Player("O");

let arrayOne = [
                [],[],[],
                [],[],[],
                [],[],[],
];

let currentMode = "PlayerOne";
let playerOneScoreCount = 0;
let playerTwoScoreCount = 0;
let rounds = 0;

square.forEach((button) => {
    button.addEventListener("mouseenter", function() {
        if (button.disabled) {
            return;
        }

        const hoverElement = document.createElement("span");
        hoverElement.classList.add("hover-element");
        if (currentMode == "PlayerOne") {
            hoverElement.textContent = playerOne.marker;
        } else if (currentMode == "PlayerTwo") {
            hoverElement.textContent = playerTwo.marker;
        } 
        button.appendChild(hoverElement);
    });

    button.addEventListener("mouseleave", function() {
        const hoverElement = document.querySelector(".hover-element");
        if (hoverElement) {
            hoverElement.remove();
        }
    });

    button.addEventListener("click", () => {
        if (currentMode == "PlayerOne") {
            button.textContent = playerOne.marker;
            playerChange();
            button.disabled = true;
            arrayOne[button.value] = playerOne.marker;
            rounds += 1;
        } else if (currentMode == "PlayerTwo") {
            button.textContent = playerTwo.marker;
            playerChange();
            button.disabled = true;
            arrayOne[button.value] = playerTwo.marker;
            rounds += 1;
        } 

        if (rounds == 9) {
            winnerPopUp.textContent = "DRAW!"
            restartGame();
            resetGame();
            rounds = 0;
        }

        if ((arrayOne[0] == playerOne.marker && arrayOne[1] == playerOne.marker && arrayOne[2] == playerOne.marker) ||
            (arrayOne[3] == playerOne.marker && arrayOne[4] == playerOne.marker && arrayOne[5] == playerOne.marker) ||
            (arrayOne[6] == playerOne.marker && arrayOne[7] == playerOne.marker && arrayOne[8] == playerOne.marker) ||
            (arrayOne[0] == playerOne.marker && arrayOne[3] == playerOne.marker && arrayOne[6] == playerOne.marker) ||
            (arrayOne[1] == playerOne.marker && arrayOne[4] == playerOne.marker && arrayOne[7] == playerOne.marker) ||
            (arrayOne[2] == playerOne.marker && arrayOne[5] == playerOne.marker && arrayOne[8] == playerOne.marker) ||
            (arrayOne[0] == playerOne.marker && arrayOne[4] == playerOne.marker && arrayOne[8] == playerOne.marker) ||
            (arrayOne[2] == playerOne.marker && arrayOne[4] == playerOne.marker && arrayOne[6] == playerOne.marker)) {
                winnerPopUp.textContent = "PLAYER ONE WINS!";
                playerOneScoreCount += 1;
                restartGame();
                resetGame();
                playerOneScore.textContent = playerOneScoreCount;
                ButtonDisabler();
                rounds = 0;
        } else if ( (arrayOne[0] == playerTwo.marker && arrayOne[1] == playerTwo.marker && arrayOne[2] == playerTwo.marker) ||
            (arrayOne[3] == playerTwo.marker && arrayOne[4] == playerTwo.marker && arrayOne[5] == playerTwo.marker) ||
            (arrayOne[6] == playerTwo.marker && arrayOne[7] == playerTwo.marker && arrayOne[8] == playerTwo.marker) ||
            (arrayOne[0] == playerTwo.marker && arrayOne[3] == playerTwo.marker && arrayOne[6] == playerTwo.marker) ||
            (arrayOne[1] == playerTwo.marker && arrayOne[4] == playerTwo.marker && arrayOne[7] == playerTwo.marker) ||
            (arrayOne[2] == playerTwo.marker && arrayOne[5] == playerTwo.marker && arrayOne[8] == playerTwo.marker) ||
            (arrayOne[0] == playerTwo.marker && arrayOne[4] == playerTwo.marker && arrayOne[8] == playerTwo.marker) ||
            (arrayOne[2] == playerTwo.marker && arrayOne[4] == playerTwo.marker && arrayOne[6] == playerTwo.marker)) {
                winnerPopUp.textContent = "PLAYER TWO WINS!";
                playerTwoScoreCount += 1;
                restartGame();
                resetGame();
                playerTwoScore.textContent = playerTwoScoreCount;
                ButtonDisabler();
                rounds = 0;
        } 
    })
    
});
  