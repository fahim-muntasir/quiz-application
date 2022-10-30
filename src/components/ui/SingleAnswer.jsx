import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAns } from "../../fetures/quizAnswer/quizAnsSlice";

export default function SingleAnswer({
    text,
    questionIndex,
    ans,
    currect,
    wrong,
    disabled,
}) {
    const { selectedAnswers } = useSelector((state) => state.quizAnswer);
    const dispatch = useDispatch();

    const selectAnsHandler = () => {
        dispatch(selectAns({ currentQuestion: questionIndex, text }));
    };

    let content = null;

    if (selectedAnswers[questionIndex]?.includes(text)) {
        content = (
            <button
                onClick={selectAnsHandler}
                className={`text-white bg-green-500 border border-green-500 rounded-lg py-3 px-4 flex items-center gap-2 hover:bg-green-400 text-sm`}
            >
                <i className="fa fa-check" aria-hidden="true"></i>
                <span className="text-left">{text}</span>
            </button>
        );
    }

    if (!selectedAnswers[questionIndex]?.includes(text)) {
        content = (
            <button
                disabled={disabled}
                onClick={selectAnsHandler}
                className={`text-white border border-[#525252] rounded-lg py-3 px-4 flex items-center gap-2 hover:bg-[#343434] text-sm ${
                    disabled && "cursor-not-allowed"
                }`}
            >
                <i
                    className="fa fa-circle text-xs text-[#525252]"
                    aria-hidden="true"
                ></i>
                <span className="text-left">{text}</span>
            </button>
        );
    }

    if (currect || ans === text) {
        content = (
            <button
                disabled={disabled}
                className={`text-white bg-green-500 border border-green-500 rounded-lg py-3 px-4 flex items-center gap-2 cursor-not-allowed text-sm`}
            >
                <i className="fa fa-check" aria-hidden="true"></i>
                <span className="text-left">{text}</span>
            </button>
        );
    }

    if (wrong) {
        content = (
            <button
                disabled={disabled}
                className={`text-white border border-red-500 rounded-lg py-3 px-4 flex items-center gap-2 text-sm cursor-not-allowed`}
            >
                <i className="fa fa-times text-red-500" aria-hidden="true"></i>
                <span className="text-left">{text}</span>
            </button>
        );
    }

    return content;
}
