function setEventListeners() {
    document.addEventListener('keydown', onKeyDown)
}

function checkForGameOver() {
    if (gameStats.failedLetters.length >= gameSettings.limitOfFailures) {
        gameStats.gameIsInProgress = false;
    };
};

function isGameRunning() {
    return gameStats.gameIsInProgress && !gameStats.gameIsPaused;
}

function evalueatePressedKeys() {
    Object.keys(gameStats.pressedKeys).forEach(key => {
        if (gameStats.pressedKeys[key]) {
            const nrOfActiveLettersWithKey = gameStats.activeLetters.filter(letter => letter.value === key).length;
            if (nrOfActiveLettersWithKey > 1) {
                for( let i = 0; i < gameStats.activeLetters.length; i++){ 
                    if ( gameStats.activeLetters[i].value === key) { 
                        gameStats.activeLetters.splice(i, 1);
                        i--;
                        gameStats.score++;
                    }
                }
            }
        }
    })

    resetPressedKeys();
};

function resolveFailures() {
    for( let i = 0; i < gameStats.activeLetters.length; i++){ 
        if ( gameStats.activeLetters[i].letterFailed) { 
            const failedLetter = gameStats.activeLetters.splice(i, 1); 
            i--;
            gameStats.failedLetters.push(failedLetter[0]);
            console.log("Letter failed, all fails count:", gameStats.failedLetters.length);
        }
    }
}

function addTimer() {
    //  Any difficulty-with-time logic will go here
    gameStats.timer++;
    
    if (!gameSettings.autoAcceleration) {
        return;
    }

    if (!(gameStats.timer % gameSettings.acceleratePerNrOfTicks)) {
        gameSettings.fps++;
        setInputFieldsAccordingToGameSettings();
    }
}

function setDefaultGameData() {
    // without deep copying there will be a mess if the stats or settings
    // had objects on them
    Object.assign(gameStats, JSON.parse( JSON.stringify( defaultGameStats ) ) );
    Object.assign(gameSettings, JSON.parse( JSON.stringify( defaultGameSettings) ) );
    setInputFieldsAccordingToGameSettings();
}

function setPressedKey(key) {
    gameStats.pressedKeys[key] = true;
}

function resetPressedKeys() {
    gameStats.pressedKeys = {}
}

function saveNewLetter(letter) {
    gameStats.activeLetters.push(letter);
}