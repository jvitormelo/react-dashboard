import { useGetAllCompanies } from "@/api/company/useGetAllCompanies";
import { useCompanyStore } from "@/store/company";
import { Company } from "@/types/entities/company";
import { Button } from "antd";
import { CompanyTable } from "./components/company-table";

export const CompaniesView = () => {
  const { data: companies, isLoading } = useGetAllCompanies();

  const { setCompany } = useCompanyStore();

  const selectCompany = (company: Company) => {
    setCompany(company);
  };

  const deleteCompany = (company: Company) => {
    // TODO: Implement delete company
    alert("Delete company: " + company.name);
  };

  const editCompany = (company: Company) => {
    // TODO: Implement edit company
    console.log("Edit company: " + company.name);
  };

  return (
    <div style={{ minWidth: "100%" }}>
      <Button>New company</Button>
      <CompanyTable
        selectCompany={selectCompany}
        deleteCompany={deleteCompany}
        editCompany={editCompany}
        companies={companies}
        loading={isLoading}
      />
    </div>
  );
};
