import { ResultTitle } from "./score";

//Interfaccia per il recupero dati da DB
interface QuizData {
    id: number,
    answer: string,
    options: string[],
    quest: string,
}

//Interfaccia per props del componente Question
interface QuestionProps {
    index: number | undefined;
    quest: string | undefined;
    answers: string[] | undefined;
    ansQuestion: (answer: string) => void;
    prevQuestion: () => void;
}

//Interfaccia per la pagina dei risultati
interface ResultValue {
    score: number,
    title: ResultTitle,
    passed: boolean,
    phrase: string
}

export type { QuizData, QuestionProps, ResultValue }