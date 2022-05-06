function generateRandomIntegerInDefinedRange(firstBoundary, secondBoundary) {
    const min = Math.min(firstBoundary, secondBoundary);
    const max = Math.max(firstBoundary, secondBoundary);
    // Both boundaries are included in the possible result, thus +1
    // (e.g. for 0 and 1 there are 2 possible results)
    const range = max - min + 1;
    const result = ( Math.floor(Math.random() * range) ) + min;
    return result;
}

function passesSpawnChance() {
    return Math.random() <= gameSettings.chanceOfSpawningPerGameTick/1000;
}

function onKeyDown(e) {
    const key = e.key;
    if (gameSettings.possibleLetters.includes(key)) {
        console.log('Pressed game key:', key);
        setPressedKey(key);
    }
}

function setGameSettingFromHtmlField(field) {
    const element = document.getElementById(`${field}_input`);
    gameSettings[field] = parseInt(element.value);
}