function playGame() {
    if (!gameStats.gameIsInProgress || gameStats.gameIsPaused) {
        return;
    }

    moveLetters();
    resolveFailures();
    evalueatePressedKeys();
    randomlyCreateLetter();
    checkForGameOver();
    showCurrentScorePoints();
    addTimer();
    drawGameState();

    if (gameStats.gameIsInProgress && !gameStats.gameIsPaused) {
        setTimeout(()=> {
            playGame();
        }, 1000/gameSettings.fps)
    }
}

function togglePause() {
    gameStats.gameIsPaused = !gameStats.gameIsPaused;
    if (!gameStats.gameIsPaused) {
        playGame();
    }
}

function restartGame() {
    const gameIsRunning = isGameRunning();
    setDefaultGameData();
    if (!gameIsRunning) {
        playGame();
    }
}

function toggleAutoAcceleration() {
    gameSettings.autoAcceleration = !gameSettings.autoAcceleration;
}