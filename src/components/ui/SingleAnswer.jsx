import React from "react";

export default function SingleAnswer({ text }) {
    return (
        <button className="text-white border border-[#525252] rounded-lg py-3 px-4 flex items-center gap-2 hover:bg-[#343434]">
            <input type="checkbox" />
            {text}
        </button>
    );
}
