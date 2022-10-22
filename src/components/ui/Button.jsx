import React from "react";

export const Button = ({ children, color }) => {
    return (
        <button
            className={`bg-${color}-500 hover:bg-${color}-400 font-semibold w-40 py-2 rounded text-white`}
        >
            {children}
        </button>
    );
};
