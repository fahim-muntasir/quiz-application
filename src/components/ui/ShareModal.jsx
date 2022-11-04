import React from "react";

export default function ShareModal() {
    return (
        <>
            <div className="fixed w-full h-full bg-[#343434be] inset-0 z-10 "></div>
            <div
                className={`bg-[#1C1C1C] w-[92%] md:w-[600px] lg:w-[600px] h-[640px] rounded-lg z-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-y-auto `}
            >
                <div className="flex justify-between px-5 border-b border-[#525252] py-3 text-white sticky top-0 z-50 bg-[#1C1C1C]">
                    <span className=" font-semibold ">Create Quiz</span>
                    <span className="hover:underline cursor-pointer">
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
                                required
                            />
                        </div>
                        <div className="text-right">
                            <button
                                className={`hover:bg-green-400 py-1 px-5 rounded-lg text-white bg-green-500 text-sm`}
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
