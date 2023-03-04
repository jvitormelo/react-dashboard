import { useGetUnitsByCompany } from "@/api/unit/use-get-units-by-company";
import { UserWithUnit } from "@/types/entities/user";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "./get-all-users";

export const useGetUsersByCompany = (companyId: number) => {
  const { data: units = [] } = useGetUnitsByCompany(companyId);
  const response = useQuery(["users"], getAllUsers, {
    enabled: !!companyId,
  });

  const data: UserWithUnit[] =
    response.data
      ?.filter((user) => user.companyId === companyId)
      .map((user) => ({
        ...user,
        unit: units.find((unit) => unit.id === user.unitId) || {
          id: 0,
          companyId: 0,
          name: "",
        },
      })) || [];

  return {
    ...response,
    data,
  };
};
