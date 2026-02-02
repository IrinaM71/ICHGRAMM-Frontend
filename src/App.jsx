import { useAuthStore } from "./store/authStore";
import AppRouter from "./router/AppRouter";
import { useEffect } from "react";


export default function App() {
  const fetchMe = useAuthStore((state) => state.fetchMe);
  const token = useAuthStore ((state) => state.token);

  useEffect(() => {
    if (token) {
      fetchMe();
    }
  }, [token, fetchMe])
  return <AppRouter />;
}
