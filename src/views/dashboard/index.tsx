import { useGetAllCompanies } from "@/api/company/useGetAllCompanies";

export const DashboardView = () => {
  const { data } = useGetAllCompanies();

  return <div>{JSON.stringify(data)}</div>;
};
