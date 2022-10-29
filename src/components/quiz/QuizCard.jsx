import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import shareIcon from "../../assets/img/shareIcon.png";

export default function QuizCard({ quiz }) {
    const { id, subject } = quiz || {};

    const {
        user: { participate },
    } = useSelector((state) => state.auth);

    // check user participates or not
    const checkParticipate = () => {
        let isId = false;
        participate.forEach((element) => {
            if (element.quizId == id) {
                isId = true;
            }
        });
        return isId;
    };

    return (
        <div className=" relative h-60 border border-[#525252] rounded-lg">
            <div className="bg-purple-500 h-36 flex items-center justify-center mb-2 rounded-t-lg">
                <h1 className="text-3xl font-semibold text-white">Quiz</h1>
            </div>
            <div className="flex justify-between px-2 items-center">
                <span className="text-white text-sm">Total Mark: 10</span>
                <a href="@">
                    <img src={shareIcon} alt="shareIcon" className="w-4 h-5" />
                </a>
            </div>
            <div className="px-2">
                <h2 className="text-white font-semibold">Subject: {subject}</h2>
            </div>
            {checkParticipate() ? (
                <Link to={`/quiz/result/${id}`}>
                    <button className="bg-green-500 rounded-b-lg py-1 text-white hover:bg-green-400 text-sm font-semibold absolute bottom-0 right-0 left-0">
                        Quiz Result
                    </button>
                </Link>
            ) : (
                <Link to={`/quiz/${id}`}>
                    <button className="bg-green-500 rounded-b-lg py-1 text-white hover:bg-green-400 text-sm font-semibold absolute bottom-0 right-0 left-0">
                        Participate Now
                    </button>
                </Link>
            )}
        </div>
    );
}
