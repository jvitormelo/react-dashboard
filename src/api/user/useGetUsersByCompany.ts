import { httpClient } from "@/infra/http-client";
import { User } from "@/types/entities/user";
import { useQuery } from "@tanstack/react-query";

const getAllUsers = async (): Promise<User[]> => httpClient.get("/users");

export const useGetUsersByCompany = (companyId: number) => {
  const response = useQuery(["users"], getAllUsers, {
    enabled: !!companyId,
  });

  const data = response.data?.filter((user) => user.companyId === companyId);

  return {
    ...response,
    data,
  };
};
