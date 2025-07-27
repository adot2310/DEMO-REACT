import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, message } from "antd";
import axios from "axios";

function CategoryCreate() {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const addCategory = async (values: any) => {
    return await axios.post("http://localhost:3001/categories", values);
  };

  const { mutate } = useMutation({
    mutationFn: addCategory,
    onSuccess: () => {
      message.success("Tạo danh mục thành công");
      // Invalidate cache của query "categories" để refresh dữ liệu
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      form.resetFields();
    },
    onError: () => {
      message.error("Tạo danh mục thất bại");
    },
  });

  const handleSubmit = (values: any) => {
    mutate(values);
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