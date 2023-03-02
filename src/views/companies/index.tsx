import { useGetAllCompanies } from "@/api/company/use-get-all-companies";
import { setCompanyCache } from "@/api/company/use-get-company";
import { useModal } from "@/hooks/use-modal";

import { Company } from "@/types/entities/company";
import { Button, Form } from "antd";
import { CompanyTable } from "./components/company-table";

export const CompaniesView = () => {
  const { data: companies, isLoading } = useGetAllCompanies();

  const { openModal } = useModal();

  const selectCompany = (company: Company) => {
    setCompanyCache(company);
  };

  const deleteCompany = (company: Company) => {
    // TODO: Implement delete company

    alert("Delete company: " + company.name);
  };

  const editCompany = (company: Company) => {
    openModal({
      body: <Form>Test</Form>,
    });
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
