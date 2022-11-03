import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { changeStatus } from "../../fetures/quiz/quizSlice";

const totalMarkGenerate = (singlemark, totalQuestion) => {
    return totalQuestion * singlemark;
};

export default function QuizCard({ quiz }) {
    let [isOpen, setIsOpen] = useState(false);

    const { id, subject, singleQuestionMark, questions, admin, activeStatus } =
        quiz || {};

    const {
        user: { participate, email },
    } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

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

    const quizPauseHandler = () => {
        dispatch(changeStatus({ id }));
    };

    return (
        <div className=" relative border border-[#525252] rounded-lg">
            <div className="bg-purple-500 h-36 flex items-center justify-center rounded-t-lg relative">
                <h1 className="text-3xl font-semibold text-white">Quiz</h1>
                <div className=" absolute bottom-0 left-0 bg-yellow-300 px-2 after:content[''] after:w-5 after:h-full after:bg-red-400 ">
                    <span className="text-xs text-gray-600">
                        @{admin?.split("@")[0]}
                    </span>
                </div>
            </div>
            <div className="pb-12 pt-4">
                <div className="flex justify-between px-2 items-center">
                    <div>
                        <div>
                            <span className="text-white text-xs">
                                Total Mark:
                                {totalMarkGenerate(
                                    singleQuestionMark,
                                    questions?.length
                                )}
                            </span>
                        </div>
                        <div>
                            <span className="text-white text-xs">
                                Subject: {subject}
                            </span>
                        </div>
                    </div>
                    <div className="relative grid justify-center items-center gap-2">
                        <div ref={quizControlMenu}>
                            <button
                                onClick={() => setIsOpen((isOpen) => !isOpen)}
                            >
                                <i
                                    className="fa fa-ellipsis-h text-white"
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
                        <div>
                            <div className="flex items-center justify-center w-full">
                                <label
                                    htmlFor={id}
                                    className="flex items-center cursor-pointer"
                                >
                                    <div className="relative">
                                        <input
                                            id={id}
                                            type="checkbox"
                                            className="sr-only"
                                            checked={
                                                activeStatus ? true : false
                                            }
                                            onChange={quizPauseHandler}
                                        />
                                        <div
                                            className={`w-5 h-2 rounded-full shadow-inner ${
                                                activeStatus
                                                    ? "bg-green-500"
                                                    : "bg-gray-400"
                                            }`}
                                        ></div>

                                        <div
                                            className={`dot absolute w-3 h-3 rounded-full shadow -left-1 -top-0.5 transition bg-white ${
                                                activeStatus &&
                                                " translate-x-full"
                                            }`}
                                        ></div>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {checkParticipate() ? (
                <Link to={`/quiz/result/${id}`}>
                    <button className="bg-green-500 rounded-b-lg py-1.5 md:py-1 lg:py-1 text-white md:hover:bg-green-400 lg:hover:bg-green-400 text-sm font-semibold absolute bottom-0 right-0 left-0">
                        Quiz Result
                    </button>
                </Link>
            ) : (
                <Link to={`/quiz/${id}`}>
                    <button className="bg-green-500 rounded-b-lg py-1.5 md:py-1 lg:py-1 text-white md:hover:bg-green-400 lg:hover:bg-green-400 text-sm font-semibold absolute bottom-0 right-0 left-0">
                        Participate Now
                    </button>
                </Link>
            )}
        </div>
    );
}
