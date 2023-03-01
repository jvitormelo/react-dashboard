import { httpClient } from "@/infra/http-client";
import { Company } from "@/types/entities/company";
import { useQuery } from "@tanstack/react-query";

const getAllCompanies = async (): Promise<Company[]> => {
  return httpClient.get("/companies");
};

export const useGetAllCompanies = () => {
  return useQuery(["companies"], getAllCompanies);
};
