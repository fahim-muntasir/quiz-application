import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import { supabase } from "../../config/supabaseClient";
import { userLoggedOut } from "../../fetures/auth/authSlice";
import { open } from "../../fetures/modal/modalSlice";

const Navbar = () => {
    const [loading, setLoading] = useState(false);
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
                    <img src={logo} alt="..." className="w-20" />
                </Link>
                <nav>
                    <ul className="flex justify-end gap-2 md:gap-5 lg:gap-5 text-white text-sm items-center">
                        <li>Hello, Fahim muntasir</li>
                        <li>
                            <button
                                disabled={loading}
                                onClick={signOut}
                                className="bg-[#343434] hover:bg-[#3f3f3f] border border-[#525252] rounded-lg py-0.5 px-2"
                            >
                                Sign out
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => dispatch(open())}
                                className="bg-green-500 hover:bg-green-400  rounded-lg py-0.5 px-2"
                            >
                                Create Quiz
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
