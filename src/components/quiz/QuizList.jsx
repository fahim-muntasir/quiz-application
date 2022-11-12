import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCreatedQuizzes, fetchQuiz } from "../../fetures/quiz/quizSlice";
import AddQuizCard from "./AddQuizCard";
import Blank from "./Blank";
import QuizCard from "./QuizCard";
import Search from "./Search";

export default function QuizList({ modalOpen }) {
    const { allQuiz, createdQuizzes, loading, isError, error } =
        useSelector((state) => state.quiz) || {};
    const { user } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchQuiz(user?.id));
        dispatch(fetchCreatedQuizzes(user?.email));
    }, [dispatch, user]);

    let participatedContend = null;
    let createdContend = null;

    if (!isError && loading) {
        participatedContend = (
            <div className="pt-5">
                <h2 className="font-semibold text-gray-400">
                    All participated quizzes
                </h2>
                <div className="grid grid-cols-1 gap-10 md:grid-cols-3 lg:grid-cols-4 md:gap-10 lg:gap-16 pt-5">
                    <Blank />
                    <Blank />
                    <Blank />
                    <Blank />
                </div>
            </div>
        );

        createdContend = (
            <div className="pt-5 mb-4">
                <h2 className="font-semibold text-gray-400">
                    Your created quiz
                </h2>
                <div className="grid grid-cols-1 gap-10 md:grid-cols-3 lg:grid-cols-4 md:gap-10 lg:gap-16 pt-5">
                    <Blank />
                    <Blank />
                    <Blank />
                    <Blank />
                </div>
            </div>
        );
    }

    if (isError && !loading) {
        participatedContend = (
            <div className="pt-5">
                <h2 className="font-semibold text-gray-400">
                    All participated quizzes
                </h2>
                {error}
            </div>
        );
    }

    if (!isError && !loading && allQuiz?.length > 0) {
        participatedContend = (
            <div className="pt-5">
                <h2 className="font-semibold text-gray-400">
                    All participated quizzes
                </h2>
                <div className="grid grid-cols-1 gap-10 md:grid-cols-3 lg:grid-cols-4 md:gap-10 lg:gap-16 pt-5">
                    {allQuiz.map(
                        (quiz) =>
                            quiz?.admin !== user?.email && (
                                <QuizCard key={quiz?.id} quiz={quiz} />
                            )
                    )}
                </div>
            </div>
        );
    }

    if (!isError && !loading && allQuiz?.length === 0) {
        participatedContend = (
            <div className="pt-5">
                <h2 className="font-semibold text-gray-400">
                    All participated quizzes
                </h2>
                <div className="text-center py-10">
                    <span className="text-gray-200">
                        You don't participate in any quizzes yet.
                    </span>
                </div>
            </div>
        );
    }

    // user created quizzes
    if (!isError && !loading && createdQuizzes?.length > 0) {
        createdContend = (
            <div className="pt-5 mb-4">
                <h2 className="font-semibold text-gray-400">
                    Your created quizzes
                </h2>
                <div className="grid grid-cols-1 gap-10 md:grid-cols-3 lg:grid-cols-4 md:gap-10 lg:gap-16 pt-5">
                    {createdQuizzes.map((quiz) => (
                        <QuizCard key={quiz?.id} quiz={quiz} />
                    ))}
                    <AddQuizCard modalOpen={modalOpen} />
                </div>
            </div>
        );
    }

    if (!isError && !loading && createdQuizzes?.length === 0) {
        createdContend = (
            <div className="pt-5 mb-4">
                <h2 className="font-semibold text-gray-400">
                    Your created quiz
                </h2>
                <div className="grid grid-cols-1 gap-10 md:grid-cols-3 lg:grid-cols-4 md:gap-10 lg:gap-16 pt-5">
                    <AddQuizCard modalOpen={modalOpen} />
                </div>
            </div>
        );
    }

    return (
        <div className="px-5 md:px-0 lg:px-0">
            <Search />
            {createdContend}
            {participatedContend}
        </div>
    );
}
