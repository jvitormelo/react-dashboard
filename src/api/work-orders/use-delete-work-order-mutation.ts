import { toast } from "@/infra/toast";
import { httpClient } from "@/infra/http-client";
import { queryClient } from "@/infra/query-client";
import { WorkOrder } from "@/types/entities/work-order";
import { useMutation } from "@tanstack/react-query";

const deleteWorkOrder = async (id: number) => {
  return httpClient.delete(`/workorders/${id}`);
};

export const useDeleteWorkOrderMutation = () => {
  return useMutation(deleteWorkOrder, {
    onSuccess: (_, id) => {
      toast.success("Work order deleted successfully");
      queryClient.setQueryData<WorkOrder[]>(["workorders"], (oldData) => {
        return oldData?.filter((workOrder) => workOrder.id !== id);
      });
    },
    onError: () => {
      toast.error("Error deleting work order");
    },
  });
};
