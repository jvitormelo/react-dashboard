import { useGetAllCompanies } from "@/api/company/useGetAllCompanies";
import { useCompanyStore } from "@/store/company";
import { Company } from "@/types/entities/company";
import { CompanyTable } from "./components/company-table";

export const CompaniesView = () => {
  const { data: companies, isLoading } = useGetAllCompanies();

  const { setCompany } = useCompanyStore();

  const selectCompany = (company: Company) => {
    setCompany(company);
  };

  return (
    <div style={{ minWidth: "100%" }}>
      <CompanyTable
        selectCompany={selectCompany}
        companies={companies}
        isLoading={isLoading}
      />
    </div>
  );
};
