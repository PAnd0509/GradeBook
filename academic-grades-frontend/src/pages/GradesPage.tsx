import {
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpen,
  faCircleCheck,
  faClipboardList,
  faFilter,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";
import { gradeService } from "../api/gradeService";
import { studentService } from "../api/studentService";
import { subjectService } from "../api/subjectService";
import type { Grade } from "../types/Grade";
import type { Student } from "../types/Student";
import type { Subject } from "../types/Subject";
import "../styles/pages/grades.scss";

type GradeFormState = {
  studentId: string;
  subjectId: string;
  value: string;
};

const initialFormState: GradeFormState = {
  studentId: "",
  subjectId: "",
  value: "",
};

export default function GradesPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [formData, setFormData] = useState<GradeFormState>(initialFormState);

  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [selectedSubjectId, setSelectedSubjectId] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const filteredGrades = useMemo(() => {
    if (!selectedSubjectId) {
      return grades;
    }

    return grades.filter(
      (grade) => grade.subject.id === Number(selectedSubjectId),
    );
  }, [grades, selectedSubjectId]);

  const averageGrade = useMemo(() => {
    if (filteredGrades.length === 0) {
      return "0.00";
    }

    const total = filteredGrades.reduce(
      (sum, grade) => sum + Number(grade.value),
      0,
    );

    return (total / filteredGrades.length).toFixed(2);
  }, [filteredGrades]);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const [studentsData, subjectsData] = await Promise.all([
        studentService.getAll(),
        subjectService.getAll(),
      ]);

      setStudents(studentsData);
      setSubjects(subjectsData);
    } catch (error) {
      console.error(error);
      setErrorMessage("Error al cargar estudiantes y materias.");
    } finally {
      setLoading(false);
    }
  };

  const loadGradesByStudent = async (studentId: string) => {
    if (!studentId) {
      setGrades([]);
      return;
    }

    try {
      setLoading(true);
      setErrorMessage("");

      const data = await gradeService.getByStudent(Number(studentId));
      setGrades(data);
    } catch (error) {
      console.error(error);
      setErrorMessage(
        "Error al cargar las calificaciones para el estudiante seleccionado.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }));
  };

  const handleSelectedStudentChange = async (
    event: ChangeEvent<HTMLSelectElement>,
  ) => {
    const studentId = event.target.value;

    setSelectedStudentId(studentId);
    setSelectedSubjectId("");
    setSuccessMessage("");
    await loadGradesByStudent(studentId);
  };

  const handleSelectedSubjectChange = (
    event: ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedSubjectId(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    if (!formData.studentId || !formData.subjectId || !formData.value) {
      setErrorMessage(
        "Se requieren estudiante, materia y valor de la calificación.",
      );
      return;
    }

    const numericValue = Number(formData.value);

    if (Number.isNaN(numericValue) || numericValue < 0 || numericValue > 5) {
      setErrorMessage(
        "El valor de la calificación debe ser un número entre 0 y 5.",
      );
      return;
    }

    try {
      setLoading(true);

      const registeredStudentId = formData.studentId;
      const registeredSubjectId = formData.subjectId;

      await gradeService.create({
        studentId: Number(registeredStudentId),
        subjectId: Number(registeredSubjectId),
        value: numericValue,
      });

      setSuccessMessage("La calificación fue registrada correctamente.");

      setSelectedStudentId(registeredStudentId);
      setSelectedSubjectId(registeredSubjectId);

      await loadGradesByStudent(registeredStudentId);

      setFormData({
        studentId: registeredStudentId,
        subjectId: "",
        value: "",
      });
    } catch (error) {
      console.error(error);
      setErrorMessage("Error al registrar la calificación.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="grades-page">
      <header className="grades-hero">
        <div>
          <span className="grades-eyebrow">Gestión académica</span>

          <h1>Calificaciones</h1>

          <p>
            Registra y consulta calificaciones de estudiantes por materia,
            manteniendo una vista clara del desempeño académico.
          </p>
        </div>

        <div className="grades-hero__summary">
          <FontAwesomeIcon
            icon={faGraduationCap}
            className="grades-summary-icon"
          />

          <strong>{filteredGrades.length}</strong>

          <span>Calificaciones visibles</span>
        </div>
      </header>

      {errorMessage && <div className="alert alert--error">{errorMessage}</div>}

      {successMessage && (
        <div className="grades-feedback grades-feedback--success">
          <FontAwesomeIcon icon={faCircleCheck} />
          <span>{successMessage}</span>
        </div>
      )}

      <form className="grades-form-card" onSubmit={handleSubmit}>
        <div className="grades-card-header">
          <div>
            <span className="grades-eyebrow">Formulario</span>

            <h2>Registrar calificación</h2>
          </div>

          <div className="grades-card-header__icon">
            <FontAwesomeIcon icon={faClipboardList} />
          </div>
        </div>

        <div className="grades-form-grid">
          <div className="grades-form-field">
            <label htmlFor="studentId">Estudiante</label>
            <select
              id="studentId"
              name="studentId"
              value={formData.studentId}
              onChange={handleInputChange}
              required
            >
              <option value="">Selecciona un estudiante</option>
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.firstName} {student.lastName}
                </option>
              ))}
            </select>
          </div>

          <div className="grades-form-field">
            <label htmlFor="subjectId">Materia</label>
            <select
              id="subjectId"
              name="subjectId"
              value={formData.subjectId}
              onChange={handleInputChange}
              required
            >
              <option value="">Selecciona una materia</option>
              {subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name} ({subject.code})
                </option>
              ))}
            </select>
          </div>

          <div className="grades-form-field">
            <label htmlFor="value">Valor de la calificación</label>
            <input
              id="value"
              name="value"
              type="number"
              min="0"
              max="5"
              step="0.1"
              placeholder="Ej: 4.5"
              value={formData.value}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="grades-form-actions">
          <button type="submit" disabled={loading}>
            {loading ? "Registrando..." : "Registrar calificación"}
          </button>
        </div>
      </form>

      <div className="grades-table-card">
        <div className="grades-card-header">
          <div>
            <span className="grades-eyebrow">Consulta</span>

            <h2>Calificaciones por estudiante y materia</h2>
          </div>

          {loading && <span className="grades-loading">Cargando...</span>}
        </div>

        <div className="grades-filter-panel">
          <div className="grades-filter-panel__header">
            <FontAwesomeIcon icon={faFilter} />
            <span>Filtros de búsqueda</span>
          </div>

          <div className="grades-filters-grid">
            <div className="grades-form-field">
              <label htmlFor="selectedStudentId">
                Estudiante para listar calificaciones
              </label>
              <select
                id="selectedStudentId"
                value={selectedStudentId}
                onChange={handleSelectedStudentChange}
              >
                <option value="">Selecciona un estudiante</option>
                {students.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.firstName} {student.lastName}
                  </option>
                ))}
              </select>
            </div>

            <div className="grades-form-field">
              <label htmlFor="selectedSubjectId">Filtrar por materia</label>
              <select
                id="selectedSubjectId"
                value={selectedSubjectId}
                onChange={handleSelectedSubjectChange}
                disabled={!selectedStudentId}
              >
                <option value="">Todas las materias</option>
                {subjects.map((subject) => (
                  <option key={subject.id} value={subject.id}>
                    {subject.name} ({subject.code})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grades-stats-row">
          <article>
            <span>Resultados</span>
            <strong>{filteredGrades.length}</strong>
          </article>

          <article>
            <span>Promedio visible</span>
            <strong>{averageGrade}</strong>
          </article>

          <article>
            <span>Materias disponibles</span>
            <strong>{subjects.length}</strong>
          </article>
        </div>

        <div className="grades-table-wrapper">
          <table className="grades-table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Estudiante</th>
                <th>Materia</th>
                <th>Calificación</th>
                <th>Fecha de registro</th>
              </tr>
            </thead>

            <tbody>
              {filteredGrades.length === 0 && !loading ? (
                <tr>
                  <td colSpan={5} className="grades-empty-state">
                    No se encontraron calificaciones para los filtros
                    seleccionados.
                  </td>
                </tr>
              ) : (
                filteredGrades.map((grade) => (
                  <tr key={grade.id}>
                    <td>{grade.id}</td>
                    <td>
                      {grade.student.firstName} {grade.student.lastName}
                    </td>
                    <td>
                      <span className="grades-subject-pill">
                        <FontAwesomeIcon icon={faBookOpen} />
                        {grade.subject.name} ({grade.subject.code})
                      </span>
                    </td>
                    <td>
                      <span className="grades-value-pill">{grade.value}</span>
                    </td>
                    <td>{grade.registrationDate}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
