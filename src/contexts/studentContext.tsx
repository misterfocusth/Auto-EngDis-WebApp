import React from "react";
import { IStudent, StudentContextType } from "../@types/student";
interface Props {
  children: React.ReactNode;
}

export const StudentContext = React.createContext<StudentContextType | null>(null);

const StudentContextProvider: React.FC<Props> = ({ children }) => {
  const [studentData, setStudentData] = React.useState<IStudent | null>(null);

  const saveStudentData = (username: String, password: String, token: String) => {
    const newStudentData: IStudent = {
      username: username,
      password: password,
      token: token,
    };
    setStudentData(newStudentData);
  };

  const deleteStudentData = () => {
    setStudentData(null);
  };

  return (
    <StudentContext.Provider value={{ studentData, saveStudentData, deleteStudentData }}>
      {children}
    </StudentContext.Provider>
  );
};

export default StudentContextProvider;
