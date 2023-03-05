import { WorkOrderChecklist } from "@/types/entities/work-order";
import { WorkOrderSchema } from "./schema";

export type SubmitWorkOrderSchema = Omit<WorkOrderSchema, "checklist"> & {
  checklist: WorkOrderChecklist[];
};
