import { useGetUsersByCompany } from "@/api/user/use-get-users-by-company";
import { useCreateWorkOrder } from "@/api/work-orders/use-create-work-order";
import { useDeleteWorkOrderMutation } from "@/api/work-orders/use-delete-work-order-mutation";
import { WorkOrderForm } from "@/components/forms/work-order-form";
import { WorkOrderSchema } from "@/components/forms/work-order-form/schema";
import { DeleteIconPop } from "@/components/icons/delete-icon-pop";
import { EditIcon } from "@/components/icons/edit-icon";
import { UserLink } from "@/components/molecules/user-link";
import { useFeedbackColors } from "@/hooks/use-feedback-colors";
import { useTheme } from "@/hooks/use-theme";
import { toast } from "@/infra/toast";
import { Asset } from "@/types/entities/asset";
import { WorkOrdersWithUsers } from "@/types/entities/workorders";
import { Button, Card, Collapse, Divider, List, Tag, Typography } from "antd";
import { useAssetViewStore } from "../../store/asset-view-store";

const { Panel } = Collapse;

// TODO separate this component into other files

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

const WorkOrderCollapse = ({
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

const CreateWorkOrderForAsset = ({ asset }: { asset: Asset }) => {
  const { closeCreateWorkOrderForm } = useAssetViewStore();
  const { data: users = [] } = useGetUsersByCompany(asset.companyId);

  const { mutateAsync: createWorkOrder } = useCreateWorkOrder();

  const { theme } = useTheme();

  const onSubmitHandler = async (data: WorkOrderSchema) => {
    try {
      await createWorkOrder({
        ...data,
        assignedUserIds: data.assignedUserIds ?? [],
        assetId: asset.id,
      });
      toast.success("Work order created");
      closeCreateWorkOrderForm();
    } catch (err) {
      toast.error("Failed to create work order");
    }
  };

  return (
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

        <DeleteIconPop
          title="Are you sure you want to cancel?"
          description="All changes will be lost."
          placement="left"
          onConfirm={closeCreateWorkOrderForm}
        />
      </section>
      <WorkOrderForm users={users} onSubmitHandler={onSubmitHandler} />
    </Card>
  );
};

interface Props {
  asset: Asset;
  workOrders: WorkOrdersWithUsers[];
}

export const WorkOrderInfo = ({ workOrders = [], asset }: Props) => {
  const { isCreatingWorkOrder, openCreateWorkOrderForm } = useAssetViewStore();
  const { theme } = useTheme();

  const hasWorkOrders = workOrders.length > 0;

  return (
    <Card
      style={{
        maxHeight: "fit-content",
        transition: "max-height 0.3s ease-in-out",
      }}
    >
      <section
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography.Title
          level={3}
          style={{ marginBottom: hasWorkOrders ? theme.marginMD : 0 }}
        >
          Work Orders
        </Typography.Title>

        {!isCreatingWorkOrder && (
          <Button onClick={openCreateWorkOrderForm} type="primary">
            New Work Order
          </Button>
        )}
      </section>

      {/* // TODO - add transition  */}
      {isCreatingWorkOrder && <CreateWorkOrderForAsset asset={asset} />}

      {hasWorkOrders && (
        <div
          style={{
            maxHeight: "550px",
            overflowY: "scroll",
            padding: theme.paddingMD,
            overflowX: "hidden",
            gap: theme.marginMD,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Collapse>
            {workOrders.map((workOrder) => (
              <Panel
                key={workOrder.id}
                header={<WorkOrderCollapseHeader workOrder={workOrder} />}
              >
                <WorkOrderCollapse workOrder={workOrder} />
              </Panel>
            ))}
          </Collapse>
        </div>
      )}
    </Card>
  );
};
