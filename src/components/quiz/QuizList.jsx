import React from "react";
import AddQuizCard from "./AddQuizCard";
import QuizCard from "./QuizCard";

export default function QuizList({ modalOpen }) {
    return (
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 lg:grid-cols-4 md:gap-10 lg:gap-16 pt-10 px-10">
            <QuizCard />
            <QuizCard />
            <QuizCard />
            <QuizCard />
            <QuizCard />
            <AddQuizCard modalOpen={modalOpen} />
        </div>
    );
}
