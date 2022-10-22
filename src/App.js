import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/pages/dashboard/Dashboard";
import Home from "./components/pages/home/Home";
import Quiz from "./components/pages/quiz/Quiz";
import Result from "./components/pages/result/Result";
import SignIn from "./components/pages/signIn/SignIn";
import Signup from "./components/pages/signup/Signup";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import useAuthCheck from "./hooks/useAuthCheck";

function App() {
    const authChecked = useAuthCheck();

    return !authChecked ? (
        <div className="text-white">Checking Authentication...</div>
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
                    path="/quiz/result"
                    element={
                        <PrivateRoute>
                            <Result />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
