import type { Student } from "./Student";
import type { Subject } from "./Subject";

export interface Grade {
  id: number;
  value: number;
  registrationDate: string;
  student: Student;
  subject: Subject;
}