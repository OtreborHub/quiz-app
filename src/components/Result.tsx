import DoneIcon from '@mui/icons-material/Done';
import { Box, Button, Typography } from '@mui/material';
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../styles/result.css";
import { ResultTitle, classSubstring, parseScore } from "../utils/score";

interface ResultValue {
    score: number,
    title: ResultTitle,
    phrase: string
}

export default function Result() {

    const [result, setResult] = useState<ResultValue>({score: -1, title: ResultTitle.NONE, phrase: ""});
    const [copied, setCopied] = useState<boolean>(false);
    const params = useParams();

    async function copyToClipboard(result: ResultValue) {
        const textToClipboard = 
        "Ciao! Ti invito a fare questo test sull'ambiente.\n" +
        "Io ho ricevuto il titolo di " + result.title + " con un punteggio dell' " + result.score + "0%\n" +
        "Prova a fare meglio: https://climate-quiz.web.app/"
        try {
            await navigator.clipboard.writeText(textToClipboard);
            setCopied(true);
            setInterval(() => {
                setCopied(false);
            }, 10000)
        } catch (e) {
            console.log("Impossible to copy to the clipboard, insufficent browser permission");
        }
    }

    useEffect(() => {
        //Fare chiamata a DB per frasi risultato
        const score = Number(params.score);
        const result:ResultValue = {score: score, title: parseScore(score), phrase: "Frase relativa al punteggio"}
        setResult(result);
    }, []);


    return (
        <>
        <div className="result-image-container" data-image-type={classSubstring(result.title)}>
            <div className="text-container">
                <Box 
                className="animated-text" 
                marginTop={"15%"} 
                border={"2px solid white"} 
                borderRadius="2px" 
                padding={"3rem"}>
                    <Typography>
                        Sei un <span className="accent">{result.title}</span>! <br/>
                        Hai risposto correttamente al <span className="accent">{result.score}0%</span> delle domande <br/>
                        {result.phrase} <br/>
                    </Typography>
                    <Typography marginTop={"1rem"}>
                        Tip: Frase suggerimento random da DB
                    </Typography>
                    <hr/>
                    <Box display={"flex"} justifyContent={"space-between"}>
                    <Link to="/quiz">
                        <Button
                        color="success"
                        sx={{width:"fit-content"}}
                        >
                            Ricomincia il test
                        </Button>
                    </Link>
                    { !copied &&
                    <Button
                        variant="outlined"
                        color="success"
                        sx={{width:"fit-content", textAlign:"center"}}
                        onClick={() => copyToClipboard(result)}
                        > Condividi
                    </Button> }

                    {copied && 
                    <Button
                        color="success"
                        disabled
                        sx={{width:"fit-content", textAlign:"center"}}
                        onClick={() => copyToClipboard(result)}
                        > <DoneIcon color="success" fontSize='small'/>Copiato
                    </Button>
                    }
                    </Box>
                </Box>
            </div>
        </div>
        </>
    );
}