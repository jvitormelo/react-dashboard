import { UserAvatar } from "@/components/atoms/user-avatar";
import { UserPopOver } from "@/components/atoms/user-pop-over";
import { useTheme } from "@/hooks/use-theme";
import { Routes } from "@/router/routes";
import { ComponentProps } from "react";
import { Link } from "react-router-dom";

type Props = ComponentProps<typeof UserPopOver>["user"] & { id: number };

export const UserLink = ({ name, id, email, unit }: Props) => {
  const { theme } = useTheme();

  return (
    <UserPopOver
      user={{
        email,
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
