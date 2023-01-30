import { useContext, useState } from "react";

// Context
import { StudentContext } from "../../contexts/studentContext";

// React Router
import { useNavigate } from "react-router-dom";
import { StudentContextType } from "../../@types/student";

// Mantine Components
import { Alert, Button, PasswordInput, TextInput } from "@mantine/core";

// Material-UI Icons
import { LockOpen, PermIdentity } from "@mui/icons-material";
import { ILoginData } from "../../@types/loginData";

// Axios
import axios from "axios";
import { Constants } from "../../constants/constants";

// Sweetalert
import Swal from "sweetalert2";

export const LoginPage: React.FC = () => {
  const { studentData, saveStudentData } = useContext(StudentContext) as StudentContextType;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState<ILoginData>({
    username: "",
    password: "",
  });

  document.title = "Login | Auto English Discoveries Learning - KMITL";

  const handleStudentLogin = async () => {
    console.log(loginData);

    if (!loginData.username || !loginData.password) {
      return Swal.fire({
        icon: "error",
        iconColor: "#F97316",
        confirmButtonColor: "#F97316",
        title: "ไม่สามารถดำเนินการต่อได้",
        text: "โปรดกรอกชื่อผู้ใช้ (username) และรหัสผ่าน (password) เพื่อใช้ในการเข้าสู่ระบบ",
        confirmButtonText: "ตกลง",
      });
    }

    setIsLoading(true);

    await axios({
      method: "post",
      url: `${Constants.BASE_API_ENDPOINT}/apis/Auth/Login`,
      data: {
        password: loginData.password,
        username: loginData.username,
      },
    })
      .then((res) => {
        const { Token } = res.data.UserInfo;
        saveStudentData(loginData.username, loginData.password, Token);
        setIsLoading(false);
        navigate("/home");
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          iconColor: "#F97316",
          confirmButtonColor: "#F97316",
          title: "เข้าสู่ระบบไม่สำเร็จ",
          text: "ชื่อผู้ใช้ (username) หรือ รหัสผ่าน (password) ไม่ถูกต้อง หรือ ไม่ได้ลงทะเบียนในระบบ",
          confirmButtonText: "ตกลง",
        });
        setIsLoading(false);
      });
  };

  return (
    <div className="p-4">
      <div className="mt-2">
        <div>
          <p className="text-center text-xl font-bold mt-3">โปรดเข้าสู่ระบบ</p>
          <p className="mt-1 text-sm text-center text-gray-600">
            จำเป็นต้องเข้าสู่ระบบด้วย EngDis Account ที่นักศึกษาได้ลงทะเบียนในระบบ
            เพื่อดำเนินการต่อ...
          </p>
        </div>

        <div className="mt-3">
          <Alert title="เฉพาะนักศึกษา KMITL เท่านั้น !" color="orange" radius="md">
            บริการนี้รองรับการทำงานเฉพาะ English Discoveries (EngDis)
            ของนักศึกษาสถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง
            <div className="mt-4">
              <div className="flex items-center gap-1">
                <p className="font-bold text-sm">คำแนะนำในการใช้งานระบบ Auto EngDis</p>
              </div>

              <p className="text-sm mt-1">- เข้าสู่ระบบด้วย EngDis Account ของนักศึกษา สจล.</p>
              <p className="text-sm">- เลือกบทเรียนที่ต้องการทำให้ครบ 100 %</p>
              <p className="text-sm">- เลือกเนื้อหาย่อยภายในบทเรียนนั้น ๆ</p>
              <p className="text-sm">- จากนั้นรอระบบประมวลผลสักครู่</p>
            </div>
          </Alert>
        </div>

        <div className="p-4 border rounded-md shadow mt-6">
          <TextInput
            label="รหัสนักศึกษา (ไม่ต้องใส่ @KMITL.AC.TH)"
            description="ตัวอย่าง : 09090999"
            radius="md"
            withAsterisk
            icon={<PermIdentity fontSize="small" />}
            value={loginData.username}
            onChange={(event) =>
              setLoginData({ ...loginData, username: event.currentTarget.value })
            }
          />

          <PasswordInput
            className="mt-4"
            label="รหัสผ่านในการเข้าสู่ระบบ"
            description="ค่าเริ่มต้นคือรหัสนักศึกษา 5 ตัวสุดท้าย"
            radius="md"
            withAsterisk
            icon={<LockOpen fontSize="small" />}
            value={loginData.password}
            onChange={(event) =>
              setLoginData({ ...loginData, password: event.currentTarget.value })
            }
          />

          <div className="flex justify-around gap-4 mt-4">
            <Button
              radius="md"
              className="w-6/12 bg-white text-orange-600 hover:bg-orange-600 hover:text-white shadow"
              onClick={() =>
                window.open("https://ed20.engdis.com/thai#/login", "_blank", "noopener,noreferrer")
              }
            >
              EngDis เว็บไซต์
            </Button>
            <Button
              radius="md"
              className="w-6/12 bg-orange-500 hover:bg-orange-600 font-bold"
              onClick={handleStudentLogin}
              loading={isLoading}
            >
              เข้าสู่ระบบ
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
