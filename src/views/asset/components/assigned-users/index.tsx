import { useTheme } from "@/hooks/use-theme";
import { User } from "@/types/entities/user";
import { Card, Typography } from "antd";

interface Props {
  users: User[];
}

export const AssetAssignedUsers = ({ users }: Props) => {
  const { theme } = useTheme();
  return (
    <Card>
      <Typography.Title style={{ marginBottom: theme.marginMD }} level={3}>
        Assigned Users
      </Typography.Title>
      {users.map((user) => (
        <div key={user.id}>
          {user.name} - <a href={`mailto:${user.email}`}>{user.email}</a>
        </div>
      ))}
    </Card>
  );
};
