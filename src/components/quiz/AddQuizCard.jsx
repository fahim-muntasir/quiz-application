import React from "react";
import { useDispatch } from "react-redux";
import plusIcon from "../../assets/img/plusIcon.png";
import { open } from "../../fetures/modal/modalSlice";

export default function AddQuizCard() {
    const dispatch = useDispatch();
    return (
        <div
            onClick={() => dispatch(open())}
            className=" border h-60 border-[#525252] rounded-lg hover:bg-[#343434] flex justify-center items-center cursor-pointer"
        >
            <img src={plusIcon} alt="plusIcon" />
        </div>
    );
}
