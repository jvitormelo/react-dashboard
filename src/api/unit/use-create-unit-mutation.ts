import { UnitSchema } from "@/components/forms/unit-form/schema";
import { httpClient } from "@/infra/http-client";
import { Unit } from "@/types/entities/unit";
import { useMutation } from "@tanstack/react-query";
import { unitCacheActions } from "./actions";

interface CreateUnitMutation extends UnitSchema {
  companyId: number;
}

const createUnit = async (unit: CreateUnitMutation): Promise<Unit> => {
  return httpClient.post("/units", unit);
};

export const useCreateUnitMutation = () => {
  return useMutation(createUnit, {
    onSuccess: (data) => {
      unitCacheActions.addOrUpdateUnit(data);
    },
  });
};
