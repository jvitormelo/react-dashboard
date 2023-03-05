import { UserAvatar } from "@/components/atoms/user-avatar";
import { StatisticsCard } from "@/components/cards/statistics-card";
import { useParamsId, useTheme } from "@/hooks";
import { Card } from "antd";
import { useUserViewData } from "./hooks/use-user-view-data";

export const UserView = () => {
  const { userId } = useParamsId();

  const { user, isLoading } = useUserViewData(userId);

  const { theme } = useTheme();

  if (isLoading || !user) return <div>loading</div>;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gridGap: theme.marginMD,
      }}
    >
      <StatisticsCard
        header={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "1rem",
            }}
          >
            <UserAvatar size={300} email={user.email} />
          </div>
        }
        rowProps={{
          gutter: [theme.marginMD, theme.marginMD],
        }}
        colProps={{
          span: 24,
        }}
        statistics={[
          {
            title: "Name",
            value: user.name,
          },
          {
            title: "Email",
            value: user.email,
          },
          {
            title: "Company",
            value: user.company.name,
          },
          {
            title: "Unit",
            value: user.unit.name,
          },
        ]}
      />
      <Card></Card>
    </div>
  );
};
