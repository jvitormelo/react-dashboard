import { Zod } from "@/infra/zod";

export const unitSchema = Zod.object({
  name: Zod.string().min(1).max(255),
});

export type UnitSchema = Zod.infer<typeof unitSchema>;
