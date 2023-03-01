import { httpClient } from "@/infra/http-client";
import { useQuery } from "@tanstack/react-query";

const getAllCompanies = async () =>
  httpClient.get("/companies").then((res) => res.data);

export const useGetAllCompanies = () => {
  return useQuery(["companies"], getAllCompanies);
};
