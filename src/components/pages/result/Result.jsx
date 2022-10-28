import React, { useEffect } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleQuiz } from "../../../fetures/quiz/quizSlice";
import Layout from "../../common/Layout";
import SingleAnswer from "../../ui/SingleAnswer";

const totalMarkGenerate = (singlemark, totalQuestion) => {
    return totalQuestion * singlemark;
};

export default function Result() {
    const { singleQuiz, loading, isError, error } =
        useSelector((state) => state.quiz) || {};
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(fetchSingleQuiz(id));
    }, [dispatch, id]);

    let content = null;
    if (!isError && loading) {
        content = <div className="text-white">please wait...</div>;
    }
    if (isError && !loading) {
        content = <div className="text-white">{error}</div>;
    }
    if (!isError && !loading && singleQuiz?.length === 1) {
        const { questions, singleQuestionMark, subject } = singleQuiz[0] || {};
        console.log(singleQuiz);
        const percentage = 90;

        content = (
            <div className="container mx-auto px-5 md:px-0 lg:px-0">
                <div className=" mb-5 mt-5 flex justify-between items-center">
                    <div className="text-[#696969] py-5 mb-10">
                        <h2 className="font-semibold text-white text-2xl mb-2 ">
                            Your Result🏆
                        </h2>
                        <h2 className="font-semibold ">Your Total: 10</h2>
                        <span className="text-sm">
                            Total Mark:
                            {totalMarkGenerate(
                                singleQuestionMark,
                                questions?.length
                            )}
                        </span>
                        <br />
                        <span className="text-sm">Subject: {subject}</span>
                    </div>
                    <div className="w-28">
                        <CircularProgressbar
                            value={percentage}
                            text={`${percentage}%`}
                            styles={buildStyles({
                                rotation: 0.25,
                                strokeLinecap: "butt",
                                textSize: "16px",
                                pathTransitionDuration: 0.5,
                                pathColor: `#22c55e`,
                                textColor: "white",
                                trailColor: "#ef4444",
                            })}
                        />
                    </div>
                </div>

                {questions.map((q) => (
                    <div key={q?.question} className="text-white mb-10">
                        <h1 className="text-2xl border-b border-[#525252] pb-2">
                            Question: {q?.question}
                        </h1>
                        <div className="grid md:grid-cols-2 lg:md:grid-cols-2 gap-5 mt-10">
                            <SingleAnswer text={q?.option1} ans={q?.answer} />
                            <SingleAnswer text={q?.option2} ans={q?.answer} />
                            <SingleAnswer text={q?.option3} ans={q?.answer} />
                            <SingleAnswer text={q?.option4} ans={q?.answer} />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <Layout>
            <section>{content}</section>
        </Layout>
    );
}
