import { useGetAllCompanies } from "@/api/company/use-get-all-companies";
import { setCompanyCache } from "@/api/company/use-get-company";
import { useTheme } from "@/hooks/use-theme";
import { Company } from "@/types/entities/company";
import { Button } from "antd";
import { CompanyTable } from "./components/company-table";
import { useCreateCompanyModal } from "./hooks/use-create-company-modal";
import { useUpdateCompanyModal } from "./hooks/use-update-company-modal";

export const CompaniesView = () => {
  const { data: companies, isLoading } = useGetAllCompanies();

  const { theme } = useTheme();

  // Need to find a way to avoid re-rendering the whole page when the modal opens
  const { openCreateModal, createdModal } = useCreateCompanyModal();
  const { openUpdateModal, updateModal } = useUpdateCompanyModal();

  const selectCompany = (company: Company) => {
    setCompanyCache(company);
  };

  const deleteCompany = (company: Company) => {
    // TODO: Implement delete company

    alert("Delete company: " + company.name);
  };

  const editCompany = (company: Company) => {
    openUpdateModal(company);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: theme.marginMD,
        }}
      >
        <Button
          style={{ marginLeft: "auto" }}
          size="large"
          onClick={openCreateModal}
        >
          New company
        </Button>
        <CompanyTable
          selectCompany={selectCompany}
          deleteCompany={deleteCompany}
          editCompany={editCompany}
          companies={companies}
          loading={isLoading}
        />
      </div>
      {createdModal}
      {updateModal}
    </>
  );
};
