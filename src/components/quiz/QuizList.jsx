import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuiz } from "../../fetures/quiz/quizSlice";
import AddQuizCard from "./AddQuizCard";
import Blank from "./Blank";
import QuizCard from "./QuizCard";
import Search from "./Search";

export default function QuizList({ modalOpen }) {
    const { allQuiz, loading, isError, error } =
        useSelector((state) => state.quiz) || {};
    const dispatch = useDispatch();

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
        <div className="px-5 md:px-0 lg:px-0">
            <Search />
            <div className="pt-5 mb-4">
                <h2 className="font-semibold text-gray-400">
                    Your created quizzes
                </h2>
                <div className="grid grid-cols-1 gap-10 md:grid-cols-3 lg:grid-cols-4 md:gap-10 lg:gap-16 pt-5">
                    {content}
                    <AddQuizCard modalOpen={modalOpen} />
                </div>
            </div>

            <div className="pt-5">
                <h2 className="font-semibold text-gray-400">
                    All participated quizzes
                </h2>
                <div className="grid grid-cols-1 gap-10 md:grid-cols-3 lg:grid-cols-4 md:gap-10 lg:gap-16 pt-5">
                    {content}
                </div>
            </div>
        </div>
    );
}
