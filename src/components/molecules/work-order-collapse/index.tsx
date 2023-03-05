import { useUpdateWorkOrderChecklistItem } from "@/api/work-orders/use-update-work-order-checklist-item";
import { EditIcon } from "@/components/icons/button-icons/edit-icon";
import { DeleteIconPop } from "@/components/molecules/delete-icon-pop";
import { UserLink } from "@/components/molecules/user-link";
import { useFeedbackColors, useTheme } from "@/hooks";
import {
  WorkOrderChecklist,
  WorkOrderWithUsers,
} from "@/types/entities/work-order";
import { Divider, List, Spin, Tag, Typography } from "antd";

interface Props {
  workOrder: WorkOrderWithUsers;
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
  workOrder: WorkOrderWithUsers;

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

type ContentProps = Props & {
  onDelete?: (workOrder: WorkOrderWithUsers) => void;
  onEdit?: (workOrder: WorkOrderWithUsers) => void;
};

const WorkOrderCollapseContent = ({
  workOrder,
  onDelete,
  onEdit,
}: ContentProps) => {
  const { theme } = useTheme();

  const showAction = !!(onDelete || onEdit);

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
              <UserLink user={user} />
            </List.Item>
          ))}
        </List>
      </section>

      {showAction && (
        <>
          <Divider />

          <section
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: theme.marginSM,
            }}
          >
            {onEdit && (
              <EditIcon
                onClick={() => {
                  onEdit(workOrder);
                }}
              />
            )}
            {onDelete && (
              <DeleteIconPop
                description="Are you sure you want to delete this work order?"
                title="Delete Work Order"
                onConfirm={async () => {
                  if (onDelete) {
                    onDelete(workOrder);
                  }
                }}
                placement="left"
              />
            )}
          </section>
        </>
      )}
    </>
  );
};

export const WorkOrderCollapse = {
  Header: WorkOrderCollapseHeader,
  Content: WorkOrderCollapseContent,
};
