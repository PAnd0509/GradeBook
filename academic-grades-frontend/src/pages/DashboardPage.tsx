import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { studentService } from "../api/studentService";
import { subjectService } from "../api/subjectService";
import { gradeService } from "../api/gradeService";
import "../styles/pages/dashboard.scss";

type DashboardStats = {
  totalStudents: number;
  totalSubjects: number;
  totalGrades: number;
};

const initialStats: DashboardStats = {
  totalStudents: 0,
  totalSubjects: 0,
  totalGrades: 0,
};

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>(initialStats);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const [students, subjects] = await Promise.all([
        studentService.getAll(),
        subjectService.getAll(),
      ]);

      const gradesByStudent = await Promise.all(
        students.map((student) => gradeService.getByStudent(student.id)),
      );

      const totalGrades = gradesByStudent.reduce(
        (total, studentGrades) => total + studentGrades.length,
        0,
      );

      setStats({
        totalStudents: students.length,
        totalSubjects: subjects.length,
        totalGrades,
      });
    } catch (error) {
      console.error(error);
      setErrorMessage(
        "Error al cargar los datos del dashboard. Verifica si el backend está en ejecución."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  return (
    <section className="dashboard-page">
      <div className="dashboard-hero">
        <div className="dashboard-hero__content">
          <span className="dashboard-eyebrow">Sistema de gestión académica</span>

          <h1>Bienvenido a Gradebook</h1>

          <p>
            Gestiona estudiantes, materias y calificaciones desde un dashboard limpio, centralizado y responsivo.
          </p>

          <div className="dashboard-hero__actions">
            <Link
              to="/students"
              className="dashboard-button dashboard-button--primary"
            >
              Gestionar estudiantes
            </Link>

            <Link
              to="/grades"
              className="dashboard-button dashboard-button--secondary"
            >
              Registrar calificación
            </Link>
          </div>
        </div>

        <div className="dashboard-hero__visual" aria-hidden="true">
          <div className="dashboard-logo-card">
            <img
              src="/brand/gradebook-icon.png"
              alt=""
              className="dashboard-logo-card__image"
            />
          </div>
        </div>
      </div>

      {errorMessage && <div className="alert alert--error">{errorMessage}</div>}

      {loading && <div className="alert">Cargando datos del dashboard...</div>}

      <div className="dashboard-grid">
        <Link
          to="/students"
          className="dashboard-card dashboard-card--students"
        >
          <div className="dashboard-card__top">
            <span className="dashboard-card__label">Estudiantes</span>
          </div>

          <strong>{stats.totalStudents}</strong>
          <p>Estudiantes registrados en el sistema académico.</p>
          <span className="dashboard-card__cta">Abrir módulo</span>
        </Link>

        <Link
          to="/subjects"
          className="dashboard-card dashboard-card--subjects"
        >
          <div className="dashboard-card__top">
            <span className="dashboard-card__label">Materias</span>
          </div>

          <strong>{stats.totalSubjects}</strong>
          <p>Materias académicas y cursos disponibles.</p>
          <span className="dashboard-card__cta">Abrir módulo</span>
        </Link>

        <Link to="/grades" className="dashboard-card dashboard-card--grades">
          <div className="dashboard-card__top">
            <span className="dashboard-card__label">Calificaciones</span>
          </div>

          <strong>{stats.totalGrades}</strong>
          <p>Calificaciones registradas por estudiante y materia.</p>
          <span className="dashboard-card__cta">Abrir módulo</span>
        </Link>
      </div>

      <div className="dashboard-section">
        <div className="info-card info-card--large">
          <span className="dashboard-eyebrow">Módulos del sistema</span>

          <h2>¿Qué puedes gestionar?</h2>

          <div className="dashboard-module-list">
            <Link to="/students" className="dashboard-module-card">
              <span>01</span>
              <h3>Gestión de estudiantes</h3>
              <p>Crea, actualiza, lista y elimina estudiantes.</p>
            </Link>

            <Link to="/subjects" className="dashboard-module-card">
              <span>02</span>
              <h3>Gestión de materias</h3>
              <p>Crea, actualiza, lista y elimina materias académicas.</p>
            </Link>

            <Link to="/grades" className="dashboard-module-card">
              <span>03</span>
              <h3>Gestión de calificaciones</h3>
              <p>Registra y consulta calificaciones por estudiante y materia.</p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
