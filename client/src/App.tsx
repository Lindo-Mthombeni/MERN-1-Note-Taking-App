import { Route, Routes } from "react-router";
import "./App.css";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import NoteDetailPage from "./pages/NoteDetailPage";
import { useEffect } from "react";
import { DeleteWindowProvider } from "./lib/deleteWindowContext";

const App = () => {
  useEffect(() => {
    const darkMode = window.matchMedia("(prefers-color-scheme: dark)");

    const themeChange = (e: MediaQueryList | MediaQueryListEvent) => {
      const theme = e.matches ? "night" : "emerald";
      document.documentElement.setAttribute("data-theme", theme);
    };

    themeChange(darkMode);
    darkMode.addEventListener("change", themeChange);

    return () => darkMode.removeEventListener("change", themeChange);
  }, []);

  return (
    <div className="not-dark:bg-bg">
      <DeleteWindowProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/note/:id" element={<NoteDetailPage />} />
        </Routes>
      </DeleteWindowProvider>
    </div>
  );
};

export default App;
