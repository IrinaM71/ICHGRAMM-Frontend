import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div className="app-layout">
      <header>Header</header>

      <main>
        <Outlet />
      </main>

      <footer>Bottom Nav</footer>
    </div>
  );
}

export default AppLayout;
