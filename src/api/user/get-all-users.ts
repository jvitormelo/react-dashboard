import { httpClient } from "@/infra/http-client";
import { User } from "@/types/entities/user";

export const getAllUsers = async (): Promise<User[]> =>
  httpClient.get("/users");
