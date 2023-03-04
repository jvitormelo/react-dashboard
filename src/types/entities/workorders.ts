import { WorkOrderStatus } from "@/constants/work-order-status";
import { User } from "./user";

type Checklist = {
  completed: boolean;
  task: string;
};

export type WorkOrder = {
  assetId: number;
  assignedUserIds: number[];
  checklist: Checklist[];
  description: string;
  id: number;
  priority: string;
  status: WorkOrderStatus;
  title: string;
};

export type WorkOrdersWithUsers = WorkOrder & {
  users: User[];
};
