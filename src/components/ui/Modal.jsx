import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { supabase } from "../../config/supabaseClient";
import { close } from "../../fetures/modal/modalSlice";

export default function Modal() {
    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState([
        {
            question: "",
            option1: "",
            option2: "",
            option3: "",
            option4: "",
            answer: "",
        },
    ]);
    const [subjectName, setSubjectName] = useState("");
    const [singleQuestionMark, setSingleQuestionMark] = useState("");

    const dispatch = useDispatch();

    const questionHandler = (e, index) => {
        const { name, value } = e.target;
        let list = [...questions];
        list[index][name] = value;
        setQuestions(list);
    };

    const addQuestionHandler = () => {
        setQuestions([
            ...questions,
            {
                question: "",
                option1: "",
                option2: "",
                option3: "",
                option4: "",
                answer: "",
            },
        ]);
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        const quizData = {
            subject: subjectName,
            singleQuestionMark,
            questions,
        };
        try {
            const { error } = await supabase.from("quiz").insert(quizData);
            if (error) {
                alert(error);
            }
            setLoading(false);
        } catch (err) {
            alert(err);
        }
    };

    return (
        <>
            <div
                onClick={() => dispatch(close())}
                className="fixed w-full h-full bg-[#343434be] inset-0 z-10 "
            ></div>
            <div
                className={`bg-[#1C1C1C] w-[100%] md:w-[600px] lg:w-[600px] h-[640px] rounded-lg z-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-y-auto `}
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
                    <form onSubmit={submitHandler}>
                        <div className="mb-5">
                            <input
                                type="text"
                                className="w-full outline-none bg-transparent py-2 px-5 border border-[#525252] rounded-lg text-white"
                                placeholder="Subject name..."
                                value={subjectName}
                                onChange={(e) => setSubjectName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-5">
                            <input
                                type="number"
                                min={1}
                                className="w-full outline-none bg-transparent py-2 px-5 border border-[#525252] rounded-lg text-white"
                                placeholder="Single question mark?"
                                value={singleQuestionMark}
                                onChange={(e) =>
                                    setSingleQuestionMark(e.target.value)
                                }
                                required
                            />
                        </div>

                        {questions.map((singleQuestion, index) => (
                            <div key={index}>
                                <div className="mb-5">
                                    <input
                                        type="text"
                                        name="question"
                                        className="w-full outline-none bg-transparent py-2 px-5 border border-[#525252] rounded-lg text-white"
                                        placeholder="Question..."
                                        value={singleQuestion.question}
                                        onChange={(e) =>
                                            questionHandler(e, index)
                                        }
                                        required
                                    />
                                </div>

                                <div className="border-l border-[#525252]">
                                    <div className="w-[250px] md:w-[490px] lg:w-[490px] ml-auto">
                                        <div className="mb-5">
                                            <input
                                                type="text"
                                                name="option1"
                                                className="w-full outline-none bg-transparent py-2 px-5 border border-[#525252] rounded-lg text-white"
                                                placeholder="Option 1"
                                                value={singleQuestion.option1}
                                                onChange={(e) =>
                                                    questionHandler(e, index)
                                                }
                                                required
                                            />
                                        </div>
                                        <div className="mb-5">
                                            <input
                                                type="text"
                                                name="option2"
                                                className="w-full outline-none bg-transparent py-2 px-5 border border-[#525252] rounded-lg text-white"
                                                placeholder="Option 2"
                                                value={singleQuestion.option2}
                                                onChange={(e) =>
                                                    questionHandler(e, index)
                                                }
                                                required
                                            />
                                        </div>
                                        <div className="mb-5">
                                            <input
                                                type="text"
                                                name="option3"
                                                className="w-full outline-none bg-transparent py-2 px-5 border border-[#525252] rounded-lg text-white"
                                                placeholder="Option 3"
                                                value={singleQuestion.option3}
                                                onChange={(e) =>
                                                    questionHandler(e, index)
                                                }
                                                required
                                            />
                                        </div>
                                        <div className="mb-5">
                                            <input
                                                type="text"
                                                name="option4"
                                                className="w-full outline-none bg-transparent py-2 px-5 border border-[#525252] rounded-lg text-white"
                                                placeholder="Option 4"
                                                value={singleQuestion.option4}
                                                onChange={(e) =>
                                                    questionHandler(e, index)
                                                }
                                                required
                                            />
                                        </div>
                                        <div className="mb-5">
                                            <input
                                                type="text"
                                                name="answer"
                                                className="w-full outline-none bg-transparent py-2 px-5 border border-[#525252] rounded-lg text-white"
                                                placeholder="Answer..."
                                                value={singleQuestion.answer}
                                                onChange={(e) =>
                                                    questionHandler(e, index)
                                                }
                                                required
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
                            <button
                                disabled={loading}
                                className={`hover:bg-green-400 py-1 px-5 rounded-lg text-white text-sm ${
                                    loading
                                        ? "bg-green-300 cursor-wait"
                                        : "bg-green-500"
                                }`}
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
