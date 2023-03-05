import { WorkOrderStatus } from "@/constants/work-order-status";
import { httpClient } from "@/infra/http-client";
import { queryClient } from "@/infra/query-client";
import { WorkOrder } from "@/types/entities/work-order";
import { useMutation } from "@tanstack/react-query";

type UpdateWorkOrder = WorkOrder;

const updateWorkOrder = (workOrder: UpdateWorkOrder): Promise<WorkOrder> => {
  const isDone = workOrder.checklist.every((item) => item.completed);

  if (isDone) {
    workOrder.status = WorkOrderStatus.COMPLETED;
  } else {
    workOrder.status = WorkOrderStatus.IN_PROGRESS;
  }

  return httpClient.put(`/workorders/${workOrder.id}`, workOrder);
};

export const useUpdateWorkOrder = () => {
  return useMutation(updateWorkOrder, {
    onSuccess: (data) => {
      queryClient.setQueryData<WorkOrder[]>(["workorders"], (oldData) => {
        return oldData?.map((workOrder) => {
          if (workOrder.id === data.id && workOrder.assetId === data.assetId) {
            return data;
          }
          return workOrder;
        });
      });
    },
  });
};
