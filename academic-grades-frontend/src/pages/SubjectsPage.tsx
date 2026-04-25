import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpen,
  faCircleCheck,
  faLayerGroup,
  faPenToSquare,
  faTrashCan,
  faTriangleExclamation,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import {
  subjectService,
  type CreateSubjectRequest,
} from "../api/subjectService";
import type { Subject } from "../types/Subject";
import "../styles/pages/subjects.scss";

const initialFormState: CreateSubjectRequest = {
  name: "",
  code: "",
  credits: 0,
};

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [formData, setFormData] =
    useState<CreateSubjectRequest>(initialFormState);

  const [editingSubjectId, setEditingSubjectId] = useState<number | null>(null);
  const [subjectToDelete, setSubjectToDelete] = useState<Subject | null>(null);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const loadSubjects = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const data = await subjectService.getAll();
      setSubjects(data);
    } catch (error) {
      console.error(error);
      setErrorMessage(
        "Error al cargar las materias. Verifica si el backend está en ejecución.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSubjects();
  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: name === "credits" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setLoading(true);
      setErrorMessage("");
      setSuccessMessage("");

      if (editingSubjectId === null) {
        await subjectService.create(formData);
      } else {
        await subjectService.update(editingSubjectId, formData);
      }

      setFormData(initialFormState);
      setEditingSubjectId(null);
      await loadSubjects();
    } catch (error) {
      console.error(error);
      setErrorMessage("Error al guardar la materia.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (subject: Subject) => {
    setSuccessMessage("");
    setErrorMessage("");
    setEditingSubjectId(subject.id);

    setFormData({
      name: subject.name,
      code: subject.code,
      credits: subject.credits,
    });
  };

  const handleCancelEdit = () => {
    setEditingSubjectId(null);
    setFormData(initialFormState);
  };

  const handleOpenDeleteModal = (subject: Subject) => {
    setErrorMessage("");
    setSuccessMessage("");
    setSubjectToDelete(subject);
  };

  const handleCloseDeleteModal = () => {
    if (loading) return;
    setSubjectToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!subjectToDelete) return;

    try {
      setLoading(true);
      setErrorMessage("");
      setSuccessMessage("");

      await subjectService.delete(subjectToDelete.id);

      setSuccessMessage(
        `La materia ${subjectToDelete.name} fue eliminada correctamente.`,
      );

      setSubjectToDelete(null);
      await loadSubjects();
    } catch (error) {
      console.error(error);
      setErrorMessage("Error al eliminar la materia.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="subjects-page">
      <header className="subjects-hero">
        <div>
          <span className="subjects-eyebrow">Gestión académica</span>

          <h1>Materias</h1>

          <p>
            Administra las asignaturas disponibles, sus códigos académicos y la
            cantidad de créditos asociados.
          </p>
        </div>

        <div className="subjects-hero__summary">
          <FontAwesomeIcon
            icon={faBookOpen}
            className="subjects-summary-icon"
          />

          <strong>{subjects.length}</strong>

          <span>Materias registradas</span>
        </div>
      </header>

      {errorMessage && <div className="alert alert--error">{errorMessage}</div>}

      {successMessage && (
        <div className="subjects-feedback subjects-feedback--success">
          <FontAwesomeIcon icon={faCircleCheck} />
          <span>{successMessage}</span>
        </div>
      )}

      <form className="subjects-form-card" onSubmit={handleSubmit}>
        <div className="subjects-card-header">
          <div>
            <span className="subjects-eyebrow">Formulario</span>

            <h2>
              {editingSubjectId === null ? "Crear materia" : "Editar materia"}
            </h2>
          </div>

          <div className="subjects-card-header__icon">
            <FontAwesomeIcon icon={faLayerGroup} />
          </div>
        </div>

        <div className="subjects-form-grid">
          <div className="subjects-form-field">
            <label htmlFor="name">Nombre de la materia</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Ej: Matemáticas"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="subjects-form-field">
            <label htmlFor="code">Código</label>
            <input
              id="code"
              name="code"
              type="text"
              placeholder="Ej: M01"
              value={formData.code}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="subjects-form-field">
            <label htmlFor="credits">Créditos</label>
            <input
              id="credits"
              name="credits"
              type="number"
              min="1"
              placeholder="Ej: 3"
              value={formData.credits}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="subjects-form-actions">
          <button type="submit" disabled={loading}>
            {editingSubjectId === null ? "Crear materia" : "Actualizar"}
          </button>

          {editingSubjectId !== null && (
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

      <div className="subjects-table-card">
        <div className="subjects-card-header">
          <div>
            <span className="subjects-eyebrow">Listado</span>

            <h2>Lista de materias</h2>
          </div>

          {loading && <span className="subjects-loading">Cargando...</span>}
        </div>

        <div className="subjects-table-wrapper">
          <table className="subjects-table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Código</th>
                <th>Créditos</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {subjects.length === 0 && !loading ? (
                <tr>
                  <td colSpan={5} className="subjects-empty-state">
                    No se encontraron materias registradas.
                  </td>
                </tr>
              ) : (
                subjects.map((subject) => (
                  <tr key={subject.id}>
                    <td>{subject.id}</td>
                    <td>{subject.name}</td>
                    <td>{subject.code}</td>
                    <td>{subject.credits}</td>
                    <td>
                      <div className="subjects-actions">
                        <button
                          type="button"
                          className="subjects-icon-button subjects-icon-button--edit"
                          onClick={() => handleEdit(subject)}
                          aria-label="Editar materia"
                          title="Editar materia"
                          disabled={loading}
                        >
                          <FontAwesomeIcon icon={faPenToSquare} />
                        </button>

                        <button
                          type="button"
                          className="subjects-icon-button subjects-icon-button--delete"
                          onClick={() => handleOpenDeleteModal(subject)}
                          aria-label="Eliminar materia"
                          title="Eliminar materia"
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

      {subjectToDelete && (
        <div className="subjects-modal-backdrop">
          <div
            className="subjects-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-subject-title"
          >
            <button
              type="button"
              className="subjects-modal__close"
              onClick={handleCloseDeleteModal}
              aria-label="Cerrar modal"
              disabled={loading}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>

            <div className="subjects-modal__icon">
              <FontAwesomeIcon icon={faTriangleExclamation} />
            </div>

            <h2 id="delete-subject-title">Eliminar materia</h2>

            <p>
              ¿Deseas eliminar la materia{" "}
              <strong>
                {subjectToDelete.name} ({subjectToDelete.code})
              </strong>
              ? Esta acción no se puede deshacer.
            </p>

            <div className="subjects-modal__actions">
              <button
                type="button"
                className="subjects-modal__cancel"
                onClick={handleCloseDeleteModal}
                disabled={loading}
              >
                Cancelar
              </button>

              <button
                type="button"
                className="subjects-modal__delete"
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
