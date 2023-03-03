import { httpClient } from "@/infra/http-client";
import { queryClient } from "@/infra/query-client";
import { Company } from "@/types/entities/company";
import { CompanyFormSchema } from "@/components/forms/unit-form/schema";
import { useMutation } from "@tanstack/react-query";

const createCompany = async (company: CompanyFormSchema): Promise<Company> =>
  httpClient.post("/companies", company);

export const useCreateCompanyMutation = () => {
  return useMutation(createCompany, {
    onSuccess(data) {
      queryClient.setQueryData<Company[]>(["companies"], (oldData) => [
        ...(oldData || []),
        data,
      ]);
    },
  });
};
