import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Image, Table, Button, message, Spin } from "antd";
import Header from "./Header";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  categoryId: number;
}

interface Category {
  id: number;
  name: string;
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

  const fetchCategories = async () => {
    const res = await fetch("http://localhost:3001/categories");
    return res.json();
  };

  const { data: products, isLoading: isLoadingProducts } = useQuery({
    queryKey: ["products", name],
    queryFn: fetchProducts,
  });

  const { data: categories, isLoading: isLoadingCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const deleteProduct = async (id: number) => {
    await axios.delete(`http://localhost:3001/products/${id}`);
  };

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
      title: "Danh mục",
      render: (record: Product) => {
        const category = categories?.find((cat: Category) => cat.id === record.categoryId);
        return category ? category.name : 'N/A'; 
      },
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
            <Link to={`/products/update/${record.id}`}>Sửa</Link>
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

  if (isLoadingProducts || isLoadingCategories) return <Spin />;

  return (
    <div>
      <Header />
      <div style={{ margin: "16px" }}>
        <Button type="primary">
          <Link to="/products/create">Thêm sản phẩm</Link>
        </Button>
      </div>
      <Table
        dataSource={products}
        columns={columns}
        rowKey="id"
        loading={isLoadingProducts}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
}

export default ProductList;
