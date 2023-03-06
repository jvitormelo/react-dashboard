import { UserAvatar } from "@/components/atoms/user-avatar";
import { SkeletonCard } from "@/components/cards/skeleton-card";
import { StatisticsCard } from "@/components/cards/statistics-card";
import { useParamsId, useTheme } from "@/hooks";
import { Card, Collapse } from "antd";
import { WorkOrderCollapse } from "../../components/molecules/work-order-collapse";
import { useUserViewData } from "./hooks/use-user-view-data";
import styles from "./styles.module.scss";

export const UserView = () => {
  const { userId } = useParamsId();

  const { user, isLoading, userWorkOrders } = useUserViewData(userId);

  const { theme } = useTheme();

  const containerStyle = {
    gridGap: theme.marginMD,
  };

  if (isLoading || !user)
    return (
      <div className={styles.container} style={containerStyle}>
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );

  return (
    <div style={containerStyle} className={styles.container}>
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
      <Card>
        <Collapse>
          {userWorkOrders?.map((workOrder) => (
            <Collapse.Panel
              header={<WorkOrderCollapse.Header workOrder={workOrder} />}
              key={`${workOrder.id}-${workOrder.assetId}`}
            >
              <WorkOrderCollapse.Content workOrder={workOrder} />
            </Collapse.Panel>
          ))}
        </Collapse>
      </Card>
    </div>
  );
};
