import { useGetAllCompanies } from "@/api/company/useGetAllCompanies";
import { CompanyTable } from "./components/company-table";

export const CompaniesView = () => {
  const { data: companies, isLoading } = useGetAllCompanies();

  return (
    <div style={{ minWidth: "100%" }}>
      <CompanyTable companies={companies} isLoading={isLoading} />
    </div>
  );
};
