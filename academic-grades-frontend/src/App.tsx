import { NavLink, Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import StudentsPage from "./pages/StudentsPage";
import SubjectsPage from "./pages/SubjectsPage";
import GradesPage from "./pages/GradesPage";
import "./styles/global.scss";

export default function App() {
  return (
    <div className="app">
      <aside className="sidebar">
        <div>
          <NavLink to="/" end className="brand">
            <span className="brand__text">Gradebook</span>
          </NavLink>

          <nav className="sidebar__nav">

            <NavLink to="/students">Estudiantes</NavLink>

            <NavLink to="/subjects">Materias</NavLink>

            <NavLink to="/grades">Calificaciones</NavLink>
          </nav>
        </div>

        <div className="sidebar__footer">
          <img
            src="/brand/gradebook-icon.png"
            alt="Ícono de Gradebook"
            className="sidebar__footer-icon"
          />

          <span>Sistema académico</span>
        </div>
      </aside>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/students" element={<StudentsPage />} />
          <Route path="/subjects" element={<SubjectsPage />} />
          <Route path="/grades" element={<GradesPage />} />
        </Routes>
      </main>
    </div>
  );
}
