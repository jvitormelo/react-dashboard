import { WorkOrderForm } from "@/components/forms/work-order-form";
import { CloseIcon } from "@/components/icons/close-icon";
import { useFeedbackColors } from "@/hooks/use-feedback-colors";
import { useTheme } from "@/hooks/use-theme";
import { WorkOrdersWithUsers } from "@/types/entities/workorders";
import { Card, Collapse, Divider, List, Tag, Typography } from "antd";

interface Props {
  workOrders: WorkOrdersWithUsers[];
}

export const WorkOrderInfo = ({ workOrders = [] }: Props) => {
  const { theme } = useTheme();

  const { workOrderStatusToColor, workOrderPriorityToColor } =
    useFeedbackColors();

  return (
    <Card>
      <Typography.Title level={3} style={{ marginBottom: theme.marginMD }}>
        Workorders
      </Typography.Title>

      {/* TODO create component of this */}
      <div
        style={{
          maxHeight: "300px",
          overflowY: "scroll",
          padding: theme.paddingMD,
          overflowX: "hidden",
        }}
      >
        {workOrders.map((workOrder) => (
          <Collapse key={workOrder.id}>
            <Collapse.Panel
              header={
                <div>
                  <span style={{ marginRight: "1rem" }}>{workOrder.title}</span>
                  <Tag
                    color={workOrderPriorityToColor(workOrder.priority, "hex")}
                  >
                    {workOrder.priority.toUpperCase()}
                  </Tag>
                  <Tag color={workOrderStatusToColor(workOrder.status, "name")}>
                    {workOrder.status}
                  </Tag>
                </div>
              }
              key="1"
            >
              <p style={{ marginBlock: 0 }}>{workOrder.description}</p>

              <Divider />
              <div>
                <h4 style={{ marginBottom: 0 }}>Checklist</h4>
                <List>
                  {workOrder.checklist.map((checklistItem, index) => (
                    <List.Item key={index}>
                      <span>
                        {checklistItem.task}{" "}
                        {checklistItem.completed ? "✔" : "❌"}
                      </span>
                    </List.Item>
                  ))}
                </List>
              </div>
              <Divider />
              <div>
                <h4 style={{ marginBottom: 0 }}> Assigned to</h4>
                <div>{workOrder.users.map((user) => user.name).join(", ")}</div>
              </div>
            </Collapse.Panel>
          </Collapse>
        ))}
      </div>
      <Card
        style={{
          padding: theme.paddingMD,
          marginTop: theme.marginMD,
        }}
      >
        <section
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography.Title level={4} style={{ marginBottom: theme.marginMD }}>
            Create new Work Order
          </Typography.Title>

          <CloseIcon
            onClick={() => {
              return;
            }}
          />
        </section>
        <WorkOrderForm
          onSubmitHandler={async () => {
            return;
          }}
        />
      </Card>
    </Card>
  );
};
