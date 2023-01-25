import { Alert, Avatar, Button, Progress } from "@mantine/core";
import { useState, useContext, useEffect } from "react";
import { CheckCircle, Lock, Logout } from "@mui/icons-material";
import { StudentContext } from "../../contexts/studentContext";
import { StudentContextType } from "../../@types/student";
import { useNavigate } from "react-router-dom";
import { Constants } from "../../constants/constants";
import axios from "axios";
import { MyLoader } from "../../components/MyLoader";

export const HomePage: React.FC = () => {
  const { studentData, deleteStudentData } = useContext(StudentContext) as StudentContextType;
  const navigate = useNavigate();

  const [defaultCourseProgress, setDefaultCourseProgress] = useState<any[any]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getGetDefaultCourseProgress() {
      axios({
        method: "post",
        url: `${Constants.BASE_API_ENDPOINT}/apis/CourseTree/GetDefaultCourseProgress`,
        data: {
          token: studentData!.token,
        },
      })
        .then((response) => {
          console.log(response.data);
          setDefaultCourseProgress(response.data);
          setIsLoading(false);

          console.log(defaultCourseProgress.CourseProgressTree.Progress);

          defaultCourseProgress.CourseProgressTree.Children.map((data: any, index: any) => {
            console.log(data.Progress);
          });
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }
    getGetDefaultCourseProgress();
  }, []);

  if (isLoading) {
    return <MyLoader />;
  }

  return (
    <div className="p-4 mb-8">
      <div>
        <Alert title="จัดทำขึ้นเพื่อการศึกษาเท่านั้น !" color="orange" radius="md">
          บริการ Auto EngDis จัดทำขึ้นเพื่อการศึกษาเท่านั้น
          โปรดทำแบบฝึกหัดและทบทวนบทเรียนอย่างสม่ำเสมอ เพื่อผลประโยชน์สูงสุดของนักศึกษา
        </Alert>
      </div>

      <div>
        <p className="text-lg font-bold text-center mt-4">Foundation English 2</p>
        <p className="font-medium text-center text-sm text-slate-600">
          ({defaultCourseProgress.CourseProgressTree.Name})
        </p>
      </div>

      <div>
        <div className="p-4 shadow border rounded-md mt-4">
          <p className="text-sm font-bold">Overall Course Progress</p>
          <div className="flex items-center justify-between mt-1">
            <Progress
              className="w-10/12"
              color="orange"
              radius="md"
              animate
              value={defaultCourseProgress.CourseProgressTree.Progress * 100}
            />
            <p className="font-bold text-sm">
              {Math.floor(defaultCourseProgress.CourseProgressTree.Progress * 100)} %
            </p>
          </div>
          <p className="font-bold text-sm mt-1">
            คะแนนเฉลี่ยรวมทั้งหมด (Grade):{" "}
            {defaultCourseProgress.CourseProgressTree.Grade + " %" || "-"}
          </p>
        </div>
      </div>

      <div>
        <div className="mt-4 p-1">
          <p className="text-base font-bold">Units - บทเรียน</p>
          <p className="text-sm text-slate-600 mt-1">
            บทเรียนทั้งหมดในรายวิชา Foundation English 2 และความคืบหน้าของเแต่ละบทเรียน
            สามารถกดที่บทเรียนนั้นๆ เพื่อดูรายละเอียดเพิ่มเติม
          </p>
        </div>

        <div className="mt-4">
          {defaultCourseProgress.CourseProgressTree.Children.map((data: any, index: any) => (
            <div
              key={index}
              onClick={() => {
                const nodeId = defaultCourseProgress.CourseProgressTree.Children[index].NodeId;
                const parentNodeId =
                  defaultCourseProgress.CourseProgressTree.Children[index].ParentNodeId;
                navigate(`/course/${nodeId}/${parentNodeId}`);
              }}
            >
              <div className="p-3 shadow border rounded-lg mt-4">
                <div className="flex gap-1 items-center">
                  {data.IsLocked && !data.IsDone ? (
                    <Lock fontSize="small" style={{ color: "ef4444" }} />
                  ) : (
                    <></>
                  )}

                  {data.IsDone ? (
                    <CheckCircle fontSize="small" style={{ color: "22c555" }} />
                  ) : (
                    <></>
                  )}
                  <p className="text-sm font-bold">
                    Unit {index + 1}: {data.Name}
                  </p>
                </div>

                {/* <div className="p-1 text-xs font-bold">
                  {data.Children.map((lesson: any, index: any) => (
                    <li className="text-xs font-medium">Lesson: {lesson.Name}</li>
                  ))}
                  <li className="">บทเรียนยังเปิดให้ทำได้ตามปกติ (ยังไม่ล็อก)</li>
                  
                </div> */}

                {data.IsLocked && !data.IsDone ? (
                  <p className="font-bold text-red-500 text-xs mt-1">
                    {" "}
                    บทเรียนถูกล็อก / หมดช่วงเวลาที่เปิดให้ทำแล้ว
                  </p>
                ) : (
                  <></>
                )}

                {data.IsDone ? (
                  <p className="font-bold text-green-500 text-xs mt-1">
                    {" "}
                    บทเรียนนี้ทำแบบฝึกหัด และแบบทดสอบท้ายบทครบแล้ว
                  </p>
                ) : (
                  <></>
                )}

                <div className="flex items-center justify-between mt-1">
                  <Progress
                    className="w-10/12"
                    color="orange"
                    radius="md"
                    animate
                    value={data.Progress * 100}
                  />
                  <p className="font-bold text-sm">{Math.floor(data.Progress * 100)} %</p>
                </div>

                {/* <p className="text-sm mt-1">
                  เกรดรวมทั้งหมดของบทเรียนนี้ (Grade):{" "}
                  <span>
                    {defaultCourseProgress.CourseProgressTree.Children[index].Grade || "-"}
                  </span>
                </p> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
