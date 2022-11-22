import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetAns } from "../../../fetures/quizAnswer/quizAnsSlice";
import Layout from "../../common/Layout";
import Footer from "../../footer/Footer";
import Modal from "../../ui/Modal";
import SearchResultList from "./SearchResultList";

export default function SearchResult() {
    const { isOpen } = useSelector((state) => state.modal);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(resetAns());
    }, [dispatch]);

    return (
        <Layout>
            <section>
                <div className="container mx-auto">
                    <SearchResultList />
                </div>
                {isOpen && <Modal />}
            </section>
            <Footer />
        </Layout>
    );
}
