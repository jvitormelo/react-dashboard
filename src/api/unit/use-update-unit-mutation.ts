import { httpClient } from "@/infra/http-client";
import { Unit } from "@/types/entities/unit";
import { useMutation } from "@tanstack/react-query";
import { unitCacheActions } from "./actions/index";

const updateUnit = (unit: Unit): Promise<Unit> => {
  return httpClient.put(`/units/${unit.id}`, unit);
};

export const useUpdateUnitMutation = () => {
  return useMutation(updateUnit, {
    onSuccess: (data) => {
      unitCacheActions.updateUnit(data);
    },
  });
};
