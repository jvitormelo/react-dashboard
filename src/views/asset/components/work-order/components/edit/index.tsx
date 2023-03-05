import { useGetUsersByCompany } from "@/api/user/use-get-users-by-company";
import { WorkOrderForm } from "@/components/forms/work-order-form";
import { WorkOrderSchema } from "@/components/forms/work-order-form/schema";
import { Asset } from "@/types/entities/asset";
import { WorkOrder } from "@/types/entities/work-order";

export const EditWorkOrderForAsset = ({
  asset,
  workOrder,
}: {
  asset: Asset;
  workOrder: WorkOrder;
}) => {
  const { data: users = [] } = useGetUsersByCompany(asset.companyId);

  const onSubmit = async (values: WorkOrderSchema) => {
    console.log(values);
    return undefined;
  };

  const formatToChecklistForm = () => {
    return workOrder.checklist
      .map((checklistItem) => checklistItem.task)
      .join("\n\n");
  };

  return (
    <WorkOrderForm
      defaultValues={{
        ...workOrder,
        checklist: formatToChecklistForm(),
      }}
      users={users}
      onSubmitHandler={onSubmit}
    />
  );
};
