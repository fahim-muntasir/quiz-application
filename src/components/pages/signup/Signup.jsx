import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../../config/supabaseClient";
import Input from "../../ui/Input";
import styles from "../pagestyle.module.css";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const reset = () => {
        setName("");
        setEmail("");
        setPassword("");
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        name,
                    },
                },
            });
            if (error) {
                alert(error);
            }
            reset();
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className={`${styles.bannerImg} flex items-center`}>
            <div className="w-full md:w-96 lg:w-96 mx-auto px-10">
                <h1 className="text-5xl text-center mx-auto mb-10 text-white">
                    Sign Up
                </h1>
                <form onSubmit={submitHandler}>
                    <div className="mb-5">
                        <Input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-5">
                        <Input
                            type="text"
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
                            Haven an accout?
                            <Link
                                to="/signin"
                                className="hover:underline text-green-500"
                            >
                                <b>Sign Up now.</b>
                            </Link>
                        </span>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-purple-500 hover:bg-purple-400 py-2 rounded font-semibold text-white"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Signup;
