import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Table, Button, message } from "antd";
import Header from "./Header";
import { Link } from "react-router-dom";
import axios from "axios";

function CategoryList() {
  const queryClient = useQueryClient();

  const fetchCategories = async () => {
    const res = await fetch("http://localhost:3001/categories");
    return res.json();
  };

  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const deleteCategory = async (id: number) => {
    await axios.delete(`http://localhost:3001/categories/${id}`);
  };

  const { mutate: deleteMutate } = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      message.success("Xóa danh mục thành công");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: () => {
      message.error("Xóa danh mục thất bại");
    },
  });

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Tên danh mục",
      dataIndex: "name",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
    },
    {
      title: "Hành động",
      render: (_: any, record: { id: number; name: string }) => (
        <div>
          <Button type="link">
            <Link to={`/categories/update/${record.id}`}>Cập nhật</Link>
          </Button>
          <Button
            type="link"
            danger
            onClick={() => {
              if (window.confirm("Do you delete?")) {
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
          <Link to="/categories/create">Tạo danh mục</Link>
        </Button>
      </div>
      <Table
        dataSource={data}
        columns={columns}
        rowKey="id"
        loading={isLoading}
      />
    </div>
  );
}

export default CategoryList;
