import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "./get-all-users";

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
