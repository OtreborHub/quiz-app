import { Box, Grid, Typography } from '@mui/material';
import { onValue, ref } from "firebase/database";
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import '../styles/quiz.css';
import { db } from '../utils/firebase';
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
    const [currentAnswer, setCurrentAnswer] = useState<string>();
    const [score, setScore] = useState<number>(0);

    const isMobile = useMediaQuery({ query: '(max-width: 900px)' });
    const navigate = useNavigate();

    useEffect(() => {
        const query = ref(db, "quiz");
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
        if(answer === currentAnswer){
            var newScore = score + 1;
            setScore(newScore);
        }
        setCurrentIndex(currentIndex + 1);
    }

    function assignQuestion(data: QuizQuestion){
        if(data && data !== undefined){
            // setCurrentIndex(data.id);
            setCurrentQuestion(data.quest);
            setCurrentAnswers(data.options);
            setCurrentAnswer(data.answer);
        } else {
            if(currentIndex !== 0){
                console.log("Quiz finished - score: " + score + "/10");
                navigate('/result/' + score);
            }
        }
    }

    return (
    <>

        { isMobile ?
        <>
            <div className="image-container">
                <Box className='question-container-mobile'>
                    <Question 
                        index={currentIndex}
                        quest={currentQuestion} 
                        answers={currentAnswers} 
                        ansQuestion={handleAnsQuestion} />
                </Box>
            </div>
        </>
        : 
        <Grid container>
            <Grid item xs={6}>
                <div className='image-container'></div>
            </Grid>
            <Grid item xs={6}>
                <div className="question-container">
                        <Question
                        index={currentIndex}
                        quest={currentQuestion} 
                        answers={currentAnswers} 
                        ansQuestion={handleAnsQuestion} /> 
                </div>
            </Grid>
        </Grid>
        }
    </>
    )
}