import { WorkOrdersWithUsers } from "@/types/entities/workorders";
import { Card, Collapse, Divider, List, Tag } from "antd";

interface Props {
  workOrders: WorkOrdersWithUsers[];
}

export const WorkOrderInfo = ({ workOrders }: Props) => {
  return (
    <Card>
      <section>Total: {workOrders.length}</section>

      {/* TODO create component of this */}
      {workOrders.map((workOrder) => (
        <Collapse key={workOrder.id}>
          <Collapse.Panel
            header={
              <div>
                <span style={{ marginRight: "1rem" }}>{workOrder.title}</span>
                <Tag color={"yellow"}>{workOrder.priority.toUpperCase()}</Tag>
                <Tag>{workOrder.status}</Tag>
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

            <div>
              <h4 style={{ marginBottom: 0 }}> Assigned to</h4>
              <div>{workOrder.users.map((user) => user.name).join(", ")}</div>
            </div>
          </Collapse.Panel>
        </Collapse>
      ))}
    </Card>
  );
};
