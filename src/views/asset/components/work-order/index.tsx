import { useTheme } from "@/hooks/use-theme";
import { Asset } from "@/types/entities/asset";
import { WorkOrdersWithUsers } from "@/types/entities/work-order";
import { Button, Card, Collapse, Typography } from "antd";
import { useAssetViewStore } from "../../store/asset-view-store";
import { WorkOrderCollapse } from "./components/collapse";
import { CreateWorkOrderForAsset } from "./components/create";
import { EditWorkOrderForAsset } from "./components/edit";

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
                header={<WorkOrderCollapse.Header workOrder={workOrder} />}
              >
                {editingWorkOrder?.id === workOrder.id ? (
                  <EditWorkOrderForAsset workOrder={workOrder} asset={asset} />
                ) : (
                  <WorkOrderCollapse.Content workOrder={workOrder} />
                )}
              </Panel>
            ))}
          </Collapse>
        </div>
      )}
    </Card>
  );
};
