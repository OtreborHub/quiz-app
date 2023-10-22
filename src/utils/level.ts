enum Level {
    EASY = "facile",
    INTERMEDIATE = "intermedio",
    DIFFICULT = "difficile",
    NONE = ""
}

function getNextLevel(currentLevel: Level){
    switch(currentLevel){
        case Level.EASY: return Level.INTERMEDIATE;
        case Level.INTERMEDIATE: return Level.DIFFICULT;
        default: return Level.EASY;
    }
}

export { getNextLevel, Level };