import { WorkOrderPriority } from "@/constants/work-order-priority";
import zod from "@/infra/zod";

const workOrderSchema = zod.object({
  title: zod.string().min(1).max(100),
  description: zod.string().min(1).max(1000),
  assignedUserIds: zod.array(zod.number()).optional(),
  checklist: zod.string().min(3),
  priority: zod.nativeEnum(WorkOrderPriority),
});

export const createWorkOrderSchema = workOrderSchema.merge(
  zod.object({
    checklist: zod.string().min(3),
  })
);

export const editWorkOrderSchema = workOrderSchema.merge(
  zod.object({
    checklist: zod.array(
      zod.object({
        task: zod.string().min(1).max(100),
        completed: zod.boolean(),
      })
    ),
  })
);

export type CreateWorkOrderSchema = zod.infer<typeof createWorkOrderSchema>;

export type EditWorkOrderSchema = zod.infer<typeof editWorkOrderSchema>;
