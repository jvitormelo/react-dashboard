import { EditIcon } from "@/components/icons/button-icons/edit-icon";
import { UserLink } from "@/components/molecules/user-link";
import { AssetUsersTransfer } from "@/components/molecules/asset-users-transfer";
import { useModal } from "@/hooks/use-modal";
import { useTheme } from "@/hooks/use-theme";
import { Asset } from "@/types/entities/asset";
import { UserWithUnit } from "@/types/entities/user";
import { Card, List, Typography } from "antd";

interface Props {
  asset: Asset & { users: UserWithUnit[] };
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
          Assigned Users ({asset.users.length})
        </Typography.Title>

        <EditIcon onClick={onEdit} />
      </div>

      <List
        style={{
          maxHeight: "240px",
          overflowY: "scroll",
          padding: theme.paddingMD,
          display: "flex",
          flexDirection: "column",
          gap: theme.marginSM,
        }}
      >
        {asset.users.map((user) => (
          <List.Item key={user.id}>
            <UserLink {...user} />
          </List.Item>
        ))}
      </List>
    </Card>
  );
};
