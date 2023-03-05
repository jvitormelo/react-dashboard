import { useGetUsersByCompany } from "@/api/user/use-get-users-by-company";
import { useUpdateWorkOrder } from "@/api/work-orders/use-update-work-order";
import { WorkOrderForm } from "@/components/forms/work-order-form";
import { SubmitWorkOrderSchema } from "@/components/forms/work-order-form/types";
import { DeleteIcon } from "@/components/icons/delete-icon";
import { Asset } from "@/types/entities/asset";
import { WorkOrder, WorkOrderChecklist } from "@/types/entities/work-order";
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

  const { stopEditingWorkOrder } = useAssetViewStore();

  const { mutateAsync: updateWorkOrder } = useUpdateWorkOrder();

  const onSubmit = async (values: SubmitWorkOrderSchema) => {
    const checklist: WorkOrderChecklist[] = values.checklist.map(
      (checklistItem) => {
        const foundChecklistItem = workOrder.checklist.find(
          (item) => item.task === checklistItem.task
        );

        if (foundChecklistItem) return foundChecklistItem;

        return checklistItem;
      }
    );

    await updateWorkOrder({
      ...workOrder,
      ...values,
      checklist,
    });
    stopEditingWorkOrder();
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
