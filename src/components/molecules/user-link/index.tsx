import { userCacheActions } from "@/api/user/actions";
import { UserAvatar } from "@/components/atoms/user-avatar";
import { UserPopOver } from "@/components/molecules/user-pop-over";
import { useTheme } from "@/hooks/use-theme";
import { Routes } from "@/router/routes";
import { User } from "@/types/entities";
import { Link } from "react-router-dom";

type Props = {
  user: User;
};

export const UserLink = ({ user }: Props) => {
  const { theme } = useTheme();

  return (
    <UserPopOver user={user}>
      <Link
        style={{
          width: "fit-content",
        }}
        onClick={() => {
          userCacheActions.selectUser(user);
        }}
        to={Routes.user(user.id)}
      >
        <UserAvatar
          email={user.email}
          style={{ marginRight: theme.marginXS }}
        />
        {user.name}
      </Link>
    </UserPopOver>
  );
};
