import React from "react";
import resultBg from "../../../assets/img/result_bg.png";
import Layout from "../../common/Layout";
import SingleAnswer from "../../ui/SingleAnswer";

export default function Result() {
    return (
        <Layout>
            <section>
                <div className="container mx-auto px-5 md:px-0 lg:px-0">
                    <div className="text-[#696969] mb-5 mt-5">
                        <h2 className=" font-semibold ">Subject: English</h2>
                        <span className="text-sm">Total Mark: 10</span>
                    </div>
                    <div className="relative flex justify-center mb-10">
                        <h1 className="absolute top-8 text-white text-2xl">
                            Total Mark: 10
                        </h1>
                        <img src={resultBg} alt="resultBg" className="w-96" />
                    </div>

                    <div className="text-white mb-10">
                        <h1 className="text-2xl border-b border-[#525252] pb-2">
                            Question: What is React js?
                        </h1>
                        <div className="grid md:grid-cols-2 lg:md:grid-cols-2 gap-5 mt-10">
                            <SingleAnswer text="React" />
                            <SingleAnswer text="React" />
                            <SingleAnswer text="React" />
                            <SingleAnswer text="React" />
                        </div>
                    </div>
                    <div className="text-white mb-10">
                        <h1 className="text-2xl border-b border-[#525252] pb-2">
                            Question: What is React js?
                        </h1>
                        <div className="grid md:grid-cols-2 lg:md:grid-cols-2 gap-5 mt-10">
                            <SingleAnswer text="React" />
                            <SingleAnswer text="React" />
                            <SingleAnswer text="React" />
                            <SingleAnswer text="React" />
                        </div>
                    </div>
                    <div className="text-white mb-10">
                        <h1 className="text-2xl border-b border-[#525252] pb-2">
                            Question: What is React js?
                        </h1>
                        <div className="grid md:grid-cols-2 lg:md:grid-cols-2 gap-5 mt-10">
                            <SingleAnswer text="React" />
                            <SingleAnswer text="React" />
                            <SingleAnswer text="React" />
                            <SingleAnswer text="React" />
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
