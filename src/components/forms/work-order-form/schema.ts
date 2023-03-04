import zod from "@/infra/zod";

export const workOrderSchema = zod.object({
  title: zod.string().min(1).max(100),
  description: zod.string().min(1).max(1000),
  assignedUserIds: zod.array(zod.number()).optional(),
  checklist: zod.array(zod.string().min(1).max(100)).min(1),
});

export type WorkOrderSchema = zod.infer<typeof workOrderSchema>;
