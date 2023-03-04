import { UserAvatar } from "@/components/atoms/user-avatar";
import { EditIcon } from "@/components/icons/edit-icon";
import { AssetUsersTransfer } from "@/components/transfer/asset-users-transfer";
import { useModal } from "@/hooks/use-modal";
import { useTheme } from "@/hooks/use-theme";
import { Routes } from "@/router/routes";
import { Asset } from "@/types/entities/asset";
import { UserWithUnit } from "@/types/entities/user";
import { Card, Divider, Popover, Space, Typography } from "antd";
import { Link } from "react-router-dom";

interface Props {
  asset: Asset & { users: UserWithUnit[] };
}

const UserItem = ({ name, id, email, unit }: UserWithUnit) => {
  const { theme } = useTheme();

  return (
    <Popover
      placement="top"
      content={
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <UserAvatar
              style={{
                marginRight: theme.marginSM,
              }}
              email={email}
            />

            <Space direction="vertical">
              <Typography.Text>{name}</Typography.Text>
              <Typography.Text>{email}</Typography.Text>
            </Space>
          </div>
          <Divider />

          <Typography.Text>Unit: {unit.name}</Typography.Text>
        </div>
      }
    >
      <Link
        style={{
          width: "fit-content",
        }}
        to={Routes.user(id)}
      >
        <UserAvatar email={email} style={{ marginRight: theme.marginXS }} />
        {name}
      </Link>
    </Popover>
  );
};

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
      <div
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
          <UserItem key={user.id} {...user} />
        ))}
      </div>
    </Card>
  );
};
