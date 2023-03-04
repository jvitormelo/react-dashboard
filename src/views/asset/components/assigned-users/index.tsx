import { EditIcon } from "@/components/icons/edit-icon";
import { useModal } from "@/hooks/use-modal";
import { useTheme } from "@/hooks/use-theme";
import { AssetWithUsers } from "@/types/entities/asset";
import { Card, Typography } from "antd";
import { AssetUsersTransfer } from "@/components/transfer/asset-users-transfer";

interface Props {
  asset: AssetWithUsers;
}

export const AssetAssignedUsers = ({ asset }: Props) => {
  const { theme } = useTheme();

  const { openModal } = useModal();

  const onEdit = () => {
    openModal({
      title: "Edit Assigned Users",
      body: <AssetUsersTransfer asset={asset} />,
      // TODO use size
      width: 700,
    });
  };

  return (
    <Card>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography.Title style={{ marginBottom: theme.marginMD }} level={3}>
          Assigned Users
        </Typography.Title>

        <EditIcon onClick={onEdit} />
      </div>
      {asset.users.map((user) => (
        <div key={user.id}>
          {user.name} - <a href={`mailto:${user.email}`}>{user.email}</a>
        </div>
      ))}
    </Card>
  );
};
