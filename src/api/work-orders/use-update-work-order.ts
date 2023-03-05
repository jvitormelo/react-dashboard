import { httpClient } from "@/infra/http-client";
import { queryClient } from "@/infra/query-client";
import { toast } from "@/infra/toast";
import { WorkOrder } from "@/types/entities/work-order";
import { useMutation } from "@tanstack/react-query";

type UpdateWorkOrder = WorkOrder;

const updateWorkOrder = (workOrder: UpdateWorkOrder): Promise<WorkOrder> => {
  return httpClient.put(`/workorders/${workOrder.id}`, workOrder);
};

export const useUpdateWorkOrder = () => {
  return useMutation(updateWorkOrder, {
    onSuccess: (data) => {
      toast.success("Work order updated successfully");

      queryClient.setQueryData<WorkOrder[]>(["workorders"], (oldData) => {
        return oldData?.map((workOrder) => {
          if (workOrder.id === data.id && workOrder.assetId === data.assetId) {
            return data;
          }
          return workOrder;
        });
      });
    },
    onError: () => {
      toast.error("Failed to update work order");
    },
  });
};
