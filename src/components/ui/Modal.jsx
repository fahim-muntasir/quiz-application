import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { close } from "../../fetures/modal/modalSlice";

export default function Modal() {
    const INITIAL_QUESTION = { question: "", options: [], answer: "" };
    const [questions, setQuestions] = useState([INITIAL_QUESTION]);

    const dispatch = useDispatch();

    const addQuestionHandler = () => {
        const newQuestion = [...questions];
        newQuestion.push(INITIAL_QUESTION);

        setQuestions(newQuestion);
    };

    return (
        <>
            <div
                onClick={() => dispatch(close())}
                className="fixed w-full h-full bg-[#343434be] inset-0 z-10 "
            ></div>
            <div
                className={`bg-[#1C1C1C] w-[600px] h-[640px] rounded-lg z-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-y-auto `}
            >
                <div className="flex justify-between px-5 border-b border-[#525252] py-3 text-white sticky top-0 z-50 bg-[#1C1C1C]">
                    <span className=" font-semibold ">Create Quiz</span>
                    <span
                        onClick={() => dispatch(close())}
                        className="hover:underline cursor-pointer"
                    >
                        Close
                    </span>
                </div>
                <div className="px-10 py-5">
                    <form>
                        <div className="mb-5">
                            <input
                                type="text"
                                className="w-full outline-none bg-transparent py-2 px-5 border border-[#525252] rounded-lg text-white"
                                placeholder="Subject name..."
                            />
                        </div>
                        <div className="mb-5">
                            <input
                                type="number"
                                min={1}
                                className="w-full outline-none bg-transparent py-2 px-5 border border-[#525252] rounded-lg text-white"
                                placeholder="Single question mark?"
                            />
                        </div>

                        {questions.map((e, index) => (
                            <div key={Math.random() * index}>
                                <div className="mb-5">
                                    <input
                                        type="text"
                                        className="w-full outline-none bg-transparent py-2 px-5 border border-[#525252] rounded-lg text-white"
                                        placeholder="Question..."
                                    />
                                </div>

                                <div className="border-l border-[#525252]">
                                    <div className="w-[280px] md:w-[490px] lg:w-[490px] ml-auto">
                                        <div className="mb-5">
                                            <input
                                                type="text"
                                                className="w-full outline-none bg-transparent py-2 px-5 border border-[#525252] rounded-lg text-white"
                                                placeholder="Option 1"
                                            />
                                        </div>
                                        <div className="mb-5">
                                            <input
                                                type="text"
                                                className="w-full outline-none bg-transparent py-2 px-5 border border-[#525252] rounded-lg text-white"
                                                placeholder="Option 2"
                                            />
                                        </div>
                                        <div className="mb-5">
                                            <input
                                                type="text"
                                                className="w-full outline-none bg-transparent py-2 px-5 border border-[#525252] rounded-lg text-white"
                                                placeholder="Option 3"
                                            />
                                        </div>
                                        <div className="mb-5">
                                            <input
                                                type="text"
                                                className="w-full outline-none bg-transparent py-2 px-5 border border-[#525252] rounded-lg text-white"
                                                placeholder="Option 4"
                                            />
                                        </div>
                                        <div className="mb-5">
                                            <input
                                                type="text"
                                                className="w-full outline-none bg-transparent py-2 px-5 border border-[#525252] rounded-lg text-white"
                                                placeholder="Answer..."
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div>
                            <span
                                onClick={addQuestionHandler}
                                className="text-[#525252] hover:underline cursor-pointer"
                            >
                                +Add Question
                            </span>
                        </div>
                        <div className="text-right">
                            <button className="bg-green-500 hover:bg-green-400 py-1 px-5 rounded-lg text-white text-sm">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
