import "./App.css";
import AuthPage from "../pages/authPage/AuthPage.jsx";
import AuthForm from "../components/authForm/AuthForm.jsx";
import AuthReset from "../components/authReset/AuthReset.jsx";
import ProfilePage from "../pages/profilePage/ProfilePage.jsx";
import { CreatePage } from "../pages/createPage/CreatePage.jsx";
import ErrorPage from "../pages/errorPage/ErrorPage.jsx";
import MessagesPage from "../pages/messagesPage/MessagesPage.jsx";
import MainPage from "../pages/mainPage/MainPage.jsx";

import ExplorePage from "../pages/explorePage/ExplorePage.jsx";

import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import AppLayout from "../layouts/AppLayout.jsx";
import { useAuthStore } from "../../store/authStore.js";

function PrivateRoute({ children }) {
  const { isAuth } = useAuthStore();
  return isAuth ? children : <Navigate to="/auth" replace />;
}

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Публичные маршруты*/}
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/authForm" element={<AuthForm />} />
        <Route path="/authReset" element={<AuthReset />} />

        {/*Приватные маршруты*/}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <AppLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<MainPage />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route path="explore" element={<ExplorePage />} />
          <Route path="create" element={<CreatePage />} />
          <Route path="messages" element={<MessagesPage />} />
        </Route>

        {/*Ошибки*/}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
