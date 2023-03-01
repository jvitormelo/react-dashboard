import { httpClient } from "@/infra/http-client";
import { Unit } from "@/types/entities/unit";
import { useQuery } from "@tanstack/react-query";

const getAllUnits = async (): Promise<Unit[]> => httpClient.get("/units");

export const useGetUnitsByCompany = (companyId: number) => {
  const response = useQuery(["units"], getAllUnits, { enabled: !!companyId });

  const data = response.data?.filter((unit) => unit.companyId === companyId);

  return {
    ...response,
    data,
  };
};
