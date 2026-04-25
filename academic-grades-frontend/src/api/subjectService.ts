import apiClient from "./apiClient";
import type { Subject } from "../types/Subject";

export type CreateSubjectRequest = {
  name: string;
  code: string;
  credits: number;
};

export type UpdateSubjectRequest = CreateSubjectRequest;

const SUBJECTS_ENDPOINT = "/subjects";

export const subjectService = {
  getAll: async (): Promise<Subject[]> => {
    const response = await apiClient.get<Subject[]>(SUBJECTS_ENDPOINT);
    return response.data;
  },

  getById: async (id: number): Promise<Subject> => {
    const response = await apiClient.get<Subject>(`${SUBJECTS_ENDPOINT}/${id}`);
    return response.data;
  },

  create: async (subject: CreateSubjectRequest): Promise<Subject> => {
    const response = await apiClient.post<Subject>(SUBJECTS_ENDPOINT, subject);
    return response.data;
  },

  update: async (
    id: number,
    subject: UpdateSubjectRequest
  ): Promise<Subject> => {
    const response = await apiClient.put<Subject>(
      `${SUBJECTS_ENDPOINT}/${id}`,
      subject
    );
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`${SUBJECTS_ENDPOINT}/${id}`);
  },
};