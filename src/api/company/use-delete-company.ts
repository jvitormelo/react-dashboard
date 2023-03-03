import { httpClient } from "@/infra/http-client";
import { queryClient } from "@/infra/query-client";
import { Company } from "@/types/entities/company";
import { useMutation } from "@tanstack/react-query";

const deleteCompany = (id: number) => {
  return httpClient.delete(`/companies/${id}`);
};

export const useDeleteCompanyMutation = () => {
  return useMutation(deleteCompany, {
    onSuccess: (_, id) => {
      queryClient.setQueryData(
        ["companies"],
        (companies: Company[] | undefined) => {
          return companies?.filter((company) => company.id !== id);
        }
      );

      queryClient.setQueryData(["company", id], null);

      // should cascade?
    },
  });
};
