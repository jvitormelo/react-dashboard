import { useGetAllCompanies } from "@/api/company/useGetAllCompanies";

export const DashboardView = () => {
  useGetAllCompanies();

  return <div>Hello World!</div>;
};
