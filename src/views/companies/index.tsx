import { useGetAllCompanies } from "@/api/company/use-get-all-companies";
import { setCompanyCache } from "@/api/company/use-get-company";
import { Company } from "@/types/entities/company";
import { Button } from "antd";
import { CompanyTable } from "./components/company-table";
import { useCreateCompanyModal } from "./hooks/use-create-company-modal";

export const CompaniesView = () => {
  const { data: companies, isLoading } = useGetAllCompanies();

  // not optional
  const { openCreateModal, modal } = useCreateCompanyModal();

  const selectCompany = (company: Company) => {
    setCompanyCache(company);
  };

  const deleteCompany = (company: Company) => {
    // TODO: Implement delete company

    alert("Delete company: " + company.name);
  };

  const editCompany = (company: Company) => {
    console.log("Edit company: " + company.name);
  };

  return (
    <>
      <div style={{ minWidth: "100%" }}>
        <Button onClick={openCreateModal}>New company</Button>
        <CompanyTable
          selectCompany={selectCompany}
          deleteCompany={deleteCompany}
          editCompany={editCompany}
          companies={companies}
          loading={isLoading}
        />
      </div>
      {modal}
    </>
  );
};
