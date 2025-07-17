import { useQuery } from "@tanstack/react-query";
import { Table } from "antd";

interface Brand {
  id: string;
  name: string;
  description: string;
}

function BrandList() {
  const fetchBrands = async () => {
    const res = await fetch("http://localhost:3001/brands");
    return res.json();
  };

  // state data, isLoading, error
  const { data, isLoading, error } = useQuery<Brand[]>({
    queryKey: ["brands"],
    queryFn: fetchBrands,
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
        loading={isLoading} 
        pagination={{ pageSize: 5 }} 
      />
    </div>
  );
}

export default BrandList;
