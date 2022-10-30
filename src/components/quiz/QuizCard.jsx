import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const totalMarkGenerate = (singlemark, totalQuestion) => {
    return totalQuestion * singlemark;
};

export default function QuizCard({ quiz }) {
    let [isOpen, setIsOpen] = useState(false);

    const { id, subject, singleQuestionMark, questions, admin } = quiz || {};

    const {
        user: { participate, email },
    } = useSelector((state) => state.auth);

    // check user participates or not
    const checkParticipate = () => {
        let isId = false;
        participate?.forEach((element) => {
            if (element.quizId == id) {
                isId = true;
            }
        });
        return isId;
    };

    const quizControlMenu = useRef();

    useEffect(() => {
        const handler = (event) => {
            if (!quizControlMenu.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => {
            document.addEventListener("mousedown", handler);
        };
    }, []);

    return (
        <div className=" relative h-60 border border-[#525252] rounded-lg">
            <div className="bg-purple-500 h-36 flex items-center justify-center mb-2 rounded-t-lg relative">
                <h1 className="text-3xl font-semibold text-white">Quiz</h1>
                <div className=" absolute bottom-0 left-0 bg-yellow-300 px-2 after:content[''] after:w-5 after:h-full after:bg-red-400 ">
                    <span className="text-xs text-gray-600">
                        @{admin?.split("@")[0]}
                    </span>
                </div>
            </div>
            <div className="flex justify-between px-2 items-center">
                <span className="text-white text-sm">
                    Total Mark:
                    {totalMarkGenerate(singleQuestionMark, questions?.length)}
                </span>
                <div className="relative" ref={quizControlMenu}>
                    <button onClick={() => setIsOpen((isOpen) => !isOpen)}>
                        <i
                            className="fa fa-ellipsis-h text-white "
                            aria-hidden="true"
                        ></i>
                    </button>
                    {isOpen && (
                        <div className="absolute bg-[#343434] top-1 -left-20 z-10 shadow-sm">
                            <ul>
                                <li className="flex items-center py-1 px-3 gap-1 cursor-pointer hover:bg-[#525252] text-white text-xs">
                                    <i
                                        className="fa fa-share"
                                        aria-hidden="true"
                                    ></i>
                                    Share
                                </li>
                                {email === admin && (
                                    <li className="flex items-center py-1 px-3 gap-1 cursor-pointer hover:bg-[#525252] text-white text-xs">
                                        <i
                                            className="fa fa-minus-circle"
                                            aria-hidden="true"
                                        ></i>
                                        Delete
                                    </li>
                                )}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
            <div className="px-2">
                <span className="text-white text-sm">Subject: {subject}</span>
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
