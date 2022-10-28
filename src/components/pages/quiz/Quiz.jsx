import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../../config/supabaseClient";
import { addParticipate } from "../../../fetures/auth/authSlice";
import { fetchSingleQuiz } from "../../../fetures/quiz/quizSlice";
import { resetAns } from "../../../fetures/quizAnswer/quizAnsSlice";
import Layout from "../../common/Layout";
import SingleAnswer from "../../ui/SingleAnswer";

const totalMarkGenerate = (singlemark, totalQuestion) => {
    return totalQuestion * singlemark;
};

const countCurrentQuestion = (currentQuestionIndex, totalQuestion) => {
    return `${currentQuestionIndex + 1} of ${totalQuestion}`;
};

// const participate = [
//     {
//         quizId: 1,
//         selectedAns: { 0: ["Javascript"] },
//         result: 5,
//         quizMark: 10,
//     },
// ];

export default function Quiz() {
    const [questionIndex, setQuestionIndex] = useState(0);
    const [submitLoading, setSubmitLoading] = useState(false);

    const { loading, isError, error, singleQuiz } =
        useSelector((state) => state.quiz) || {};
    const { selectedAnswers } = useSelector((state) => state.quizAnswer);
    const { user: currentUser } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        // get a single quiz by quiz id
        dispatch(fetchSingleQuiz(id));
    }, [dispatch, id]);

    const next = () => {
        setQuestionIndex((prev) => prev + 1);
    };

    const previous = () => {
        setQuestionIndex((prev) => prev - 1);
    };

    console.log(selectedAnswers);

    // quiz submit handler
    const quizSubmitHandler = async () => {
        setSubmitLoading(true);
        const { questions, singleQuestionMark } = singleQuiz[0] || {};
        const totalMark = totalMarkGenerate(
            singleQuestionMark,
            questions?.length
        );

        const result = questions.reduce(
            (accumulator, currentValue, currentIndex) => {
                // create an array to right answer
                const quizAns = [];
                quizAns.push(currentValue?.answer);

                // selected ans for this quiz
                const selectedAns = selectedAnswers?.[currentIndex];

                // check correct
                if (JSON.stringify(quizAns) === JSON.stringify(selectedAns)) {
                    // eslint-disable-next-line no-unused-expressions
                    return accumulator + singleQuestionMark;
                } else {
                    // eslint-disable-next-line no-unused-expressions
                    return accumulator + 0;
                }
            },
            0
        );

        try {
            const newParticipate = {
                quizId: id,
                selectedAns: selectedAnswers,
                result,
                quizMark: totalMark,
            };

            // update current user participate data
            await supabase.auth.updateUser({
                data: {
                    participate: [...currentUser?.participate, newParticipate],
                },
            });

            dispatch(addParticipate(newParticipate));
            dispatch(resetAns());
            navigate(`/quiz/result/${id}`);
            setSubmitLoading(false);
        } catch (err) {
            setSubmitLoading(false);
            alert(err);
        }
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
                        <button
                            onClick={quizSubmitHandler}
                            disabled={submitLoading}
                            className={` text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-green-400 ${
                                submitLoading
                                    ? "cursor-wait bg-green-400"
                                    : "bg-green-500"
                            }`}
                        >
                            Submit
                        </button>
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
