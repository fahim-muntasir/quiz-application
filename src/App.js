import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/pages/dashboard/Dashboard";
import Home from "./components/pages/home/Home";
import NotFound from "./components/pages/NotFound";
import Quiz from "./components/pages/quiz/Quiz";
import Result from "./components/pages/result/Result";
import SearchResult from "./components/pages/searchResult/SearchResult";
import SignIn from "./components/pages/signIn/SignIn";
import Signup from "./components/pages/signup/Signup";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import useAuthCheck from "./hooks/useAuthCheck";

function App() {
    const authChecked = useAuthCheck();

    return !authChecked ? (
        <div className=" absolute w-full h-full flex justify-center items-center bg-[#1c1c1c] ">
            <i
                className="fa fa-spinner text-white text-5xl animate-spin"
                aria-hidden="true"
            ></i>
        </div>
    ) : (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <PublicRoute>
                            <Home />
                        </PublicRoute>
                    }
                />
                <Route
                    path="/signin"
                    element={
                        <PublicRoute>
                            <SignIn />
                        </PublicRoute>
                    }
                />
                <Route
                    path="/signup"
                    element={
                        <PublicRoute>
                            <Signup />
                        </PublicRoute>
                    }
                />
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/quiz/:id"
                    element={
                        <PrivateRoute>
                            <Quiz />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/quiz/result/:id"
                    element={
                        <PrivateRoute>
                            <Result />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/quiz/search"
                    element={
                        <PrivateRoute>
                            <SearchResult />
                        </PrivateRoute>
                    }
                />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
