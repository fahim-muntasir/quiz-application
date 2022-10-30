import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import { supabase } from "../../config/supabaseClient";
import { userLoggedOut } from "../../fetures/auth/authSlice";
import { open } from "../../fetures/modal/modalSlice";

const Navbar = () => {
    const [loading, setLoading] = useState(false);
    const {
        user: { name },
    } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const signOut = async () => {
        setLoading(true);
        try {
            const { error } = await supabase.auth.signOut();
            if (error) {
                alert(error);
            } else {
                dispatch(userLoggedOut());
                navigate("/signin");
                setLoading(false);
            }
        } catch (err) {
            alert(err);
        }
    };

    return (
        <header className="bg-[#1C1C1C] py-2 px-5 md:px-0 lg:px-0 border-b border-[#525252]">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/dashboard">
                    <img
                        src={logo}
                        alt="..."
                        className="w-16 md:w-20 lg:w-20"
                    />
                </Link>
                <nav>
                    <ul className="flex justify-end gap-2 md:gap-5 lg:gap-5 text-white text-sm items-center">
                        <li className="text-xs md:text-sm lg:text-sm">
                            Hello, {name}
                        </li>
                        <li>
                            <button
                                disabled={loading}
                                onClick={signOut}
                                className="bg-[#343434] hover:bg-[#3f3f3f] border border-[#525252] rounded-lg py-0.5 px-2 text-sm"
                            >
                                Sign out
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => dispatch(open())}
                                className="bg-green-500 hover:bg-green-400  rounded-lg py-0.5 px-2 text-sm"
                            >
                                Create Quiz
                            </button>
                        </li>
                        <li>
                            <div className=" w-7 h-7 md:w-8 lg:w-8 md:h-8 lg:h-8 rounded-full border border-[#525252] relative">
                                <img
                                    src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                                    alt="user"
                                    className="w-full h-full rounded-full"
                                />
                                <span className="flex h-2 w-2 absolute bottom-0 right-0">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                            </div>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
