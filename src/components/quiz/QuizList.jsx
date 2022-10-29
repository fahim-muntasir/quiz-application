import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuiz } from "../../fetures/quiz/quizSlice";
import AddQuizCard from "./AddQuizCard";
import Blank from "./Blank";
import QuizCard from "./QuizCard";

export default function QuizList({ modalOpen }) {
    const { allQuiz, loading, isError, error } =
        useSelector((state) => state.quiz) || {};
    const dispatch = useDispatch();

    console.log(allQuiz);

    useEffect(() => {
        dispatch(fetchQuiz());
    }, [dispatch]);

    let content = null;

    if (!isError && loading) {
        content = (
            <>
                <Blank />
                <Blank />
                <Blank />
                <Blank />
                <Blank />
                <Blank />
                <Blank />
            </>
        );
    }

    if (isError && !loading) {
        content = <div>{error}</div>;
    }

    if (!isError && !loading && allQuiz?.length > 0) {
        content = allQuiz.map((quiz) => (
            <QuizCard key={quiz?.id} quiz={quiz} />
        ));
    }

    return (
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 lg:grid-cols-4 md:gap-10 lg:gap-16 pt-10 px-10">
            {content}
            <AddQuizCard modalOpen={modalOpen} />
        </div>
    );
}
