import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAns } from "../../fetures/quizAnswer/quizAnsSlice";

// {
//     "2": {"1": "React js", "2": "Vue js"}
// }

export default function SingleAnswer({ text, questionIndex, ans }) {
    const { selectedAnswers } = useSelector((state) => state.quizAnswer);
    const dispatch = useDispatch();

    const selectAnsHandler = () => {
        dispatch(selectAns({ currentQuestion: questionIndex, text }));
    };

    let content = null;

    if (text === ans) {
        content = (
            <button
                disabled={ans ? true : false}
                onClick={selectAnsHandler}
                className={`text-white bg-green-500 border border-green-500 rounded-lg py-3 px-4 flex items-center gap-2 hover:bg-green-400 ${
                    ans && "cursor-not-allowed"
                }`}
            >
                <i className="fa fa-check" aria-hidden="true"></i>
                {text}
            </button>
        );
    } else {
        content = (
            <button
                disabled={ans ? true : false}
                onClick={selectAnsHandler}
                className={`text-white border border-[#525252] rounded-lg py-3 px-4 flex items-center gap-2 hover:bg-[#343434] ${
                    ans && "cursor-not-allowed"
                }`}
            >
                <i className="fa fa-circle text-xs" aria-hidden="true"></i>
                {text}
            </button>
        );
    }

    return content;
}
