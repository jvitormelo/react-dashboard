import { httpClient } from "@/infra/http-client";
import { Company } from "@/types/entities/company";
import { useMutation } from "@tanstack/react-query";
import { companyCacheActions } from "./actions/index";

const updateCompany = (company: Company): Promise<Company> =>
  httpClient.put(`/companies/${company.id}`, company);

export const useUpdateCompanyMutation = () => {
  return useMutation(updateCompany, {
    onSuccess(data) {
      companyCacheActions.addOrUpdateCompany(data);
    },
  });
};
