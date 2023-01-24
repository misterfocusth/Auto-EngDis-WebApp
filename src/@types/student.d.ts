export interface IStudent {
  username: String;
  password: String;
  token: String;
}

export type StudentContextType = {
  studentData: IStudent | null;
  saveStudentData: (username: String, password: String, token: String) => void;
  deleteStudentData: () => void;
};
