import { WorkOrderStatus } from "../../constants/work-order-status";

type Checklist = {
  completed: boolean;
  task: string;
};

export type WorkOrder = {
  assetId: 5;
  assignedUserIds: number[];
  checklist: Checklist[];
  description: string;
  id: number;
  priority: string;
  status: WorkOrderStatus;
  title: string;
};
