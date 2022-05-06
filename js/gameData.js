const gameSettings = {}

const gameStats = {}

const defaultGameStats = {
    gameIsInProgress: true,
    gameIsPaused: false,
    activeLetters: [],
    failedLetters: [],
    score: 0,
    timer: 0,
    // Theoretically more keys can be pressed per tick
    pressedKeys: {}
}

const defaultGameSettings = {
    chanceOfSpawningPerGameTick: 150, // 1000 = 100%
    canvasWidth: 400,
    canvasHeight: 460,
    playAreaWidth: 400,
    playAreaHeight: 400,
    minTileSize: 20,
    maxTilesize: 60,
    minFontSize: 20,
    letterSpeed: 2,
    // Note: adding a character more than once here will result in higher
    // % of it spawning
    possibleLetters: 'abcde',
    fps: 30,
    limitOfFailures: 20,
    autoAcceleration: false,
    //10 seconds with 30FPS, note that it will get exponentially faster :)
    acceleratePerNrOfTicks: 300
}