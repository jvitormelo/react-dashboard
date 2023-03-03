import { Zod } from "@/infra/zod";

export const companyFormSchema = Zod.object({
  name: Zod.string().min(1).max(100),
});

export type CompanyFormSchema = Zod.infer<typeof companyFormSchema>;
