import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, InputNumber, message } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";

function ProductUpdate() {
  const { productId } = useParams();
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const fetchProduct = async () => {
    const res = await fetch(`http://localhost:3001/products/${productId}`);
    return res.json();
  };

  const updateProduct = async (values: any) => {
    return await axios.put(`http://localhost:3001/products/${productId}`, values);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["product", productId],
    queryFn: fetchProduct,
  });

  const { mutate } = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      message.success("Cập nhật sản phẩm thành công");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => {
      message.error("Cập nhật sản phẩm thất bại");
    },
  });

  if (isLoading) return <div>Đang tải...</div>;

  return (
    <div className="mt-6 max-w-[1200px] mx-auto px-6">
      <h1 className="text-3xl font-bold text-center">CẬP NHẬT SẢN PHẨM</h1>
      <Form
        form={form}
        layout="vertical"
        onFinish={mutate}
        initialValues={data}
      >
        <Form.Item
          label="Tên sản phẩm *"
          name="name"
          rules={[
            { required: true, message: "Tên sản phẩm là bắt buộc" },
            { min: 3, message: "Tên phải dài ít nhất 3 ký tự" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Giá sản phẩm *"
          name="price"
          rules={[
            { required: true, message: "Giá là bắt buộc" },
            { type: "number", min: 0, message: "Giá phải là số không âm" },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="Hình ảnh"
          name="image"
          rules={[{ type: "url", message: "Vui lòng nhập URL hợp lệ" }]}
        >
          <Input type="text" />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Cập nhật
        </Button>
      </Form>
    </div>
  );
}

export default ProductUpdate;