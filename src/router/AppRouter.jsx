import { Routes, Route, Navigate } from "react-router-dom";

// Layout
import AppLayout from "../layout/AppLayout.jsx";

// Public pages
import AuthForm from "../components/authForm/AuthForm.jsx";
import SignUp from "../components/sugnUp/SignUp.jsx";
import AuthReset from "../components/authReset/AuthReset.jsx";

// Private pages
import MainPage from "../pages/mainPage/MainPage.jsx";
import SearchPage from "../pages/searchPage/SearchPage.jsx";
import ExplorePage from "../pages/explorePage/ExplorePage.jsx";
import MessagesPage from "../pages/messagesPage/MessagesPage.jsx";
import NotificationsPage from "../pages/notificationsPage/NotificationsPage.jsx";
import OtherProfile from "../pages/profilePage/OtherProfile.jsx";
import MyProfile from "../pages/profilePage/myProfile.jsx";
import EditProfile from "../components/editProfile/EditProfile.jsx";

// Error page
import ErrorPage from "../pages/errorPage/ErrorPage.jsx";

export default function AppRouter() {
  return (
    <Routes>
      {/* Публичные маршруты */}
      <Route path="/login" element={<AuthForm />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/authReset" element={<AuthReset />} />

      {/* Основной layout приложения */}
      <Route element={<AppLayout />}>
        <Route path="/main" element={<MainPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/messages/:companionId" element={<MessagesPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />

        {/* Профили */}
        <Route path="/profile/me" element={<MyProfile />} />
        <Route path="/profile/:id" element={<OtherProfile />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        {/* 404 */}
        <Route path="*" element={<ErrorPage />} />
      </Route>

      {/* Редирект с корня */}
      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
