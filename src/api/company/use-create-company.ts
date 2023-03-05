import { CompanyFormSchema } from "@/components/forms/company-form/schema";
import { httpClient } from "@/infra/http-client";
import { Company } from "@/types/entities/company";
import { useMutation } from "@tanstack/react-query";
import { companyCacheActions } from "./actions";

const createCompany = async (company: CompanyFormSchema): Promise<Company> =>
  httpClient.post("/companies", company);

export const useCreateCompanyMutation = () => {
  return useMutation(createCompany, {
    onSuccess(data) {
      companyCacheActions.addCompany(data);
    },
  });
};
