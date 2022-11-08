import React from "react";

export default function InfoAlert({ text }) {
    return (
        <div
            className="bg-green-100 border-t border-b border-green-500 text-green-700 px-4 py-3 mb-5"
            role="alert"
        >
            <div className="flex">
                <div>
                    <svg
                        class="fill-current h-6 w-6 mr-3"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                    >
                        <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                    </svg>
                </div>
                <div>
                    <p className="font-bold text-sm">{text}</p>
                </div>
            </div>
        </div>
    );
}
