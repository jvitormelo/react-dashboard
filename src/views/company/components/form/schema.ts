import zod from "@/infra/zod";

export const unitSchema = zod.object({
  name: zod.string().min(1).max(255),
});

export type UnitSchema = zod.infer<typeof unitSchema>;
