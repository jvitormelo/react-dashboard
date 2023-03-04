import { WorkOrderStatus } from "@/constants/work-order-status";
import { useMutation } from "@tanstack/react-query";
import { httpClient } from "@/infra/http-client";
import { WorkOrder, WorkOrderChecklist } from "@/types/entities/workorders";
import { queryClient } from "@/infra/query-client";

type createWorkOrder = Omit<WorkOrder, "id" | "status" | "checklist"> & {
  checklist: string;
};

const createWorkOrder = async (
  workOrder: createWorkOrder
): Promise<WorkOrder> => {
  const checklistContent = workOrder.checklist;

  const checklistItems = checklistContent.split("\n").filter(Boolean);

  const checklist: WorkOrderChecklist[] = checklistItems.map((item) => ({
    completed: false,
    task: item,
  }));

  return httpClient.post("/workorders", {
    ...workOrder,
    checklist,
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
