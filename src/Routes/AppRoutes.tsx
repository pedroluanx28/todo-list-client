import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";

export function AppRoutes() {
    const token = localStorage.getItem("token");

    return (
        <BrowserRouter>
            <Routes>
                {token ? (
                    <>
                        <Route path="/" element={<Home />} />
                        <Route path="/*" element={<Navigate to="/" />} />
                    </>
                ) : (
                    <>
                        <Route path="/*" element={<Navigate to="/login" />} />
                        <Route path="/" element={<Navigate to="/login" />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </>
                )}
            </Routes>
        </BrowserRouter>
    )
}