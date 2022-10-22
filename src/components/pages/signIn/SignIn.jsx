import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../../config/supabaseClient";
import { userLoggedIn } from "../../../fetures/auth/authSlice";
import Input from "../../ui/Input";
import styles from "../pagestyle.module.css";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errormsg, setError] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submithandler = async (e) => {
        e.preventDefault();

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                alert(error);
            }

            if (data?.session?.access_token && data?.user?.id) {
                dispatch(
                    userLoggedIn({
                        accessToken: data?.session?.access_token,
                        user: {
                            id: data?.user?.id,
                            email: data?.user?.email,
                            name: data?.user?.user_metadata?.name,
                        },
                    })
                );
                navigate("/dashboard");
            }
        } catch (err) {
            alert(err);
        }
    };

    return (
        <div className={`${styles.bannerImg} flex items-center`}>
            <div className="w-full md:w-96 lg:w-96 mx-auto px-10">
                <h1 className="text-5xl text-center mx-auto mb-10 text-white">
                    Sign In
                </h1>
                {/* <div className="bg-red-300 text-white py-2 px-5 rounded mb-5">
                    <span>{errormsg}</span>
                </div> */}
                <form onSubmit={submithandler}>
                    <div className="mb-5">
                        <Input
                            type="email"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-1">
                        <Input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-5">
                        <span className="text-white">
                            Haven't an accout?{" "}
                            <Link
                                to="/signup"
                                className="hover:underline text-purple-500"
                            >
                                <b>Sign Up now.</b>
                            </Link>
                        </span>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-500 hover:bg-green-400 py-2 rounded font-semibold text-white"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignIn;
