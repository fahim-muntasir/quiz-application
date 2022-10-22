import React from "react";
import { useSelector } from "react-redux";
import Layout from "../../common/Layout";
import QuizList from "../../quiz/QuizList";
import Modal from "../../ui/Modal";

export default function Dashboard() {
    const { isOpen } = useSelector((state) => state.modal);

    return (
        <Layout>
            <section>
                <div className="container mx-auto">
                    <QuizList />
                </div>
                {isOpen && <Modal />}
            </section>
        </Layout>
    );
}
