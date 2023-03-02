import { httpClient } from "@/infra/http-client";
import { queryClient } from "@/infra/query-client";
import { Company } from "@/types/entities/company";
import { useMutation } from "@tanstack/react-query";

const updateCompany = (company: Company): Promise<Company> =>
  httpClient.put(`/companies/${company.id}`, company);

export const useUpdateCompanyMutation = () => {
  return useMutation(updateCompany, {
    onSuccess(data) {
      queryClient.setQueryData<Company[]>(["companies"], (oldData) => {
        return (
          oldData?.map((company) =>
            company.id === data.id ? data : company
          ) ?? []
        );
      });
    },
  });
};
