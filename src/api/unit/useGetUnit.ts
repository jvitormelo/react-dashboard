import { httpClient } from "@/infra/http-client";
import { queryClient } from "@/infra/query-client";
import { Unit } from "@/types/entities/unit";
import { useQuery } from "@tanstack/react-query";

const getUnit = async (id: number): Promise<Unit> =>
  httpClient.get(`/units/${id}`);

export const useGetUnit = (unitId: number) => {
  return useQuery(["unit", unitId], () => getUnit(unitId), {
    enabled: !!unitId,
  });
};

export const selectUnit = (unit: Unit) => {
  queryClient.setQueryData(["unit", unit.id], unit);
};
