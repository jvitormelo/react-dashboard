import { httpClient } from "@/infra/http-client";
import { queryClient } from "@/infra/query-client";
import { Unit } from "@/types/entities/unit";
import { UnitSchema } from "@/views/company/components/form/schema";
import { useMutation } from "@tanstack/react-query";

interface CreateUnitMutation extends UnitSchema {
  companyId: number;
}

const createUnit = async (unit: CreateUnitMutation): Promise<Unit> => {
  return httpClient.post("/units", unit);
};

export const useCreateUnitMutation = () => {
  return useMutation(createUnit, {
    onSuccess: (data) => {
      queryClient.setQueryData(["units"], (oldData: Unit[] | undefined) => {
        return [...(oldData ?? []), data];
      });
    },
  });
};
