import zod from "@/infra/zod";

export const workOrderSchema = zod.object({
  title: zod.string().min(1).max(100),
  description: zod.string().min(1).max(1000),
  assignedUserIds: zod.array(zod.number()).optional(),
  checklist: zod.string().min(3),
});

export type WorkOrderSchema = zod.infer<typeof workOrderSchema>;
