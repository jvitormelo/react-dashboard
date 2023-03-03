import zod from "@/infra/zod";

export const companyFormSchema = zod.object({
  name: zod.string().min(3).max(100),
});

export type CompanyFormSchema = zod.infer<typeof companyFormSchema>;
