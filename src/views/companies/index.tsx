import { useGetAllCompanies } from "@/api/company/use-get-all-companies";
import { setCompanyCache } from "@/api/company/use-get-company";
import { useTheme } from "@/hooks/use-theme";
import { Company } from "@/types/entities/company";
import { CompanyTable } from "../../components/tables/company-table";
import { CompanyTree } from "./components/company-tree";
import { useCreateCompanyModal } from "./hooks/use-create-company-modal";
import { useDeleteCompany } from "./hooks/use-delete-company";
import { useUpdateCompanyModal } from "./hooks/use-update-company-modal";

import styles from "./styles.module.scss";

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
    <div
      className={styles.container}
      style={{
        gap: theme.marginMD,
      }}
    >
      <CompanyTree />
      <CompanyTable
        headerProps={{
          buttonLabel: "New Company",
          onButtonClick: openCreateModal,
          title: "Companies",
        }}
        onSelect={selectCompany}
        onDelete={deleteCompanyHandler}
        onEdit={editCompany}
        companies={companies}
        loading={isLoading}
      />
    </div>
  );
};
