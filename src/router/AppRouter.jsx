import { Routes, Route, Navigate } from "react-router-dom";

// Layout
import AppLayout from "../layout/AppLayout.jsx";

// Public pages
import AuthForm from "../components/authForm/AuthForm.jsx";
import SingUp from "../components/sungUp/SingUp.jsx";

// Private pages
import MainPage from "../pages/mainPage/MainPage.jsx";
import ExplorePage from "../pages/explorePage/ExplorePage.jsx";
import MessagesPage from "../pages/messagesPage/MessagesPage.jsx";
import OtherProfile from "../pages/profilePage/OtherProfile.jsx";
import MyProfile from "../pages/profilePage/myProfile.jsx";

// Error page
import ErrorPage from "../pages/errorPage/ErrorPage.jsx";

export default function AppRouter() {
  return (
    <Routes>
      {/* Публичные маршруты */}
      <Route path="/login" element={<AuthForm />} />
      <Route path="/signup" element={<SingUp />} />

      {/* Основной layout приложения */}
      <Route element={<AppLayout />}>
        <Route path="/main" element={<MainPage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/messages/:companionId" element={<MessagesPage />} />

        {/* Профили */}
        <Route path="/profile/me" element={<MyProfile />} />
        <Route path="/profile/:id" element={<OtherProfile />} />
      </Route>

      {/* Редирект с корня */}
      <Route path="/" element={<Navigate to="/main" replace />} />

      {/* 404 */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
