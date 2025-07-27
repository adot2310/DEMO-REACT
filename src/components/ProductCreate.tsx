import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input, InputNumber, message, Row, Col } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ProductCreate() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const addProduct = async (values: any) => {
    return await axios.post("http://localhost:3001/products", values);
  };

  const { mutate } = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      message.success("Tạo sản phẩm thành công!");
      navigate("/products");
    },
    onError: () => {
      message.error("Có lỗi xảy ra khi tạo sản phẩm.");
    },
  });

  const handleSubmit = async (values: any) => {
    mutate(values);
  };

  return (
    <div className="mt-6 max-w-[800px] mx-auto px-6 py-8 bg-white rounded-lg shadow-md">
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
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
            Add Product
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default ProductCreate;
