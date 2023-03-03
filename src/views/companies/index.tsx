import { useGetAllCompanies } from "@/api/company/use-get-all-companies";
import { setCompanyCache } from "@/api/company/use-get-company";
import { useTheme } from "@/hooks/use-theme";
import { Company } from "@/types/entities/company";
import { Button } from "antd";
import { CompanyTable } from "./components/company-table";
import { useCreateCompanyModal } from "./hooks/use-create-company-modal";
import { useDeleteCompany } from "./hooks/use-delete-company";
import { useUpdateCompanyModal } from "./hooks/use-update-company-modal";

export const CompaniesView = () => {
  const { data: companies, isLoading } = useGetAllCompanies();

  const { theme } = useTheme();

  // Need to find a way to avoid re-rendering the whole page when the modal opens
  const { openCreateModal, createdModal } = useCreateCompanyModal();
  const { openUpdateModal, updateModal } = useUpdateCompanyModal();
  const { deleteCompany } = useDeleteCompany();

  const selectCompany = (company: Company) => {
    setCompanyCache(company);
  };

  const deleteCompanyHandler = async (company: Company) => {
    deleteCompany(company);
  };

  const editCompany = (company: Company) => {
    console.log("edit company", company);
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
          type="primary"
          style={{ marginLeft: "auto" }}
          size="large"
          onClick={openCreateModal}
        >
          New company
        </Button>
        <CompanyTable
          selectCompany={selectCompany}
          deleteCompany={deleteCompanyHandler}
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
