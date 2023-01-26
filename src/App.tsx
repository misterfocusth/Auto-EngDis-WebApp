import { useEffect, useState, useContext } from "react";
// import "./App.css";

// React Router
import { Route, Routes, useNavigate } from "react-router-dom";

// Context
import { StudentContext } from "./contexts/studentContext";

// Types
import { StudentContextType } from "./@types/student";
import { LoginPage } from "./pages/LoginPage";

// Icons
import { AutoFixHigh, Logout } from "@mui/icons-material";
import { HomePage } from "./pages/HomePage";
import { CoursePage } from "./pages/CoursePage";
import { Constants } from "./constants/constants";

// Axios
import axios from "axios";
import { Avatar, Button } from "@mantine/core";

function App() {
  const [count, setCount] = useState(0);
  const { studentData, deleteStudentData } = useContext(StudentContext) as StudentContextType;

  // React Router
  const navigate = useNavigate();

  const handleStudentLogout = () => {
    if (confirm("ต้องการออกจากระบบ ?")) {
      axios({
        method: "post",
        url: `${Constants.BASE_API_ENDPOINT}/apis/Auth/Logout`,
        data: {
          token: studentData!.token,
        },
      })
        .then((response) => {
          deleteStudentData();
          navigate("/login");
        })
        .catch((error) => console.log(error));
    }
  };

  useEffect(() => {
    if (!studentData && window.location.pathname != "/login") {
      navigate("/login");
    }
  }, [window.location.pathname]);

  return (
    <div>
      <div className="shadow-md">
        <div className="flex items-center p-4" onClick={() => navigate("/home")}>
          <div>
            <AutoFixHigh fontSize="large" />
          </div>
          <div className="font-bold ml-3 text-sm">
            <p>Auto English Discoveries (EngDis)</p>
            <p className="text-xs text-orange-600">
              King Monkut's Institute of Technology Ladkrabang
            </p>
          </div>
        </div>
      </div>

      {studentData ? (
        <div className="flex items-center justify-between p-4 pb-0">
          <div className="flex items-center">
            <Avatar radius="xl" />
            <p className="ml-1 font-bold text-sm">รหัสนักศึกษา</p>
            <p className="ml-1 font-bold text-sm">{studentData?.username}</p>
          </div>

          <Button
            radius="md"
            className="shadow rounded-md bg-white text-orange-500 hover:bg-orange-600 hover:text-white"
            leftIcon={<Logout fontSize="small" />}
            onClick={handleStudentLogout}
          >
            ออกจากระบบ
          </Button>
        </div>
      ) : (
        <></>
      )}

      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="home" element={<HomePage />} />
        <Route path="/course/:nodeId/:parentNodeId" element={<CoursePage />} />
      </Routes>

      <div className=" border-t p-4">
        <p className="text-xs text-center">
          Develop with ❤️ in School of Information Technology, KMITL
        </p>
        <p className="text-xs text-center">
          by{" "}
          <span className="underline">
            <a href="https://github.com/misterfocusth">@misterfocusth</a> (IT20 KMITL)
          </span>
          {" & "}
          <span className="underline">
            <a href="https://github.com/FewPz">@fewpz</a> (IT20 KMITL)
          </span>
        </p>
      </div>
    </div>
  );
}

export default App;
