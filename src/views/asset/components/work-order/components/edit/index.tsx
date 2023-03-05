import { useGetUsersByCompany } from "@/api/user/use-get-users-by-company";
import { WorkOrderForm } from "@/components/forms/work-order-form";
import { WorkOrderSchema } from "@/components/forms/work-order-form/schema";
import { DeleteIcon } from "@/components/icons/delete-icon";
import { Asset } from "@/types/entities/asset";
import { WorkOrder } from "@/types/entities/work-order";
import { useAssetViewStore } from "@/views/asset/store/asset-view-store";

interface Props {
  asset: Asset;
  workOrder: WorkOrder;
}

const EditWorkOrderHeader = ({ workOrder }: Props) => {
  const { stopEditingWorkOrder } = useAssetViewStore();

  const stopEditing = () => {
    stopEditingWorkOrder();
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      Editing: {workOrder.title}
      <DeleteIcon
        onClick={(e) => {
          e.stopPropagation();
          stopEditing();
        }}
      />
    </div>
  );
};

export const EditWorkOrderContent = ({ asset, workOrder }: Props) => {
  const { data: users = [] } = useGetUsersByCompany(asset.companyId);

  const onSubmit = async (values: WorkOrderSchema) => {
    console.log(values);
    return undefined;
  };

  return (
    <WorkOrderForm
      defaultValues={workOrder}
      users={users}
      onSubmitHandler={onSubmit}
    />
  );
};

export const EditWorkOrderCollapse = {
  Header: EditWorkOrderHeader,
  Content: EditWorkOrderContent,
};
