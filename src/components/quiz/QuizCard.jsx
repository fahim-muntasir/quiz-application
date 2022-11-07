import React, { useEffect, useRef, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { supabase } from "../../config/supabaseClient";
import { changeStatus, deleteQuiz } from "../../fetures/quiz/quizSlice";

const totalMarkGenerate = (singlemark, totalQuestion) => {
    return totalQuestion * singlemark;
};

export default function QuizCard({ quiz }) {
    let [isOpen, setIsOpen] = useState(false);
    let [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const URL = window.location.origin;

    const { id, subject, singleQuestionMark, questions, admin, activeStatus } =
        quiz || {};

    const {
        user: { participate, email },
    } = useSelector((state) => state.auth);
    const { deleting, deleteIsError, deleteError } = useSelector(
        (state) => state.quiz
    );

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

    // hide quiz action menu by outside crick
    useEffect(() => {
        const handler = (event) => {
            if (!quizControlMenu.current?.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => {
            document.addEventListener("mousedown", handler);
        };
    }, []);

    // check delete error;
    useEffect(() => {
        if (deleteIsError && deleteError) {
            alert(deleteError);
        }
    }, [deleteIsError, deleteError]);

    // quiz status change handler
    const quizPauseHandler = async () => {
        setLoading(true);
        try {
            // update this quiz active status
            const { data } = await supabase
                .from("quiz")
                .update({ activeStatus: !activeStatus })
                .match({ id })
                .select();

            if (data[0].id) {
                dispatch(changeStatus({ id }));
            }
            setLoading(false);
        } catch (err) {
            setLoading(false);
            alert(err);
        }
    };

    const modalOpenHide = () => {
        setIsModalOpen(!isModalOpen);
    };

    const copyController = () => {
        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 3000);
    };

    // quiz delete handler
    const quizDeleteHandler = () => {
        const checkSurety = window.confirm("Are you sure to delete this quiz?");
        if (checkSurety) {
            dispatch(deleteQuiz(id));
        }
    };

    return (
        <div className=" relative border border-[#525252] rounded-md">
            <div className="bg-purple-500 h-36 flex items-center justify-center rounded-t-md relative">
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
                    <div
                        className={`relative grid justify-center items-center gap-2`}
                    >
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
                                        <li
                                            onClick={modalOpenHide}
                                            className=" relative py-1 px-3 cursor-pointer hover:bg-[#525252] text-white text-xs"
                                        >
                                            <CopyToClipboard
                                                text={`${URL}/quiz/${id}`}
                                                onCopy={copyController}
                                            >
                                                <span className="flex items-center gap-1">
                                                    <i
                                                        className="fa fa-share"
                                                        aria-hidden="true"
                                                    ></i>
                                                    Share
                                                </span>
                                            </CopyToClipboard>

                                            {copied && (
                                                <div className="absolute -top-7 bg-[#525252] py-1 px-1.5 rounded-lg flex gap-1 items-center left-[50%] -translate-x-[50%]">
                                                    <i
                                                        className="fa fa-check text-green-500"
                                                        aria-hidden="true"
                                                    ></i>
                                                    <span className="font-semibold ">
                                                        Copied
                                                    </span>
                                                </div>
                                            )}
                                        </li>
                                        {email === admin && (
                                            <li>
                                                <button
                                                    disabled={deleting}
                                                    onClick={quizDeleteHandler}
                                                    className={`flex items-center py-1 px-3 gap-1 hover:bg-[#525252] text-white text-xs ${
                                                        deleting &&
                                                        "cursor-wait bg-[#525252]"
                                                    }`}
                                                >
                                                    {deleting ? (
                                                        <i className="fa fa-spinner animate-spin"></i>
                                                    ) : (
                                                        <i
                                                            className="fa fa-minus-circle text-red-400"
                                                            aria-hidden="true"
                                                        ></i>
                                                    )}
                                                    Delete
                                                </button>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            )}
                        </div>
                        {email === admin && (
                            <div>
                                <div className="flex items-center justify-center w-full">
                                    <label
                                        htmlFor={id}
                                        className={`flex items-center ${
                                            loading
                                                ? "cursor-wait"
                                                : "cursor-pointer"
                                        } `}
                                    >
                                        <div className="relative">
                                            <input
                                                id={id}
                                                disabled={loading}
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
                                                } ${loading && "bg-gray-300"}`}
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
                        )}
                    </div>
                </div>
            </div>
            {checkParticipate() ? (
                <Link to={`/quiz/result/${id}`}>
                    <button className="bg-green-500 rounded-b-md py-1.5 md:py-1 lg:py-1 text-white md:hover:bg-green-400 lg:hover:bg-green-400 text-sm font-semibold absolute bottom-0 right-0 left-0">
                        Quiz Result
                    </button>
                </Link>
            ) : (
                <Link to={`/quiz/${id}`}>
                    <button className="bg-green-500 rounded-b-md py-1.5 md:py-1 lg:py-1 text-white md:hover:bg-green-400 lg:hover:bg-green-400 text-sm font-semibold absolute bottom-0 right-0 left-0">
                        Participate Now
                    </button>
                </Link>
            )}

            {!activeStatus && !checkParticipate() && (
                <button className="bg-green-400 rounded-b-md py-1.5 md:py-1 lg:py-1 text-white text-sm font-semibold absolute bottom-0 right-0 left-0 cursor-default">
                    Pause
                </button>
            )}
        </div>
    );
}
