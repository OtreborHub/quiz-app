import DoneIcon from '@mui/icons-material/Done';
import { Box, Button, Typography } from '@mui/material';
import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useMediaQuery } from 'react-responsive';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ApprendistaPNG from "../assets/img/characters/Apprendista.png";
import EsploratorePNG from "../assets/img/characters/Esploratore.png";
import InnovatorePNG from "../assets/img/characters/Innovatore.png";
import MaestroPNG from "../assets/img/characters/Maestro.png";
import "../styles/result.css";
import { db } from '../utils/firebase';
import { Level, getNextLevel } from '../utils/level';
import { ResultTitle, parseScore } from "../utils/score";

interface ResultValue {
    score: number,
    title: ResultTitle,
    phrase: string
}

export default function Result() {

    const [result, setResult] = useState<ResultValue>({score: -1, title: ResultTitle.NONE, phrase: ""});
    const [copied, setCopied] = useState<boolean>(false);
    const [tipPhrase, setTipPhrase] = useState<string>();
    const params = useParams();

    const isMobile = useMediaQuery({ query: '(max-width: 900px)' });

    const navigate = useNavigate();
    const location = useLocation();
    const level = location.state.level;

    useEffect(() => {
        const score = Number(params.score);
        const title = parseScore(score);
        var resultPhrase: string = "";

        const queryResult = ref(db, "result/"+title.toLocaleLowerCase());
        onValue(queryResult, (snapshot) => {
          resultPhrase = snapshot.val();
          const result:ResultValue = {score: score, title: title, phrase: resultPhrase}
          setResult(result);
        });

        var tipIndex: number;
        if(bestResult(title)){
            tipIndex = 0;
        } else {
            tipIndex = Math.floor(Math.random() * 5) + 1;
        }

        const queryTip = ref(db, "tips/tip"+tipIndex);
        onValue(queryTip, (snapshot) => {
          var tipPhrase: string = snapshot.val();
          setTipPhrase(tipPhrase);
        });

    }, []);

    function handleNavigation(event: any) {
        if(event.target.id === 'retryTestButton'){
            navigate("/quiz", { state : {level: level}})
        } else if (event.target.id === 'nextLevelButton') {
            const nextLevel = getNextLevel(level);
            navigate("/quiz", { state : {level: nextLevel}});
        } else if (event.target.id === 'homeButton') {
            navigate("/");
        }
    }

    function bestResult(title: string): boolean {
        return level === Level.DIFFICULT && title === ResultTitle.MAESTRO;
    }

    function worstScore(): boolean {
        return result.score === 0 
    }

    async function copyToClipboard(result: ResultValue) {
        var clipboardScore: string | number = "";
        if(!worstScore()){
            clipboardScore = result.score;
        }

        const textToClipboard = "Ciao! Ti invito a fare questo test sull'ambiente.\n" +
        "Io ho ricevuto il titolo di " + result.title + " con un punteggio del " + clipboardScore + "0%\n" +
        "Vediamo se riesci a fare meglio: https://climate-quiz.web.app/"
        
        try {
            await navigator.clipboard.writeText(textToClipboard);
            setCopied(true);
            // https://mui.com/material-ui/react-alert/
            setInterval(() => {
                setCopied(false);
            }, 10000)
        } catch (e) {
            console.log("Impossible to copy to the clipboard, insufficent browser permission");
        }
    }

    return (
        <>
        <Box className="result-container" display={"flex"} flexDirection={"column"} justifyContent={"space-between"} alignItems={"center"}>
                <Box 
                zIndex={"1"}
                key={"text"}
                sx={{backgroundColor: "#0000009e", color: "whitesmoke"}}
                className="animated-text" 
                marginTop={"2.5rem"} 
                border={"2px solid white"} 
                borderRadius="2px"
                width={isMobile ? "100" : "50%"} 
                padding={"2.5rem"}>
                    <Typography>
                        Sei un <span className="accent">{result.title}</span>! <br/>
                        Hai risposto correttamente al <span className="accent">{!worstScore() && result.score}0%</span> delle domande!
                    </Typography>
                    <Typography marginTop={"1rem"}>
                        {result.phrase} 
                    </Typography>
                    <Typography marginTop={"1rem"}>
                        {bestResult(result.title) ? "" : <span className='accent'>Tip: </span>}
                        {tipPhrase}
                    </Typography>
                    <hr/>
                    <Box display={"flex"} justifyContent={"space-evenly"} marginTop={"1rem"} marginBottom={"1rem"}>
                        <Button
                        id="retryTestButton"
                        variant={isMobile ? "text": "contained"}
                        onClick={(event) => handleNavigation(event)}
                        color="success"
                        sx={{width:"fit-content", fontWeight:"bold"}}>
                            {isMobile ? "Riprova" : "Ricomincia il test"}
                        </Button>
                        
                        { level !== Level.DIFFICULT &&
                            <Button
                            id="nextLevelButton"
                            variant={isMobile ? "text": "contained"}
                            onClick={(event) => handleNavigation(event)}
                            color="success"
                            sx={{width:"fit-content", fontWeight:"bold"}}>
                                Livello successivo
                            </Button>
                        }

                        { !copied &&
                        <Button
                            variant="outlined"
                            color="success"
                            sx={{width:"fit-content", textAlign:"center", fontWeight:"bold"}}
                            onClick={() => copyToClipboard(result)}
                            > Condividi
                        </Button> }

                        {copied && 
                        <Button
                            variant="text"
                            color="success"
                            sx={{width:"fit-content", textAlign:"center", fontWeight:"bold", pointerEvents:"none", cursor:"pointer" }}
                            > 
                            <DoneIcon color="success" fontSize='small'/>Copiato
                        </Button>
                        }
                    </Box>
                    <hr/>
                    <Box marginTop={"0.5rem"} textAlign={"center"}>
                        <Button
                            id="homeButton"
                            onClick={(event) => handleNavigation(event)}
                            sx={{color: "white"}}
                            variant='text'
                        > TORNA ALLA HOME</Button>
                    </Box>
                </Box>
                
                <Box textAlign={"center"} position={"fixed"} bottom={0} width={"100%"}>
                    <img 
                    key={"image"}
                    className="animated-text" 
                    width={isMobile ? "100%" : "50%"}
                    alt={result.title}
                    src={
                        result.title === ResultTitle.APPRENDISTA ? ApprendistaPNG : 
                        result.title === ResultTitle.ESPLORATORE ? EsploratorePNG :
                        result.title === ResultTitle.INNOVATORE ? InnovatorePNG :
                        result.title === ResultTitle.MAESTRO ? MaestroPNG : ""
                        } />
                </Box> 
        </Box>
        </>
    );
}