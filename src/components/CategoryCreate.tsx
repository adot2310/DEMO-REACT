import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, message } from "antd";
import axios from "axios";

function CategoryCreate() {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  // Hàm gửi yêu cầu API để tạo danh mục
  const addCategory = async (values: any) => {
    return await axios.post("http://localhost:3001/categories", values);
  };

  // Mutation hook để thực hiện tạo danh mục
  const { mutate } = useMutation({
    mutationFn: addCategory,
    onSuccess: () => {
      message.success("Tạo danh mục thành công");
      // Invalidate cache của query "categories" để refresh dữ liệu
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      form.resetFields(); // Reset form sau khi thành công
    },
    onError: () => {
      message.error("Tạo danh mục thất bại");
    },
  });

  // Hàm xử lý submit form
  const handleSubmit = (values: any) => {
    mutate(values); // Gọi mutate để thực hiện tạo danh mục
  };

  return (
    <div className="mt-6 max-w-[1200px] mx-auto px-6">
      <h1 className="text-3xl font-bold text-center">Tạo danh mục</h1>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Tên danh mục *"
          name="name"
          rules={[
            { required: true, message: "Tên danh mục là bắt buộc" },
            { min: 3, message: "Tên phải dài ít nhất 3 ký tự" },
          ]}
        >
          <Input />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Tạo
        </Button>
      </Form>
    </div>
  );
}

export default CategoryCreate;