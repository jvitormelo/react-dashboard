import { httpClient } from "@/infra/http-client";
import { queryClient } from "@/infra/query-client";
import { Unit } from "@/types/entities/unit";
import { useMutation } from "@tanstack/react-query";

const updateUnit = (unit: Unit): Promise<Unit> => {
  return httpClient.put(`/units/${unit.id}`, unit);
};

export const useUpdateUnitMutation = () => {
  return useMutation(updateUnit, {
    onSuccess: (data) => {
      queryClient.setQueryData(["unit", data.id], data);
      queryClient.setQueryData(["units"], (oldData: Unit[] | undefined) => {
        return oldData?.map((unit) => (unit.id === data.id ? data : unit));
      });
    },
  });
};
