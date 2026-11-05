import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function MainLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(false);

  const toggleTheme = () => {
    setDark((prev) => !prev);
  };

  return (
    <div className={`app-shell ${dark ? "dark-theme" : "light-theme"}`}>
      <Sidebar
        mobileOpen={mobileOpen}
        closeMobile={() => setMobileOpen(false)}
      />

      <div className="main-area">
        <Header
          onMenu={() => setMobileOpen((prev) => !prev)}
          dark={dark}
          onToggleTheme={toggleTheme}
        />

        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}