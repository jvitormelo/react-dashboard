import { showMessage } from "@/utils/feedback";
import { WorkOrder } from "@/types/entities";
import { useUpdateWorkOrder } from "./use-update-work-order";

export const useUpdateWorkOrderChecklistItem = () => {
  const { mutateAsync: updateWorkOrder, isLoading } = useUpdateWorkOrder();

  const updateCheckListItem = async ({
    completed,
    task,
    workOrder,
  }: {
    workOrder: WorkOrder;
    task: string;
    completed: boolean;
  }) => {
    try {
      const toUpdatedWorkOrder = { ...workOrder };

      const foundTask = toUpdatedWorkOrder.checklist.find(
        (item) => item.task === task
      );

      if (foundTask) {
        foundTask.completed = completed;
      }

      await updateWorkOrder(toUpdatedWorkOrder);

      showMessage.success(
        `${task} marked as ${completed ? "completed" : "pending"}`
      );
    } catch (e) {
      showMessage.error("Could not update task");
    }
  };

  return {
    updateCheckListItem,
    isLoading,
  };
};
