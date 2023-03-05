import { useGetUsersByCompany } from "@/api/user/use-get-users-by-company";
import { useCreateWorkOrder } from "@/api/work-orders/use-create-work-order";
import { WorkOrderForm } from "@/components/forms/work-order-form";
import { WorkOrderSchema } from "@/components/forms/work-order-form/schema";
import { DeleteIconPop } from "@/components/molecules/delete-icon-pop";
import { useTheme } from "@/hooks/use-theme";
import { toast } from "@/infra/toast";
import { Asset } from "@/types/entities/asset";
import { useAssetViewStore } from "@/views/asset/store/asset-view-store";
import { Card, Typography } from "antd";

interface Props {
  asset: Asset;
}

export const CreateWorkOrderForAsset = ({ asset }: Props) => {
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
