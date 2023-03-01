import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "./get-all-users";

export const useGetUsersByUnit = (unitId: number) => {
  const response = useQuery(["users"], getAllUsers, {
    enabled: !!unitId,
  });

  const data = response.data?.filter((user) => user.unitId === unitId);

  console.log(unitId);
  return {
    ...response,
    data,
  };
};
