import { User } from "@/types/entities/user";
import { Card, Collapse } from "antd";

interface Props {
  users: User[];
}

export const AssetAssignedUsers = ({ users }: Props) => {
  return (
    <Card>
      <section>Total Users Assigned : {users.length}</section>
      <Collapse>
        <Collapse.Panel header="Users" key="1">
          {users.map((user) => (
            <div key={user.id}>
              {user.name} - <a href={`mailto:${user.email}`}>{user.email}</a>
            </div>
          ))}
        </Collapse.Panel>
      </Collapse>
    </Card>
  );
};
