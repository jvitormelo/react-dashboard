import { useDeleteCompanyMutation } from "@/api/company/use-delete-company";
import { toast } from "@/utils/feedback";
import { Company } from "@/types/entities/company";

export const useDeleteCompany = () => {
  const { mutateAsync: removeCompany } = useDeleteCompanyMutation();

  const deleteCompany = async (company: Company) => {
    try {
      await removeCompany(company.id);
      toast.success(`Company ${company.name} deleted!`);
    } catch (error) {
      toast.error(`Failed to delete company ${company.name}!`);
    }
  };

  return {
    deleteCompany,
  };
};
