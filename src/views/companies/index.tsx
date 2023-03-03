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

  const { openCreateModal } = useCreateCompanyModal();
  const { openUpdateModal } = useUpdateCompanyModal();
  const { deleteCompany } = useDeleteCompany();

  const selectCompany = (company: Company) => {
    setCompanyCache(company);
  };

  const deleteCompanyHandler = async (company: Company) => {
    await deleteCompany(company);
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
    </>
  );
};
