import { useAuthStore } from "./store";
import AppRouter from "./router/AppRouter.jsx";
import { useEffect } from "react";

export default function App() {
  const fetchMe = useAuthStore((state) => state.fetchMe);
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    if (token) {
      fetchMe();
    }
  }, [token, fetchMe]);
  return <AppRouter />;
}
