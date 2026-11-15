import { Table } from "./table";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const columns = [
  { key: "id", header: "ID" },
  { key: "name", header: "Name" },
  { key: "email", header: "Email" },
  { key: "role", header: "Role" },
];

const users: User[] = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Admin" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", role: "Editor" },
  { id: 3, name: "Carol White", email: "carol@example.com", role: "Viewer" },
];

export default function TableDemo() {
  return (
    <div className="w-full">
      <Table data={users} columns={columns} caption="User directory" />
    </div>
  );
}
