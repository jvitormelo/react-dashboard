export enum WorkOrderPriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}

export const workOrderPriorityArray = Array.from(
  Object.values(WorkOrderPriority)
);

export const workOrdersPriorityNameMap = {
  [WorkOrderPriority.LOW]: "Low",
  [WorkOrderPriority.MEDIUM]: "Medium",
  [WorkOrderPriority.HIGH]: "High",
};
