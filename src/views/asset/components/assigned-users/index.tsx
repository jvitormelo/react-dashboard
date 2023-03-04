import { UserAvatar } from "@/components/atoms/user-avatar";
import { UserPopOver } from "@/components/atoms/user-pop-over";
import { EditIcon } from "@/components/icons/edit-icon";
import { AssetUsersTransfer } from "@/components/transfer/asset-users-transfer";
import { useModal } from "@/hooks/use-modal";
import { useTheme } from "@/hooks/use-theme";
import { Routes } from "@/router/routes";
import { Asset } from "@/types/entities/asset";
import { UserWithUnit } from "@/types/entities/user";
import { Card, Typography } from "antd";
import { Link } from "react-router-dom";

interface Props {
  asset: Asset & { users: UserWithUnit[] };
}

const UserItem = ({ name, id, email, unit }: UserWithUnit) => {
  const { theme } = useTheme();

  return (
    <UserPopOver
      user={{
        email,
        id,
        name,
        unit,
      }}
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
    </UserPopOver>
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
