import { httpClient } from "@/infra/http-client";
import { queryClient } from "@/infra/query-client";
import { Unit } from "@/types/entities/unit";
import { useMutation } from "@tanstack/react-query";

const deleteUnit = async (unitId: number) => {
  return httpClient.delete(`/units/${unitId}`);
};

export const useDeleteUnitMutation = () => {
  return useMutation(deleteUnit, {
    onSuccess: (_, id) => {
      queryClient.invalidateQueries(["unit"]);

      queryClient.setQueryData(["units"], (oldData: Unit[] | undefined) => {
        return oldData?.filter((unit) => unit.id !== id) || [];
      });
    },
  });
};
