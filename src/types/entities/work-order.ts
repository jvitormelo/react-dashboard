import { WorkOrderPriority } from "@/constants/work-order-priority";
import { WorkOrderStatus } from "@/constants/work-order-status";
import { UserWithUnit } from "./user";

export type WorkOrderChecklist = {
  completed: boolean;
  task: string;
};

export type WorkOrder = {
  title: string;
  description: string;
  assignedUserIds: number[];
  assetId: number;
  checklist: WorkOrderChecklist[];
  id: number;
  priority: WorkOrderPriority;
  status: WorkOrderStatus;
};

export type WorkOrderWithUsers = WorkOrder & {
  users: UserWithUnit[];
};
