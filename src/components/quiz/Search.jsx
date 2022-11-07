import React, { useState } from "react";

export default function Search() {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchSettingIsOpen, setSearchSettingIsOpen] = useState(false);

    return (
        <div className="pt-5 w-full md:w-8/12 lg:w-7/12 relative">
            <div className="relative w-full">
                <div className="hover:bg-[#424242] cursor-pointer transition text-xl text-gray-200 absolute left-4 top-[50%] -translate-y-[50%] w-9 h-9 flex items-center justify-center rounded-full">
                    <i className="fa fa-search" aria-hidden="true"></i>
                </div>
                <input
                    type="text"
                    placeholder="Search quizzes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className=" text-gray-200 bg-[#2c2c2ce8]  focus:bg-[#343434] focus:shadow-[0px_0px_1px_1px_#404040a6] py-3.5 rounded-md outline-none px-16 w-full"
                />
                {searchQuery && (
                    <div
                        onClick={() => setSearchQuery("")}
                        className="hover:bg-[#424242] cursor-pointer transition text-xl text-gray-200 absolute right-14 top-[50%] -translate-y-[50%] w-9 h-9 flex items-center justify-center rounded-full"
                    >
                        <i className="fa fa-times" aria-hidden="true"></i>
                    </div>
                )}

                <div
                    onClick={() => setSearchSettingIsOpen(!searchSettingIsOpen)}
                    className="hover:bg-[#424242] cursor-pointer transition text-xl text-gray-200 absolute right-4 top-[50%] -translate-y-[50%] w-9 h-9 flex items-center justify-center rounded-full"
                >
                    <i className="fa fa-tasks" aria-hidden="true"></i>
                </div>
            </div>

            {searchSettingIsOpen && (
                <div className="w-full bg-[#343434] shadow-[0px_0px_2px_1px_#404040a6] py-5 px-4 absolute top-18 z-10">
                    <div className="relative">
                        <div
                            onClick={() => setSearchSettingIsOpen(false)}
                            className="absolute right-2 -top-2 text-gray-300 hover:text-gray-200 cursor-pointer"
                        >
                            <i className="fa fa-times" aria-hidden="true"></i>
                        </div>
                        <table className="">
                            <tbody>
                                <tr>
                                    <td className="pb-8 pr-12">
                                        <span className="text-gray-200 text-sm">
                                            Search by
                                        </span>
                                    </td>
                                    <td className="pb-8">
                                        <select
                                            name=""
                                            id=""
                                            className=" bg-transparent border-b text-gray-200 text-sm outline-none w-40 "
                                        >
                                            <option
                                                value=""
                                                className="text-gray-800"
                                            >
                                                Admin
                                            </option>
                                            <option
                                                value=""
                                                className="text-gray-800"
                                            >
                                                Subject
                                            </option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td className=" pb-8 pr-12">
                                        <span className="text-gray-200 text-sm">
                                            Status Type
                                        </span>
                                    </td>
                                    <td className="pb-8 flex gap-2 text-gray-200 text-sm items-center">
                                        <div>
                                            <input
                                                type="checkbox"
                                                className="mr-1"
                                            />
                                            <span>Active</span>
                                        </div>
                                        <div>
                                            <input
                                                type="checkbox"
                                                className="mr-1"
                                            />
                                            <span>Pause</span>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className=" text-right ">
                        <button className=" uppercase text-gray-200 text-xs ">
                            Reset
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
