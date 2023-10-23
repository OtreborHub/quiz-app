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
        case Level.DIFFICULT: return Level.DIFFICULT;
        default: return Level.EASY;
    }
}

function changeLevel(level: string, baseLevel: string){
    var returnLevel = Level.NONE;

    switch(baseLevel) {

        case Level.EASY:
            returnLevel = Level.EASY;
            break;

        case Level.INTERMEDIATE:
            switch(level) {
                case Level.EASY:
                    returnLevel = Level.INTERMEDIATE;
                    break;
                case Level.INTERMEDIATE: 
                    returnLevel = Level.EASY;
                    break;
            }
        break;

        case Level.DIFFICULT:
            switch(level) {
                case Level.EASY:
                    returnLevel = Level.INTERMEDIATE;
                    break;
                case Level.INTERMEDIATE:
                    returnLevel = Level.DIFFICULT;
                    break;
                case Level.DIFFICULT:
                    returnLevel = Level.EASY;
                    break;
            }
    }

    return returnLevel;
  };


export { getNextLevel, changeLevel, Level };