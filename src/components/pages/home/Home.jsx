import React from "react";
import { Link } from "react-router-dom";
import styles from "../pagestyle.module.css";

const Home = () => {
    return (
        <div className={`${styles.bannerImg} flex items-center`}>
            <div className="mx-auto text-center">
                <h1 className="text-5xl text-white font-semibold mb-16">
                    Let's fun with quiz!
                </h1>
                <div>
                    <Link to="/signin">
                        <button className="hover:bg-green-400 bg-green-500 font-semibold w-40 py-2 rounded text-white mb-5">
                            Sign In
                        </button>
                    </Link>
                </div>
                <div>
                    <Link to="/signup">
                        <button className="hover:bg-purple-400 bg-purple-500 font-semibold w-40 py-2 rounded text-white mb-5">
                            Sign Up
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
