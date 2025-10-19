import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from './context/AuthContext.jsx';
import App from "./App.jsx";
import HomePage from "./pages/HomePage.jsx";
import VacinaPage from "./pages/VacinaPage.jsx";
import OndeIrPage from "./pages/OndeIrPage.jsx";
import LocalDetailPage from "./pages/LocalDetailPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx"; 
import AdminVaccinePage from "./pages/AdminVaccinePage.jsx";
import BlogPage from "./pages/BlogPage.jsx"; // 1. IMPORTE A PÁGINA DO BLOG
import BlogPostPage from "./pages/BlogPostPage.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
        <BrowserRouter>
            <Routes>
                <Route element={<App />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/vacina" element={<VacinaPage />} />
                <Route path="/onde-ir" element={<OndeIrPage />} />
                <Route path="/local/:tipo" element={<LocalDetailPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/perfil" element={<ProfilePage />} />
                <Route path="/admin/vacinas" element={<AdminVaccinePage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:postId" element={<BlogPostPage />} />

                </Route>
            </Routes>
        </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);