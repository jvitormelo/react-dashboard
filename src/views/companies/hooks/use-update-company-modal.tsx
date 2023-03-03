import { useUpdateCompanyMutation } from "@/api/company/use-update-company";
import { useModal } from "@/hooks/use-modal";
import { toast } from "@/infra/toast";
import { Company } from "@/types/entities/company";
import { CompanyForm } from "../../../components/forms/company-form";
import { CompanyFormSchema } from "../../../components/forms/company-form/schema";

export const useUpdateCompanyModal = () => {
  const { closeModal, openModal } = useModal();
  const { mutateAsync: update } = useUpdateCompanyMutation();

  const openUpdateModal = (company: Company) => {
    const onSubmit = async (values: CompanyFormSchema) => {
      try {
        await update({ id: company.id, ...values });
        toast.success(`Company ${values.name} updated!`);
        closeModal();
      } catch (err) {
        toast.error(`Failed to update company ${values.name}!`);
      }
    };

    openModal({
      title: "Update company",
      body: <CompanyForm onSubmitHandler={onSubmit} defaultValues={company} />,
    });
  };

  return {
    openUpdateModal,
  };
};
