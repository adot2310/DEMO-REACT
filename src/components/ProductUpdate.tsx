import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, InputNumber, message, Row, Col, Select } from "antd";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function ProductUpdate() {
  const { productId } = useParams();
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const [categories, setCategories] = useState<any[]>([]);

  // Fetch sản phẩm
  const fetchProduct = async () => {
    const res = await axios.get(`http://localhost:3001/products/${productId}`);
    return res.data;
  };

  // Fetch danh mục
  const fetchCategories = async () => {
    const res = await axios.get("http://localhost:3001/categories");
    setCategories(res.data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const updateProduct = async (values: any) => {
    return await axios.put(`http://localhost:3001/products/${productId}`, values);
  };

  const { data: product } = useQuery({
    queryKey: ["product", productId],
    queryFn: fetchProduct,
  });
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      message.success("Cập nhật sản phẩm thành công");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      navigate("/products")
    },
    onError: () => {
      message.error("Cập nhật sản phẩm thất bại");
    },
  });

  const handleSubmit = (values: any) => {
    mutate(values);
  };

  if (!product) return <div>Đang tải...</div>;

  return (
    <div className="mt-6 max-w-[800px] mx-auto px-6 py-8 bg-white rounded-lg shadow-md">
      <Form form={form} layout="vertical" onFinish={handleSubmit} initialValues={product}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Form.Item
              label="Tên Sản Phẩm *"
              name="name"
              rules={[
                { required: true, message: "Tên sản phẩm là bắt buộc" },
                { min: 3, message: "Tên sản phẩm phải dài hơn 3 ký tự" },
              ]}
            >
              <Input placeholder="Nhập tên sản phẩm" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Giá Sản Phẩm *"
              name="price"
              rules={[
                { required: true, message: "Giá sản phẩm là bắt buộc" },
                { type: "number", min: 1, message: "Giá sản phẩm phải lớn hơn 0" },
              ]}
            >
              <InputNumber
                style={{ width: "100%" }}
                min={1}
                placeholder="Nhập giá sản phẩm"
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Danh Mục *"
              name="categoryId"
              rules={[{ required: true, message: "Danh mục là bắt buộc" }]}
            >
              <Select placeholder="Chọn danh mục">
                {categories.map((category) => (
                  <Select.Option key={category.id} value={category.id}>
                    {category.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Hình Ảnh" name="image">
              <Input placeholder="Nhập đường dẫn hình ảnh" />
            </Form.Item>
          </Col>
        </Row>
        <div className="flex justify-center mt-4">
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="w-full sm:w-auto"
          >
            Cập nhật sản phẩm
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default ProductUpdate;
