import { Box, Grid, Typography } from '@mui/material';
import { onValue, ref } from "firebase/database";
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/quiz.css';
import { db } from '../utils/firebase';
import { calculateScore } from '../utils/score';
import Question from './Question';


interface QuizQuestion {
    id: number,
    answer: string,
    options: string[],
    quest: string,
}

export default function Quiz(){
    const [quizData, setQuizData] = useState<QuizQuestion[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [currentQuestion, setCurrentQuestion] = useState<string>("");
    const [currentAnswers, setCurrentAnswers] = useState<string[]>([]);
    const [correctAnswer, setCorrectAnswer] = useState<string>();
    const [scoreArray, setScoreArray] = useState<boolean[]>([]);

    const isMobile = useMediaQuery({ query: '(max-width: 900px)' });
    const navigate = useNavigate();
    const location = useLocation();
    const level = location.state.level

    useEffect(() => {
        const query = ref(db, "quiz/"+level);
        return onValue(query, (snapshot) => {
          const quizData: QuizQuestion[] = snapshot.val();
          setQuizData(quizData);
          assignQuestion(quizData[currentIndex]);
        });
      },[]);

    useEffect(() => {
        assignQuestion(quizData[currentIndex]);
    }, [currentIndex]);

    function handleAnsQuestion(answer: string) {
        if(answer === correctAnswer){
            var newScoreArray = scoreArray;
            newScoreArray[currentIndex] = true;
            setScoreArray(newScoreArray);
        }
        setCurrentIndex(currentIndex + 1);
    }

    function previousQuest(){
        setCurrentIndex(currentIndex - 1);
    }

    function assignQuestion(data: QuizQuestion){
        if(data && data !== undefined){
            setCurrentIndex(data.id);
            setCurrentQuestion(data.quest);
            setCurrentAnswers(data.options);
            setCorrectAnswer(data.answer);
        } else {
            if(currentIndex !== 0){
                const score: number = calculateScore(scoreArray);
                console.log("Quiz finished - score: " + score + "/10");
                navigate('/result/' + score, { state: {level: level}});
            }
        }
    }

    return (
    <>

        { isMobile ?
        <>
            <div className="image-container">
                <Box className='question-container-mobile'>
                    <Box>
                        <Typography
                            variant="h2" 
                            fontWeight="bold"
                            alignSelf={"center"}
                            marginTop={"2rem"}
                            color={"whitesmoke"}
                            // className='animated-text'
                            > Climate <span className='accent'>Quiz</span>
                        </Typography>
                        <Typography
                            paragraph
                            fontWeight="bold"
                            alignSelf={"left"}
                            marginBottom={"1rem"}
                            // marginLeft={"1.5rem"}
                            color={"whitesmoke"}
                            // className='animated-text'
                            > <span className='accent'>{level.toUpperCase()}</span>
                        </Typography>
                    </Box>
                    <Question 
                        index={currentIndex}
                        quest={currentQuestion} 
                        answers={currentAnswers} 
                        ansQuestion={handleAnsQuestion} 
                        prevQuestion={previousQuest} /> 
                </Box>
            </div>
        </>
        : 
        <Grid container marginBottom={"0rem"}>
            <Grid item xs={6}>
                <div className='image-container'></div>
            </Grid>
            <Grid item xs={6}>
                <div className="question-container">
                    <Typography
                        variant="h2" 
                        fontWeight="bold"
                        alignSelf={"center"}
                        marginTop={"2rem"}
                        color={"whitesmoke"}
                        // className='animated-text'
                        > Climate <span className='accent'>Quiz</span>
                    </Typography>
                    <Typography
                        paragraph
                        fontWeight="bold"
                        alignSelf={"left"}
                        marginBottom={"1rem"}
                        color={"whitesmoke"}
                        // className='animated-text'
                        > Difficoltà: <span className='accent'>{level.toUpperCase()}</span>
                    </Typography>
                    <Question
                        index={currentIndex}
                        quest={currentQuestion} 
                        answers={currentAnswers} 
                        ansQuestion={handleAnsQuestion}
                        prevQuestion={previousQuest} /> 
                </div>
            </Grid>
        </Grid>
        }
    </>
    )
}