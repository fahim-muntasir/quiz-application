import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchSingleQuiz } from "../../../fetures/quiz/quizSlice";
import Layout from "../../common/Layout";
import SingleAnswer from "../../ui/SingleAnswer";

const totalMarkGenerate = (singlemark, totalQuestion) => {
    return totalQuestion * singlemark;
};

const countCurrentQuestion = (currentQuestionIndex, totalQuestion) => {
    return `${currentQuestionIndex + 1} of ${totalQuestion}`;
};

export default function Quiz() {
    const [questionIndex, setQuestionIndex] = useState(0);
    const { loading, isError, error, singleQuiz } =
        useSelector((state) => state.quiz) || {};
    const dispatch = useDispatch();

    const { id } = useParams();

    useEffect(() => {
        dispatch(fetchSingleQuiz(id));
    }, [dispatch, id]);

    const next = () => {
        setQuestionIndex((prev) => prev + 1);
    };

    const previous = () => {
        setQuestionIndex((prev) => prev - 1);
    };

    let content = null;
    if (!isError && loading) {
        content = <div className="text-white">Loading...</div>;
    }
    if (!loading && isError) {
        content = <div className="text-red-500">{error}</div>;
    }
    if (!loading && !isError && singleQuiz?.length > 0) {
        console.log(singleQuiz);
        const { subject, singleQuestionMark, questions } = singleQuiz[0] || {};
        const currentQuestion = questions?.[questionIndex];

        content = (
            <>
                <div className="text-[#696969] mb-5 mt-5">
                    <h2 className=" font-semibold ">Subject: {subject}</h2>
                    <span className="text-sm">
                        Total Mark:
                        {totalMarkGenerate(
                            singleQuestionMark,
                            questions?.length
                        )}
                    </span>
                    <br />
                    <span className="text-sm">
                        Single question mark: {singleQuestionMark}
                    </span>
                </div>
                <div className="text-white flex justify-between items-center border-b border-[#525252] pb-2">
                    <h1 className="text-2xl">
                        Question: {currentQuestion?.question}
                    </h1>
                    <span className="text-xs">
                        {countCurrentQuestion(questionIndex, questions?.length)}
                    </span>
                </div>
                <div className="grid md:grid-cols-2 lg:md:grid-cols-2 gap-5 mt-10">
                    <SingleAnswer
                        text={currentQuestion?.option1}
                        questionIndex={questionIndex}
                    />
                    <SingleAnswer
                        text={currentQuestion?.option2}
                        questionIndex={questionIndex}
                    />
                    <SingleAnswer
                        text={currentQuestion?.option3}
                        questionIndex={questionIndex}
                    />
                    <SingleAnswer
                        text={currentQuestion?.option4}
                        questionIndex={questionIndex}
                    />
                </div>
                <div className="flex justify-between mt-10">
                    {questionIndex > 0 ? (
                        <button
                            onClick={previous}
                            className="bg-green-500 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-green-400"
                        >
                            Previous
                        </button>
                    ) : (
                        <button
                            disabled
                            className="bg-green-300 text-white px-5 py-2 rounded-lg text-sm font-semibold cursor-not-allowed"
                        >
                            Previous
                        </button>
                    )}
                    {questionIndex < questions?.length - 1 && (
                        <button
                            onClick={next}
                            className="bg-green-500 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-green-400"
                        >
                            Next
                        </button>
                    )}
                    {questionIndex === questions?.length - 1 && (
                        <Link to={`/quiz/result/${id}`}>
                            <button
                                onClick={next}
                                className="bg-green-500 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-green-400"
                            >
                                Submit
                            </button>
                        </Link>
                    )}
                </div>
            </>
        );
    }

    if (!loading && !isError && singleQuiz?.length === 0) {
        content = (
            <div className="text-center text-white">
                Not found quiz through your ID.
            </div>
        );
    }

    return (
        <Layout>
            <section>
                <div className="container mx-auto px-5 md:px-0 lg:px-0">
                    {content}
                </div>
            </section>
        </Layout>
    );
}
