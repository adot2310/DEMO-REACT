import { useQuery } from "@tanstack/react-query";
import { Table } from "antd";

interface Category {
  id: string;
  name: string;
  description: string;
}

function CategoryList() {
  const fetchCategories = async () => {
    const res = await fetch("http://localhost:3001/categories");
    return res.json();
  };

  // state data, isLoading, error
  const { data, isLoading, error } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
  console.log(data, isLoading, error);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
  ];

  return (
    <div>
      {error && <p>Error: {error.message}</p>}
      <Table
        dataSource={data}
        columns={columns}
        rowKey={"id"}
        loading={isLoading} // Hiển thị spinner khi đang tải
        pagination={{ pageSize: 5 }} // Phân trang, mỗi trang 5 bản ghi
      />
    </div>
  );
}

export default CategoryList;
