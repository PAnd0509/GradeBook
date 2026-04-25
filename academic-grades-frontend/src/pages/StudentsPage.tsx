import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faPenToSquare,
  faTrashCan,
  faTriangleExclamation,
  faUserPlus,
  faUsers,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import {
  studentService,
  type CreateStudentRequest,
} from "../api/studentService";
import type { Student } from "../types/Student";
import "../styles/pages/students.scss";

const initialFormState: CreateStudentRequest = {
  firstName: "",
  lastName: "",
  email: "",
  birthDate: "",
};

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [formData, setFormData] =
    useState<CreateStudentRequest>(initialFormState);

  const [editingStudentId, setEditingStudentId] = useState<number | null>(null);
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const loadStudents = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const data = await studentService.getAll();
      setStudents(data);
    } catch (error) {
      console.error(error);
      setErrorMessage(
        "Error al cargar los estudiantes. Verifica si el backend está en ejecución.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setLoading(true);
      setErrorMessage("");
      setSuccessMessage("");

      if (editingStudentId === null) {
        await studentService.create(formData);
      } else {
        await studentService.update(editingStudentId, formData);
      }

      setFormData(initialFormState);
      setEditingStudentId(null);
      await loadStudents();
    } catch (error) {
      console.error(error);
      setErrorMessage("Error al guardar el estudiante.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (student: Student) => {
    setSuccessMessage("");
    setErrorMessage("");
    setEditingStudentId(student.id);

    setFormData({
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      birthDate: student.birthDate,
    });
  };

  const handleCancelEdit = () => {
    setEditingStudentId(null);
    setFormData(initialFormState);
  };

  const handleOpenDeleteModal = (student: Student) => {
    setErrorMessage("");
    setSuccessMessage("");
    setStudentToDelete(student);
  };

  const handleCloseDeleteModal = () => {
    if (loading) return;
    setStudentToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!studentToDelete) return;

    try {
      setLoading(true);
      setErrorMessage("");
      setSuccessMessage("");

      await studentService.delete(studentToDelete.id);

      setSuccessMessage(
        `El estudiante ${studentToDelete.firstName} ${studentToDelete.lastName} fue eliminado correctamente.`,
      );

      setStudentToDelete(null);
      await loadStudents();
    } catch (error) {
      console.error(error);
      setErrorMessage("Error al eliminar el estudiante.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="students-page">
      <header className="students-hero">
        <div>
          <span className="students-eyebrow">Gestión académica</span>

          <h1>Estudiantes</h1>

          <p>
            Administra la información de los estudiantes registrados en el
            sistema académico.
          </p>
        </div>

        <div className="students-hero__summary">
          <FontAwesomeIcon icon={faUsers} className="students-summary-icon" />

          <strong>{students.length}</strong>

          <span>Estudiantes registrados</span>
        </div>
      </header>

      {errorMessage && <div className="alert alert--error">{errorMessage}</div>}

      {successMessage && (
        <div className="students-feedback students-feedback--success">
          <FontAwesomeIcon icon={faCircleCheck} />
          <span>{successMessage}</span>
        </div>
      )}

      <form className="students-form-card" onSubmit={handleSubmit}>
        <div className="students-card-header">
          <div>
            <span className="students-eyebrow">Formulario</span>

            <h2>
              {editingStudentId === null
                ? "Crear estudiante"
                : "Editar estudiante"}
            </h2>
          </div>

          <div className="students-card-header__icon">
            <FontAwesomeIcon icon={faUserPlus} />
          </div>
        </div>

        <div className="students-form-grid">
          <div className="students-form-field">
            <label htmlFor="firstName">Nombre</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              placeholder="Ej: Juan"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="students-form-field">
            <label htmlFor="lastName">Apellido</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Ej: Pérez"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="students-form-field">
            <label htmlFor="email">Correo electrónico</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Ej: estudiante@email.com"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="students-form-field">
            <label htmlFor="birthDate">Fecha de nacimiento</label>
            <input
              id="birthDate"
              name="birthDate"
              type="date"
              value={formData.birthDate}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="students-form-actions">
          <button type="submit" disabled={loading}>
            {editingStudentId === null ? "Crear estudiante" : "Actualizar"}
          </button>

          {editingStudentId !== null && (
            <button
              type="button"
              className="button-secondary"
              onClick={handleCancelEdit}
              disabled={loading}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      <div className="students-table-card">
        <div className="students-card-header">
          <div>
            <span className="students-eyebrow">Listado</span>

            <h2>Lista de estudiantes</h2>
          </div>

          {loading && <span className="students-loading">Cargando...</span>}
        </div>

        <div className="students-table-wrapper">
          <table className="students-table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Correo electrónico</th>
                <th>Fecha de nacimiento</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {students.length === 0 && !loading ? (
                <tr>
                  <td colSpan={6} className="students-empty-state">
                    No se encontraron estudiantes registrados.
                  </td>
                </tr>
              ) : (
                students.map((student) => (
                  <tr key={student.id}>
                    <td>{student.id}</td>
                    <td>{student.firstName}</td>
                    <td>{student.lastName}</td>
                    <td>{student.email}</td>
                    <td>{student.birthDate}</td>
                    <td>
                      <div className="students-actions">
                        <button
                          type="button"
                          className="students-icon-button students-icon-button--edit"
                          onClick={() => handleEdit(student)}
                          aria-label="Editar estudiante"
                          title="Editar estudiante"
                          disabled={loading}
                        >
                          <FontAwesomeIcon icon={faPenToSquare} />
                        </button>

                        <button
                          type="button"
                          className="students-icon-button students-icon-button--delete"
                          onClick={() => handleOpenDeleteModal(student)}
                          aria-label="Eliminar estudiante"
                          title="Eliminar estudiante"
                          disabled={loading}
                        >
                          <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {studentToDelete && (
        <div className="students-modal-backdrop">
          <div
            className="students-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-student-title"
          >
            <button
              type="button"
              className="students-modal__close"
              onClick={handleCloseDeleteModal}
              aria-label="Cerrar modal"
              disabled={loading}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>

            <div className="students-modal__icon">
              <FontAwesomeIcon icon={faTriangleExclamation} />
            </div>

            <h2 id="delete-student-title">Eliminar estudiante</h2>

            <p>
              ¿Deseas eliminar a{" "}
              <strong>
                {studentToDelete.firstName} {studentToDelete.lastName}
              </strong>
              ? Esta acción no se puede deshacer.
            </p>

            <div className="students-modal__actions">
              <button
                type="button"
                className="students-modal__cancel"
                onClick={handleCloseDeleteModal}
                disabled={loading}
              >
                Cancelar
              </button>

              <button
                type="button"
                className="students-modal__delete"
                onClick={handleConfirmDelete}
                disabled={loading}
              >
                {loading ? "Eliminando..." : "Sí, eliminar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
