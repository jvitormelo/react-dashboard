import { useTheme } from "@/hooks/use-theme";
import { Asset } from "@/types/entities/asset";
import { WorkOrdersWithUsers } from "@/types/entities/work-order";
import { Button, Card, Collapse, Typography } from "antd";
import { useAssetViewStore } from "../../store/asset-view-store";
import { WorkOrderCollapse } from "./components/collapse";
import { CreateWorkOrderForAsset } from "./components/create";
import { EditWorkOrderCollapse } from "./components/edit";

const { Panel } = Collapse;

interface Props {
  asset: Asset;
  workOrders: WorkOrdersWithUsers[];
}

export const WorkOrderInfo = ({ workOrders = [], asset }: Props) => {
  const { isCreatingWorkOrder, openCreateWorkOrderForm, editingWorkOrder } =
    useAssetViewStore();

  const { theme } = useTheme();

  const hasWorkOrders = workOrders.length > 0;

  const getCurrentCollapse = (workOrder: WorkOrdersWithUsers) => {
    if (editingWorkOrder?.id === workOrder.id) {
      return {
        header: (
          <EditWorkOrderCollapse.Header
            workOrder={editingWorkOrder}
            asset={asset}
          />
        ),
        content: (
          <EditWorkOrderCollapse.Content
            workOrder={editingWorkOrder}
            asset={asset}
          />
        ),
      };
    }

    return {
      header: <WorkOrderCollapse.Header workOrder={workOrder} />,
      content: <WorkOrderCollapse.Content workOrder={workOrder} />,
    };
  };

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
            {workOrders.map((workOrder) => {
              const { content, header } = getCurrentCollapse(workOrder);

              return (
                <Panel key={workOrder.id} header={header}>
                  {content}
                </Panel>
              );
            })}
          </Collapse>
        </div>
      )}
    </Card>
  );
};
