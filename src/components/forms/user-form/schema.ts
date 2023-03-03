import zod from "@/infra/zod";

export const userSchema = zod.object({
  name: zod.string().min(1).max(100),
  email: zod.string().email(),
});

export type UserSchema = zod.infer<typeof userSchema>;
