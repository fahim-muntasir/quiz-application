import React from "react";

export default function Input({ type, ...rest }) {
    return (
        <input
            type={type}
            {...rest}
            className="border bg-transparent rounded pl-5 py-3 outline-none text-white w-full box-border"
        />
    );
}
