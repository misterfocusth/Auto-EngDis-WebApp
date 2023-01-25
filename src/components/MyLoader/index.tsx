import { Loader } from "@mantine/core";
import react from "react";

export const MyLoader: React.FC = () => {
  return (
    <div className="w-full h-full flex items-center justify-center py-28">
      <Loader color="orange" />
    </div>
  );
};
