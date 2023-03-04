import { useMutation } from "@tanstack/react-query";
import { httpClient } from "@/infra/http-client";
import { WorkOrder } from "@/types/entities/workorders";

type createWorkOrder = Omit<WorkOrder, "id">;

const createWorkOrder = async (
  workOrder: createWorkOrder
): Promise<WorkOrder> => {
  return httpClient.post("/work-orders", workOrder);
};

export const useCreateWorkOrder = () => {
  return useMutation(createWorkOrder);
};
