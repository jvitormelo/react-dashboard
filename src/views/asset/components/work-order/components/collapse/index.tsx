import { useDeleteWorkOrderMutation } from "@/api/work-orders/use-delete-work-order-mutation";
import { DeleteIconPop } from "@/components/icons/delete-icon-pop";
import { EditIcon } from "@/components/icons/edit-icon";
import { UserLink } from "@/components/molecules/user-link";
import { useFeedbackColors } from "@/hooks/use-feedback-colors";
import { useTheme } from "@/hooks/use-theme";
import { WorkOrdersWithUsers } from "@/types/entities/work-order";

import { useAssetViewStore } from "@/views/asset/store/asset-view-store";
import { Divider, List, Tag, Typography } from "antd";

const WorkOrderCollapseHeader = ({
  workOrder,
}: {
  workOrder: WorkOrdersWithUsers;
}) => {
  const { workOrderStatusToColor, workOrderPriorityToColor } =
    useFeedbackColors();

  return (
    <div>
      <span style={{ marginRight: "1rem" }}>{workOrder.title}</span>
      <Tag color={workOrderPriorityToColor(workOrder.priority, "hex")}>
        {workOrder.priority.toUpperCase()}
      </Tag>
      <Tag color={workOrderStatusToColor(workOrder.status, "name")}>
        {workOrder.status}
      </Tag>
    </div>
  );
};

const WorkOrderCollapseContent = ({
  workOrder,
}: {
  workOrder: WorkOrdersWithUsers;
}) => {
  const { setEditingWorkOrder } = useAssetViewStore();
  const { theme } = useTheme();

  const { mutateAsync: deleteWorkOrder } = useDeleteWorkOrderMutation();

  const onDelete = async () => {
    await deleteWorkOrder(workOrder.id);
  };

  const onEdit = () => {
    setEditingWorkOrder(workOrder);
  };

  return (
    <>
      <Typography.Paragraph style={{ marginBlock: 0 }}>
        {workOrder.description}
      </Typography.Paragraph>

      <Divider />
      <section>
        <h4 style={{ marginBottom: 0 }}>Checklist</h4>
        <List
          style={{
            paddingLeft: theme.paddingMD,
          }}
        >
          {workOrder.checklist.map((checklistItem, index) => (
            <List.Item key={index}>
              <span>
                {checklistItem.task} {checklistItem.completed ? "✔" : "❌"}
              </span>
            </List.Item>
          ))}
        </List>
      </section>
      <Divider />
      <section>
        <h4 style={{ marginBottom: 0 }}> Assigned to</h4>
        <List
          style={{
            paddingLeft: theme.paddingMD,
          }}
        >
          {workOrder.users.map((user) => (
            <List.Item key={user.id}>
              <UserLink {...user} />
            </List.Item>
          ))}
        </List>
      </section>
      <Divider />

      <section
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: theme.marginSM,
        }}
      >
        <EditIcon onClick={onEdit} />
        <DeleteIconPop
          description="Are you sure you want to delete this work order?"
          title="Delete Work Order"
          onConfirm={onDelete}
          placement="left"
        />
      </section>
    </>
  );
};

export const WorkOrderCollapse = {
  Header: WorkOrderCollapseHeader,
  Content: WorkOrderCollapseContent,
};
