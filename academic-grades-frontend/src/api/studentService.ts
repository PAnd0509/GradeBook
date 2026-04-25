import apiClient from "./apiClient";
import type { Student } from "../types/Student";

export type CreateStudentRequest = {
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
};

export type UpdateStudentRequest = CreateStudentRequest;

const STUDENTS_ENDPOINT = "/students";

export const studentService = {
  getAll: async (): Promise<Student[]> => {
    const response = await apiClient.get<Student[]>(STUDENTS_ENDPOINT);
    return response.data;
  },

  getById: async (id: number): Promise<Student> => {
    const response = await apiClient.get<Student>(`${STUDENTS_ENDPOINT}/${id}`);
    return response.data;
  },

  create: async (student: CreateStudentRequest): Promise<Student> => {
    const response = await apiClient.post<Student>(STUDENTS_ENDPOINT, student);
    return response.data;
  },

  update: async (
    id: number,
    student: UpdateStudentRequest
  ): Promise<Student> => {
    const response = await apiClient.put<Student>(
      `${STUDENTS_ENDPOINT}/${id}`,
      student
    );
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`${STUDENTS_ENDPOINT}/${id}`);
  },
};