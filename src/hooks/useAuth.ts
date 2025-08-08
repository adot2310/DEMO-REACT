import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const useAuth = (resource: string) => {
  const nav = useNavigate();

  const authUser = async (values: any) => {
    try {
      const res = await axios.post(`http://localhost:3000/${resource}`, values);
      return res.data;
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.message || "Đã có lỗi xảy ra");
      }
      throw new Error("Không thể kết nối đến server");
    }
  };

  const authMutation = useMutation({
    mutationFn: authUser,
    onSuccess: (data) => {
      message.success("Thành công");
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("user", JSON.stringify(data.user));
      resource === "register" ? nav("/login") : nav("/");
    },
    onError: (error: any) => {
      message.error(error.message || "Thất bại");
    },
  });

  return authMutation;
};
