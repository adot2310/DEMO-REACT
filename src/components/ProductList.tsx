import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Image, Spin, Table, Button, message } from "antd";
import Header from "./Header";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

function ProductList() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const name = searchParams.get("name");

  const fetchProducts = async () => {
    const res = await fetch(
      `http://localhost:3001/products?name_like=${name || ""}`
    );
    return res.json();
  };

  const deleteProduct = async (id: number) => {
    await axios.delete(`http://localhost:3001/products/${id}`);
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["products", name],
    queryFn: fetchProducts,
  });

  const { mutate: deleteMutate } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      message.success("Xóa sản phẩm thành công");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => {
      message.error("Xóa sản phẩm thất bại");
    },
  });

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      render: (id: number) => (
        <Link to={`/product/detail/${id}`}>ID: {id}</Link>
      ),
    },
    {
      title: "Tên",
      dataIndex: "name",
    },
    {
      title: "Giá",
      dataIndex: "price",
      sorter: (a: Product, b: Product) => a.price - b.price,
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      render: (src: string, record: Product) => (
        <Image
          src={src}
          width={100}
          alt={record.name}
          fallback="/fallback-image.jpg"
        />
      ),
    },
    {
      title: "Hành động",
      render: (_: any, record: Product) => (
        <div>
          <Button type="link">
            <Link to={`/products/update/${record.id}`}>Cập nhật</Link>
          </Button>
          <Button
            type="link"
            danger
            onClick={() => {
              if (window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
                deleteMutate(record.id);
              }
            }}
          >
            Xóa
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Header />
      <div style={{ margin: "16px" }}>
        <Button type="primary">
          <Link to="/products/create">Tạo sản phẩm</Link>
        </Button>
      </div>
      {error && <p>Lỗi: {error.message}</p>}
      <Table
        dataSource={data}
        columns={columns}
        rowKey="id"
        loading={isLoading}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
}

export default ProductList;