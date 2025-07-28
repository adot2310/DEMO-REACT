import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, message } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";

function CategoryUpdate() {
  const { categoryId } = useParams();
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  // Fetch danh mục
  const fetchCategory = async () => {
    const res = await fetch(`http://localhost:3001/categories/${categoryId}`);
    return res.json();
  };

  const updateCategory = async (values: any) => {
    return await axios.put(`http://localhost:3001/categories/${categoryId}`, values);
  };

  const { data: category, isLoading } = useQuery({
    queryKey: ["category", categoryId],
    queryFn: fetchCategory,
  });

  const { mutate } = useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      message.success("Cập nhật danh mục thành công");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: () => {
      message.error("Cập nhật danh mục thất bại");
    },
  });

  const handleSubmit = (values: any) => {
    mutate(values);
  };

  if (isLoading) return <div>Đang tải...</div>;

  return (
    <div className="mt-6 max-w-[1200px] mx-auto px-6">
      <h1 className="text-3xl font-bold text-center">Cập nhật danh mục</h1>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={category}
      >
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

        {/* Thêm trường mô tả */}
        <Form.Item
          label="Mô tả"
          name="description"
          rules={[{ required: false, message: "Mô tả danh mục" }]}
        >
          <Input.TextArea placeholder="Nhập mô tả cho danh mục" />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Cập nhật
        </Button>
      </Form>
    </div>
  );
}

export default CategoryUpdate;
