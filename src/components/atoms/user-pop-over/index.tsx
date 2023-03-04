import { useTheme } from "@/hooks/use-theme";
import { UserWithUnit } from "@/types/entities/user";
import { PartialBy } from "@/types/helpers";
import { Divider, Popover, Space, Typography } from "antd";
import { UserAvatar } from "../user-avatar";

type Item = PartialBy<UserWithUnit, "unit">;

interface Props {
  user: Omit<Item, "companyId" | "unitId">;
  children?: React.ReactNode;
}

export const UserPopOver = ({ user, children }: Props) => {
  const { theme } = useTheme();
  const { email, name } = user;

  const unit = "unit" in user && user.unit;

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

          {unit && <Typography.Text>Unit: {unit.name}</Typography.Text>}
        </div>
      }
    >
      {children}
    </Popover>
  );
};
