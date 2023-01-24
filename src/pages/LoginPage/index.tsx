import react, { useContext } from "react";

// Context
import { StudentContext } from "../../contexts/studentContext";

// React Router
import { useNavigate } from "react-router-dom";
import { StudentContextType } from "../../@types/student";
import { ActionIcon, Alert, Button, PasswordInput, TextInput } from "@mantine/core";
import { IconAlertCircle, IconDatabase, IconLoader } from "@tabler/icons";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { LockOpen, PermIdentity, AutoFixHigh, Info } from "@mui/icons-material";

export const LoginPage: React.FC = () => {
  const { studentData, saveStudentData } = useContext(StudentContext) as StudentContextType;
  const navigate = useNavigate();

  const handleStudentLogin = () => {};

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
          <Alert title="เฉพาะนักศึกษา KMITL เท่านั้น !" color="orange">
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
            // error="โปรดใส่รหัสนักศึกษา"
            radius="md"
            withAsterisk
            icon={<PermIdentity fontSize="small" />}
          />

          <PasswordInput
            className="mt-4"
            label="รหัสผ่านในการเข้าสู่ระบบ"
            description="ค่าเริ่มต้นคือรหัสนักศึกษา 5 ตัวสุดท้าย"
            // error="โปรดใส่รหัสนักศึกษา"
            radius="md"
            withAsterisk
            icon={<LockOpen fontSize="small" />}
          />

          <div className="flex justify-around gap-4 mt-4">
            <Button radius="md" className="w-6/12 bg-white text-orange-600 shadow">
              EngDis เว็บไซต์
            </Button>
            <Button radius="md" className="w-6/12 bg-orange-500 active:bg-orange-600 font-bold">
              เข้าสู่ระบบ
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
