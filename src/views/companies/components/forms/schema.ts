import { zod } from "@/infra/zod";

export const companyFormSchema = zod.object({
  name: zod.string().min(1).max(100),
});

export type CompanyFormSchema = Zod.infer<typeof companyFormSchema>;
