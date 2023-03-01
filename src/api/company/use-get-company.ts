import { httpClient } from "@/infra/http-client";
import { queryClient } from "@/infra/query-client";
import { Company } from "@/types/entities/company";
import { useQuery } from "@tanstack/react-query";

const getCompany = (id: number): Promise<Company> =>
  httpClient.get(`/companies/${id}`);

export const useGetCompany = (id: number) => {
  return useQuery(["company", id], () => getCompany(id), { enabled: !!id });
};

export const setCompanyCache = (company: Company) => {
  queryClient.setQueryData(["company", company.id], company);
};
