import { useGetAllCompanies } from "@/api/company/useGetAllCompanies";
import { queryClient } from "@/infra/query-client";
import { Company } from "@/types/entities/company";
import { Button } from "antd";
import { CompanyTable } from "./components/company-table";

export const CompaniesView = () => {
  const { data: companies, isLoading } = useGetAllCompanies();

  const selectCompany = (company: Company) => {
    // TODO create a function for this
    queryClient.setQueryData(["company", company.id], company);
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
