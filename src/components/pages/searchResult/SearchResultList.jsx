import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchQuizBySearchQuery } from "../../../fetures/filter/filterSlice";
import {
    fetchCreatedQuizzes,
    fetchQuiz,
} from "../../../fetures/quiz/quizSlice";
import Blank from "../../quiz/Blank";
import QuizCard from "../../quiz/QuizCard";
import Search from "../../quiz/Search";

export default function SearchResultList() {
    const {
        searchResult: result,
        loading,
        isError,
        error,
    } = useSelector((state) => state.filter) || {};
    const { user } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const location = useLocation();
    const params = new URLSearchParams(location.search);

    // user want to search by it
    const searchT = params.get("t");
    const searchStatus = params.get("s");
    const query = params.get("q");

    useEffect(() => {
        dispatch(fetchQuiz(user?.id));
        dispatch(fetchCreatedQuizzes(user?.email));
        dispatch(
            fetchQuizBySearchQuery({
                userWantToSearch: searchT,
                query,
                quizStatusForSearch: searchStatus,
            })
        );
    }, [dispatch, user, searchStatus, searchT, query]);

    let searchResult = null;

    if (!isError && loading) {
        searchResult = (
            <div className="pt-5">
                <h2 className="font-semibold text-gray-400">Search results</h2>
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
        searchResult = (
            <div className="pt-5">
                <h2 className="font-semibold text-gray-400">Search results</h2>
                {error}
            </div>
        );
    }

    if (!isError && !loading && result?.length > 0) {
        searchResult = (
            <div className="pt-5">
                <h2 className="font-semibold text-gray-400">Search results</h2>
                <div className="grid grid-cols-1 gap-10 md:grid-cols-3 lg:grid-cols-4 md:gap-10 lg:gap-16 pt-5">
                    {result.map((quiz) => (
                        <QuizCard key={quiz?.id} quiz={quiz} />
                    ))}
                </div>
            </div>
        );
    }

    if (!isError && !loading && result?.length === 0) {
        searchResult = (
            <div className="pt-5">
                <h2 className="font-semibold text-gray-400">Search results</h2>
                <div className="text-center py-10">
                    <span className="text-gray-200">Result not found :)</span>
                </div>
            </div>
        );
    }

    return (
        <div className="px-5 md:px-0 lg:px-0">
            <Search />
            {searchResult}
        </div>
    );
}
