import apiClient from "./apiClient";
import type { Grade } from "../types/Grade";

export type CreateGradeRequest = {
  value: number;
  studentId: number;
  subjectId: number;
};

const GRADES_ENDPOINT = "/grades";

export const gradeService = {
  create: async (grade: CreateGradeRequest): Promise<Grade> => {
    const response = await apiClient.post<Grade>(GRADES_ENDPOINT, grade);
    return response.data;
  },

  getByStudent: async (studentId: number): Promise<Grade[]> => {
    const response = await apiClient.get<Grade[]>(
      `${GRADES_ENDPOINT}/student/${studentId}`
    );
    return response.data;
  },
};