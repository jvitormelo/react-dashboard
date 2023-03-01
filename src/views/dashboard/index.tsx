import { useGetAllCompanies } from "@/api/company/useGetAllCompanies";
import { CompanyTable } from "./components/company-table";

export const DashboardView = () => {
  const { data: companies, isLoading } = useGetAllCompanies();

  return (
    <div>
      <CompanyTable companies={companies} isLoading={isLoading} />
    </div>
  );
};
