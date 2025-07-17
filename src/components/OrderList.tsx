import { useQuery } from "@tanstack/react-query";
import { Table } from "antd";

interface Order {
  id: string;
  userId: string;
  totalPrice: number;
  status: string;
  createdAt: string;
}

function OrderList() {
  const fetchOrders = async () => {
    const res = await fetch("http://localhost:3001/orders");
    return res.json();
  };

  // state data, isLoading, error
  const { data, isLoading, error } = useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });
  console.log(data, isLoading, error);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "User ID",
      dataIndex: "userId",
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      sorter: (a: Order, b: Order) => a.totalPrice - b.totalPrice,
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
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

export default OrderList;
