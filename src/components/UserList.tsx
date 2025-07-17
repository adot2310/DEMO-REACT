import { useQuery } from "@tanstack/react-query";
import { Table } from "antd";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

function UserList() {
  const fetchUsers = async () => {
    const res = await fetch("http://localhost:3001/users");
    return res.json();
  };

  // state data, isLoading, error
  const { data, isLoading, error } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: fetchUsers,
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
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
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

export default UserList;
