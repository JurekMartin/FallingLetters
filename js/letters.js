function moveLetters() {
    gameStats.activeLetters.forEach(letter => {
        letter.resolveTick()
    })
};

function randomlyCreateLetter() {
    if (!passesSpawnChance()) {
        return;
    }
    const letter = generateRandomLetter();
    saveNewLetter(letter);
}

function generateRandomLetter() {
    /*
    We generate the letters Y and X positions first and then adjust their
    height range so that they will fit into the game area.
    This will lead to statistically more smaller letters being spawned.
    Other possibility would be to set their size first, which would result
    in the letters being statistically spawned further from the edges.
    */
   const {minTileSize, maxTilesize, playAreaWidth, playAreaHeight, minFontSize} = gameSettings;
   const xCoordinate = generateRandomIntegerInDefinedRange(0, playAreaWidth - minTileSize);
   // Height / 2 is there because we can spawn them only in the upper half of the game area
   const yCoordinate = generateRandomIntegerInDefinedRange(0, playAreaHeight/2 - minTileSize);
   const finalmaxTilesize = Math.min(playAreaWidth - xCoordinate, playAreaHeight/2 - yCoordinate, maxTilesize);
   const size = generateRandomIntegerInDefinedRange(minTileSize, finalmaxTilesize);
   const fontSize = generateRandomIntegerInDefinedRange(minFontSize, size);
   // Colors will be simple RGB
   const red = generateRandomIntegerInDefinedRange(0, 255);
   const blue = generateRandomIntegerInDefinedRange(0, 255);
   const green = generateRandomIntegerInDefinedRange(0, 255);
   const bgColorString = `${red}, ${blue}, ${green}`;

   const possibleLetters = gameSettings.possibleLetters;
   const pickedLetter = possibleLetters[generateRandomIntegerInDefinedRange(0,possibleLetters.length-1)];

   const result = new Letter({xCoordinate, yCoordinate, size, bgColorString, value: pickedLetter, fontSize});
   return result;
}

class Letter {
    size;
    fontSize;
    xCoordinate;
    yCoordinate;
    bgColorString;
    value;

    letterFailed = false;

    constructor(data) {
        Object.assign(this, data);
    };

    resolveTick() {
        if (!this.letterFailed) {
            this.moveDown();
            this.evaluateFailure();
        }
    }

    moveDown() {
        this.yCoordinate += gameSettings.letterSpeed;
    };

    evaluateFailure() {
        if (this.yCoordinate + this.size >= gameSettings.playAreaHeight) {
            // the letter just hit the bottom of the game field
            this.letterFailed = true;
            this.yCoordinate = gameSettings.canvasHeight - this.size;
        }
    }
}