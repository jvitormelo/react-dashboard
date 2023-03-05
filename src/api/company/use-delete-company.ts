import { httpClient } from "@/infra/http-client";
import { useMutation } from "@tanstack/react-query";
import { companyCacheActions } from "./actions";

const deleteCompany = (id: number) => {
  return httpClient.delete(`/companies/${id}`);
};

export const useDeleteCompanyMutation = () => {
  return useMutation(deleteCompany, {
    onSuccess: (_, id) => {
      companyCacheActions.deleteCompany(id);
    },
  });
};
