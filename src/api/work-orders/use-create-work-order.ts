import { WorkOrderStatus } from "@/constants/work-order-status";
import { httpClient } from "@/infra/http-client";
import { queryClient } from "@/infra/query-client";
import { WorkOrder } from "@/types/entities/work-order";
import { useMutation } from "@tanstack/react-query";

type CreateWorkOrder = Omit<WorkOrder, "id" | "status">;

const createWorkOrder = async (
  workOrder: CreateWorkOrder
): Promise<WorkOrder> => {
  return httpClient.post("/workorders", {
    ...workOrder,
    status: WorkOrderStatus.IN_PROGRESS,
  });
};

export const useCreateWorkOrder = () => {
  return useMutation(createWorkOrder, {
    onSuccess: (data) => {
      queryClient.setQueryData<WorkOrder[]>(["workorders"], (oldData) => {
        if (!oldData) return [data];

        return [...oldData, data];
      });
    },
  });
};
