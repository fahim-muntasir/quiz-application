import React from "react";

export default function Blank() {
    return (
        <div className=" relative h-60 bg-[#343434] rounded-lg animate-pulse">
            <div className="bg-[#525252] h-36 mb-2 rounded-t-lg"></div>
            <div>
                <div className="flex justify-between px-2 items-center">
                    <div className=" bg-[#525252] w-20 h-2 rounded "></div>
                    <i
                        className="fa fa-share text-[#525252] text-xl"
                        aria-hidden="true"
                    ></i>
                </div>
                <div className="px-2">
                    <div className=" bg-[#525252] w-28 h-3 rounded "></div>
                </div>
            </div>
            <div className="bg-[#525252] rounded-b-lg py-1 absolute bottom-0 right-0 left-0 h-6"></div>
        </div>
    );
}
