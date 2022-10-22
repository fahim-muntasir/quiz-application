import React from "react";
import Layout from "../../common/Layout";
import SingleAnswer from "../../ui/SingleAnswer";

export default function Quiz() {
    return (
        <Layout>
            <section>
                <div className="container mx-auto px-5 md:px-0 lg:px-0">
                    <div className="text-[#696969] mb-5 mt-5">
                        <h2 className=" font-semibold ">Subject: English</h2>
                        <span className="text-sm">Total Mark: 10</span>
                    </div>
                    <div className="text-white flex justify-between items-center border-b border-[#525252] pb-2">
                        <h1 className="text-2xl">
                            Question: What is React js?
                        </h1>
                        <span className="text-xs">1 of 10</span>
                    </div>
                    <div className="grid md:grid-cols-2 lg:md:grid-cols-2 gap-5 mt-10">
                        <SingleAnswer text="React" />
                        <SingleAnswer text="React" />
                        <SingleAnswer text="React" />
                        <SingleAnswer text="React" />
                    </div>
                    <div className="flex justify-between mt-10">
                        <button className="bg-green-500 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-green-400">
                            Previous
                        </button>
                        <button className="bg-green-500 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-green-400">
                            Next
                        </button>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
