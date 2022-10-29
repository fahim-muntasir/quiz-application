import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetAns } from "../../../fetures/quizAnswer/quizAnsSlice";
import Layout from "../../common/Layout";
import Footer from "../../footer/Footer";
import QuizList from "../../quiz/QuizList";
import Modal from "../../ui/Modal";

export default function Dashboard() {
    const { isOpen } = useSelector((state) => state.modal);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(resetAns());
    }, [dispatch]);

    return (
        <Layout>
            <section>
                <div className="container mx-auto">
                    <QuizList />
                </div>
                {isOpen && <Modal />}
            </section>
            <Footer />
        </Layout>
    );
}
