import React, { useEffect, useState } from "react";
import { supabase } from "../../config/supabaseClient";

const totalMarkGenerate = (singlemark, totalQuestion) => {
    return totalQuestion * singlemark;
};

export default function ParticipatesModal({ isOpen, close, quizId }) {
    const [quiz, setQuiz] = useState("");
    const [loading, setLoading] = useState(false);

    const { allparticipants, singleQuestionMark, questions } = quiz?.[0] || {};

    useEffect(() => {
        let isSubscribed = true;

        setLoading(true);
        const fetchSingleQuiz = async () => {
            const { data } = await supabase
                .from("quiz")
                .select()
                .eq("id", quizId || "");

            if (isSubscribed) {
                setQuiz(data);
                setLoading(false);
            }
        };
        if (isOpen) {
            fetchSingleQuiz().catch(console.error);
        }

        return () => (isSubscribed = false);
    }, [isOpen, quizId]);

    let content = null;
    if (!loading && allparticipants?.length > 0) {
        // sorting the participants by result;
        const sortingParticipants = [...allparticipants];
        sortingParticipants.sort((a, b) => b?.result - a?.result);

        content = sortingParticipants.map((singleParticipant, index) => {
            const { userId, participantName, result } = singleParticipant || {};
            const quizMark = totalMarkGenerate(
                singleQuestionMark,
                questions?.length
            );
            const percentageResult = Math.floor((result * 100) / quizMark);

            let resultIcon = null;
            if (percentageResult > 50) {
                resultIcon = (
                    <i
                        className="fa fa-arrow-up text-xs text-green-500"
                        aria-hidden="true"
                    ></i>
                );
            }
            if (percentageResult < 50) {
                resultIcon = (
                    <i
                        className="fa fa-arrow-down text-xs text-red-500"
                        aria-hidden="true"
                    ></i>
                );
            }
            if (percentageResult === 50) {
                resultIcon = (
                    <span className="text-green-500 font-bold p-0">-</span>
                );
            }

            return (
                <tr key={userId}>
                    <td className="border border-slate-700 ...">
                        {index === 0 ? "🏆" : index + 1}
                    </td>
                    <td className="border border-slate-700 ...">
                        {participantName}
                    </td>
                    <td className="border border-slate-700 ...">
                        {result} {resultIcon}
                    </td>
                </tr>
            );
        });
    }

    return (
        isOpen && (
            <>
                <div
                    onClick={() => close()}
                    className="fixed w-full h-screen bg-[#343434be] inset-0 z-20 "
                ></div>
                <div
                    className={`bg-[#1C1C1C] w-[92%] md:w-[600px] lg:w-[600px] h-[640px] rounded-lg z-30 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-y-auto`}
                >
                    <div className="flex justify-between px-5 border-b border-[#525252] py-3 text-white sticky top-0 z-50 bg-[#1C1C1C]">
                        <span className=" font-semibold ">
                            All participants
                        </span>
                        <span
                            onClick={() => close()}
                            className="hover:underline cursor-pointer"
                        >
                            Close
                        </span>
                    </div>
                    {!loading && (
                        <div className="p-5">
                            <div className="mb-4">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="text-gray-200 bg-[#2c2c2ce8]  focus:bg-[#343434] py-2 rounded-md outline-none px-5 w-full"
                                />
                            </div>
                            <div className="mb-2 text-white text-sm flex justify-between">
                                <span>
                                    Full mark:{" "}
                                    {totalMarkGenerate(
                                        singleQuestionMark,
                                        questions?.length
                                    )}
                                </span>
                                <span>
                                    Total participants:{" "}
                                    {allparticipants?.length}
                                </span>
                            </div>
                            <table className="table-auto w-full text-white border-collapse border border-slate-500 text-center">
                                <thead>
                                    <tr>
                                        <th className="border border-slate-600 w-24">
                                            Position
                                        </th>
                                        <th className="border border-slate-600 ">
                                            Name
                                        </th>
                                        <th className="border border-slate-600 ...">
                                            Mark
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>{content}</tbody>
                            </table>
                        </div>
                    )}
                    {loading && <p className="text-white">Loading...</p>}
                </div>
            </>
        )
    );
}
