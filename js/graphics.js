function drawGameState() {
    const { playAreaHeight, playAreaWidth, canvasHeight, canvasWidth } = gameSettings;
    const canvas = document.getElementById('game-canvas');
    const context = canvas.getContext('2d');
    // scale stuff should prevent blurry lines
    const scale = window.devicePixelRatio;
    canvas.height = canvasHeight*scale;
    canvas.width = canvasWidth*scale;
    context.scale(scale, scale);

    context.clearRect(0, 0, canvas.width, canvas.height); 
    context.moveTo(0, playAreaHeight/2);
    context.lineTo(playAreaWidth, playAreaHeight/2);
    context.moveTo(0, playAreaHeight);
    context.lineTo(playAreaWidth, playAreaHeight);
    context.stroke();
    
    gameStats.activeLetters.forEach(letter => {
        drawLetter(context, letter);
    })
    gameStats.failedLetters.forEach(letter => {
        drawLetter(context, letter);
    })

    if (!gameStats.gameIsInProgress) {
        drawGameOver(context);
    }
}

function drawLetter(context, letter) {
    const {bgColorString, xCoordinate, yCoordinate, size, fontSize, value} = letter;
    // I add some opacity to the background as the letters can overlap
    // and the background can be very dark - opacity helps in both cases
    context.fillStyle = `rgba(${bgColorString},0.5)`;
    context.fillRect(xCoordinate, yCoordinate, size, size);
    context.font = `${fontSize}px arial`;
    context.fillStyle = `#000000`;
    // We want to approximately center the letter in the box
    // Possible nice-to-have: do this properly
    context.fillText(value.toUpperCase(), xCoordinate + size/2 - fontSize/4 - 3, yCoordinate + size/2 + fontSize/4 + 3);
}

function drawGameOver(context) {
    context.fillStyle = `rgb(255,0,0)`;
    context.font = `50px arial`;
    context.fillText('Game Over :(', 50, 75);
    context.fillText(`Score: ${gameStats.score}`, 50, 150);
}

function setInputFieldsAccordingToGameSettings() {
    const { chanceOfSpawningPerGameTick, letterSpeed, fps } = gameSettings;
    const fpsElement = document.getElementById('fps_input');
    fpsElement.value = fps;
    const spawnChanceElement = document.getElementById('chanceOfSpawningPerGameTick_input');
    spawnChanceElement.value = chanceOfSpawningPerGameTick;
    const letterSpeedElement = document.getElementById('letterSpeed_input');
    letterSpeedElement.value = letterSpeed;
}

function showCurrentScorePoints() {
    document.getElementById('score').innerHTML=String(gameStats.score);
}