import { WorkOrderChecklist } from "@/types/entities/work-order";
import { CreateWorkOrderSchema } from "./schema";

export type SubmitWorkOrderSchema = Omit<CreateWorkOrderSchema, "checklist"> & {
  checklist: WorkOrderChecklist[];
};
