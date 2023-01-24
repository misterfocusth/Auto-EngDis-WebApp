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
import { AutoFixHigh } from "@mui/icons-material";

function App() {
  const [count, setCount] = useState(0);
  const { studentData } = useContext(StudentContext) as StudentContextType;

  // React Router
  const navigate = useNavigate();

  useEffect(() => {
    if (!studentData && window.location.pathname != "/login") {
      navigate("/login");
    }
  }, [window.location.pathname]);

  return (
    <div>
      <div className="shadow-md">
        <div className="flex items-center p-4">
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

      <Routes>
        <Route path="login" element={<LoginPage />} />
      </Routes>

      <div className=" border-t p-4">
        <p className="text-xs text-center">
          Develop with ❤️ in School of Information Technology, KMITL by{" "}
          <span className="underline">
            <a href="">@misterfocusth</a> (IT20 KMITL)
          </span>
        </p>
      </div>
    </div>
  );
}

export default App;
