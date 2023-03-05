import { useDeleteWorkOrderMutation } from "@/api/work-orders/use-delete-work-order-mutation";
import { DeleteIconPop } from "@/components/molecules/delete-icon-pop";
import { EditIcon } from "@/components/icons/button-icons/edit-icon";
import { UserLink } from "@/components/molecules/user-link";
import { useFeedbackColors, useTheme } from "@/hooks";
import {
  WorkOrderChecklist,
  WorkOrdersWithUsers,
} from "@/types/entities/work-order";
import { useAssetViewStore } from "@/views/asset/store/asset-view-store";
import { Divider, List, Spin, Tag, Typography } from "antd";
import { useUpdateWorkOrderChecklistItem } from "@/api/work-orders/use-update-work-order-checklist-item";

interface Props {
  workOrder: WorkOrdersWithUsers;
}

const WorkOrderCollapseHeader = ({ workOrder }: Props) => {
  const { workOrderStatusToColor, workOrderPriorityToColor } =
    useFeedbackColors();

  const { theme } = useTheme();

  return (
    <div>
      <span style={{ marginRight: theme.marginMD }}>{workOrder.title}</span>
      <Tag color={workOrderPriorityToColor(workOrder.priority, "hex")}>
        {workOrder.priority.toUpperCase()}
      </Tag>
      <Tag color={workOrderStatusToColor(workOrder.status, "name")}>
        {workOrder.status}
      </Tag>
    </div>
  );
};

const CheckListItem = ({
  checklistItem,
  workOrder,
}: {
  workOrder: WorkOrdersWithUsers;

  checklistItem: WorkOrderChecklist;
}) => {
  const { theme } = useTheme();

  const { updateCheckListItem, isLoading } = useUpdateWorkOrderChecklistItem();
  return (
    <List.Item>
      <Typography.Text
        onClick={() =>
          !isLoading &&
          updateCheckListItem({
            completed: !checklistItem.completed,
            task: checklistItem.task,
            workOrder: workOrder,
          })
        }
        style={{
          color: checklistItem.completed
            ? theme.colorSuccess
            : theme.colorError,

          cursor: "pointer",
        }}
      >
        {checklistItem.task} {checklistItem.completed ? "✔" : "❌"}
        {isLoading && (
          <Spin style={{ marginLeft: theme.marginSM }} size="small" />
        )}
      </Typography.Text>
    </List.Item>
  );
};

const WorkOrderCollapseContent = ({ workOrder }: Props) => {
  const { editWorkOrder: setEditingWorkOrder } = useAssetViewStore();
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
            <CheckListItem
              checklistItem={checklistItem}
              key={index}
              workOrder={workOrder}
            />
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
