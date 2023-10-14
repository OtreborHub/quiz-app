
enum ResultTitle {
    APPRENDISTA = "Apprendista",
    ESPLORATORE = "Esploratore",
    INNOVATORE = "Innovatore",
    MAESTRO = "Maestro",
    NONE = ""
}

function parseScore(score: number){
    switch(score){
        case 0:
        case 1:
        case 2:
            return ResultTitle.APPRENDISTA;
        case 3:
        case 4:
        case 5:
            return ResultTitle.ESPLORATORE;
        case 6:
        case 7:
        case 8:
            return ResultTitle.INNOVATORE;
        case 9:
        case 10:
            return ResultTitle.MAESTRO;
        default:
            return ResultTitle.NONE;
    }
}

function classSubstring(title: ResultTitle){
    if(title !== ResultTitle.NONE){
        return title.substring(0,1);
    }
    return "";
}

export {parseScore, classSubstring, ResultTitle}